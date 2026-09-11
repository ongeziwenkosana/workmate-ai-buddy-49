import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarClock, FileText, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { OutputPanel } from "@/components/OutputPanel";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { Button } from "@/components/ui/button";
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
import { SAMPLE_TASKS } from "@/lib/samples";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkMate AI" },
      {
        name: "description",
        content:
          "Turn your task list into a realistic daily or weekly schedule ordered by priority, deadline and practical time allocation.",
      },
      { property: "og:title", content: "AI Task Planner — WorkMate AI" },
      {
        property: "og:description",
        content: "Prioritised, time-boxed schedules built only from the tasks and deadlines you enter.",
      },
    ],
  }),
  component: TaskPlanner,
});

type Priority = "High" | "Medium" | "Low";
type Horizon = "Daily" | "Weekly";

function TaskPlanner() {
  const generate = useServerFn(generateWithWorkMate);
  const [tasks, setTasks] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [horizon, setHorizon] = useState<Horizon>("Weekly");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!tasks.trim()) {
      setError("Add at least one task before generating a schedule.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await generate({
        data: { kind: "planner", tasks, deadlines, priority, horizon },
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
        icon={CalendarClock}
        title="AI Task Planner"
        description="List your tasks and any deadlines you have. WorkMate orders them by priority and suggests realistic time slots."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="glass-panel-strong space-y-5 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Your tasks</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTasks(SAMPLE_TASKS.tasks);
                setDeadlines(SAMPLE_TASKS.deadlines);
                setError(null);
              }}
            >
              <FileText className="size-4" /> Load sample tasks
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tasks">Tasks (one per line)</Label>
            <Textarea
              id="tasks"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder={"Prepare quarterly report draft\nReview pull requests\nTeam one-on-ones"}
              className="min-h-48"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadlines">Deadline information (optional)</Label>
            <Textarea
              id="deadlines"
              value={deadlines}
              onChange={(e) => setDeadlines(e.target.value)}
              placeholder={"Quarterly report - Thursday\nSlides - Friday morning"}
              className="min-h-28"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="priority">Default priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger id="priority" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["High", "Medium", "Low"] as Priority[]).map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="horizon">Planning period</Label>
              <Select value={horizon} onValueChange={(v) => setHorizon(v as Horizon)}>
                <SelectTrigger id="horizon" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Daily", "Weekly"] as Horizon[]).map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Planning…" : "Generate Schedule"}
          </Button>
        </form>

        <OutputPanel
          title="Suggested schedule"
          value={output}
          onChange={setOutput}
          loading={loading}
          error={error}
          loadingHint="Building your schedule…"
          emptyHint="Your prioritised schedule will appear here. Add tasks and press Generate Schedule, or load the sample tasks."
        />
      </div>

      <div className="mt-8">
        <ResponsibleAINotice compact />
      </div>
    </AppShell>
  );
}
