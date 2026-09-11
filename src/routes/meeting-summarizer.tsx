import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { FileText, Loader2, NotebookPen, Sparkles } from "lucide-react";
import { useState } from "react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { OutputPanel } from "@/components/OutputPanel";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateWithWorkMate } from "@/lib/ai.functions";
import { SAMPLE_NOTES } from "@/lib/samples";

export const Route = createFileRoute("/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkMate AI" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into a structured summary with key decisions, action items, deadlines, owners and open questions.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — WorkMate AI" },
      {
        property: "og:description",
        content: "Extract decisions, actions and owners from messy meeting notes — no guessing.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

function MeetingSummarizer() {
  const generate = useServerFn(generateWithWorkMate);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (notes.trim().length < 20) {
      setError("Paste your meeting notes first (at least a few lines).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await generate({ data: { kind: "notes", notes } });
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
        icon={NotebookPen}
        title="Meeting Notes Summarizer"
        description="Paste rough notes. WorkMate organises them into decisions, action items, deadlines, owners and open questions — without inventing anything."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="glass-panel-strong space-y-5 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Raw meeting notes</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setNotes(SAMPLE_NOTES);
                setError(null);
              }}
            >
              <FileText className="size-4" /> Load sample notes
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste bullet points, transcript fragments or typed notes from the meeting."
              className="min-h-[24rem]"
            />
            <p className="text-xs text-muted-foreground">
              Missing owners or dates are marked "Unassigned" or "Not specified" rather than guessed.
            </p>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Summarising…" : "Summarize Meeting"}
          </Button>
        </form>

        <OutputPanel
          title="Structured summary"
          value={output}
          onChange={setOutput}
          loading={loading}
          error={error}
          loadingHint="Reading your notes…"
          emptyHint="Your structured summary will appear here. Paste notes and press Summarize Meeting, or load the sample notes."
        />
      </div>

      <div className="mt-8">
        <ResponsibleAINotice compact />
      </div>
    </AppShell>
  );
}
