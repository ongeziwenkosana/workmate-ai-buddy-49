import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RESPONSIBLE_AI = `Responsible AI requirements:
- Never invent facts, names, numbers, dates or deadlines that the user did not provide.
- If information is missing, write "Not specified" or "Unassigned" instead of guessing.
- Do not add confidential-sounding placeholder data.
- Write content that a human will review and edit before professional use.`;

const EmailInput = z.object({
  kind: z.literal("email"),
  recipient: z.string().max(500).optional().default(""),
  purpose: z.string().min(1).max(2000),
  keyPoints: z.string().min(1).max(5000),
  tone: z.enum(["Formal", "Friendly", "Persuasive", "Professional"]),
});

const NotesInput = z.object({
  kind: z.literal("notes"),
  notes: z.string().min(1).max(20000),
});

const PlannerInput = z.object({
  kind: z.literal("planner"),
  tasks: z.string().min(1).max(10000),
  deadlines: z.string().max(4000).optional().default(""),
  priority: z.enum(["High", "Medium", "Low"]),
  horizon: z.enum(["Daily", "Weekly"]),
});

const AIInput = z.discriminatedUnion("kind", [EmailInput, NotesInput, PlannerInput]);
export type AIInput = z.infer<typeof AIInput>;

function buildPrompt(data: AIInput): { system: string; user: string } {
  if (data.kind === "email") {
    return {
      system: `Role: You are WorkMate AI, a professional workplace writing assistant.
Task: Write one complete workplace email using ONLY the information the user provides.
Output format:
Subject: <one concise subject line>
<blank line>
<greeting>
<2-4 short body paragraphs or a short bulleted list where it helps readability>
<clear closing line and sign-off with "[Your name]" as the placeholder>
Constraints:
- Match the requested tone exactly.
- If the recipient is "Not specified", use a neutral greeting such as "Hi all," or "Hello," — never write the words "Not specified" in the email.
- Keep it under 250 words unless the key points require more.
- Do not invent company names, figures, dates, attachments or commitments.
- Return plain text only, no markdown code fences.
${RESPONSIBLE_AI}`,
      user: `Tone: ${data.tone}
Recipient or audience: ${data.recipient?.trim() || "Not specified"}
Purpose of the email: ${data.purpose.trim()}
Key points to cover:
${data.keyPoints.trim()}`,
    };
  }

  if (data.kind === "notes") {
    return {
      system: `Role: You are WorkMate AI, a meeting documentation assistant.
Task: Extract and organise the raw meeting notes provided by the user. Extract only; never infer or invent.
Output format (use these exact headings, plain text, no code fences):
SUMMARY
- 2-4 bullet points

KEY DECISIONS
- one bullet per decision (write "None recorded" if there are none)

ACTION ITEMS
- <action> — Owner: <name or "Unassigned"> — Deadline: <date or "Not specified">

DEADLINES
- <deadline> — <what it relates to> (write "Not specified" if none)

PEOPLE RESPONSIBLE
- <name> — <responsibility>

OPEN QUESTIONS
- one bullet per unresolved question (write "None recorded" if there are none)
Constraints:
- Never guess an owner, date or outcome. Use "Unassigned" / "Not specified".
- Keep the original meaning and wording of decisions.
${RESPONSIBLE_AI}`,
      user: `Raw meeting notes:
${data.notes.trim()}`,
    };
  }

  return {
    system: `Role: You are WorkMate AI, a workplace productivity planning assistant.
Task: Turn the user's task list into a realistic ${data.horizon.toLowerCase()} schedule.
Output format (plain text, no code fences):
PLAN OVERVIEW
- 2-3 bullets on the approach and workload

URGENT / HIGH PRIORITY
- [!] <task> — Deadline: <date or "Not specified"> — Suggested time: <estimate>

SCHEDULE (suggested order)
1. <task> — Priority: <High/Medium/Low> — Deadline: <date or "Not specified"> — Suggested slot & duration

NOTES
- practical advice on sequencing, buffers and risks
Constraints:
- Never invent deadlines, task details or meetings the user did not provide; write "Not specified".
- Time allocations are suggestions and must be realistic for a normal working ${data.horizon === "Daily" ? "day" : "week"}.
- Mark every urgent or high-priority item with [!].
${RESPONSIBLE_AI}`,
    user: `Planning horizon: ${data.horizon}
Default priority for unlabelled tasks: ${data.priority}
Tasks:
${data.tasks.trim()}
Deadline information: ${data.deadlines?.trim() || "Not specified"}`,
  };
}

async function callGateway(system: string, user: string): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured for this app yet.");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      stream: true,
      reasoning: { effort: "low" },
      input: [
        { role: "system", content: [{ type: "input_text", text: system }] },
        { role: "user", content: [{ type: "input_text", text: user }] },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    let message = "The AI service could not complete this request. Please try again.";
    if (res.status === 429)
      message = "Too many requests right now. Please wait a moment and try again.";
    if (res.status === 402)
      message = "AI credits for this workspace have run out. Please top up to continue.";
    if (res.status === 403) message = "AI access is currently blocked for this workspace.";
    console.error("AI gateway error", res.status, detail.slice(0, 500));
    throw new Error(message);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const event = JSON.parse(payload) as {
          type?: string;
          delta?: string;
          response?: { output_text?: string };
        };
        if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
          text += event.delta;
        } else if (event.type === "response.completed" && !text && event.response?.output_text) {
          text = event.response.output_text;
        }
      } catch {
        // ignore keep-alive / non-JSON frames
      }
    }
  }

  if (!text.trim()) {
    throw new Error("The AI returned an empty response. Please try again with more detail.");
  }
  return text.trim();
}

export const generateWithWorkMate = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AIInput.parse(input))
  .handler(async ({ data }) => {
    const { system, user } = buildPrompt(data);
    const text = await callGateway(system, user);
    return { text };
  });
