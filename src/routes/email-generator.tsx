import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Sparkles, Loader2, FileText } from "lucide-react";
import { useState } from "react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { OutputPanel } from "@/components/OutputPanel";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateWithWorkMate } from "@/lib/ai.functions";
import { SAMPLE_EMAIL } from "@/lib/samples";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkMate AI" },
      {
        name: "description",
        content:
          "Draft clear, professional workplace emails from a short brief, with a formal, friendly, persuasive or professional tone.",
      },
      { property: "og:title", content: "Smart Email Generator — WorkMate AI" },
      {
        property: "og:description",
        content: "Generate, edit and copy workplace emails built from the details you provide.",
      },
    ],
  }),
  component: EmailGenerator,
});

type Tone = "Formal" | "Friendly" | "Persuasive" | "Professional";
const TONES: Tone[] = ["Formal", "Friendly", "Persuasive", "Professional"];

function EmailGenerator() {
  const generate = useServerFn(generateWithWorkMate);
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function loadSample() {
    setRecipient(SAMPLE_EMAIL.recipient);
    setPurpose(SAMPLE_EMAIL.purpose);
    setKeyPoints(SAMPLE_EMAIL.keyPoints);
    setTone("Professional");
    setError(null);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!purpose.trim() || !keyPoints.trim()) {
      setError("Add the purpose of the email and at least one key point.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await generate({
        data: { kind: "email", recipient, purpose, keyPoints, tone },
      });
      setOutput(result.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Give WorkMate the purpose and key points. It writes a clear workplace email using only what you provide."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="glass-panel-strong space-y-5 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Email brief</h2>
            <Button type="button" variant="ghost" size="sm" onClick={loadSample}>
              <FileText className="size-4" /> Load sample brief
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient or audience (optional)</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Operations team"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of the email</Label>
            <Textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Announce a change to the weekly meeting time"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyPoints">Key points to cover</Label>
            <Textarea
              id="keyPoints"
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder={"One point per line"}
              className="min-h-40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={(value) => setTone(value as Tone)}>
              <SelectTrigger id="tone" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Generating…" : "Generate Email"}
          </Button>
        </form>

        <OutputPanel
          title="Generated email"
          value={output}
          onChange={setOutput}
          loading={loading}
          error={error}
          loadingHint="Writing your email…"
          emptyHint="Your generated email will appear here. Fill in the brief and press Generate Email, or load the sample brief to try it out."
        />
      </div>

      <div className="mt-8">
        <ResponsibleAINotice compact />
      </div>
    </AppShell>
  );
}
