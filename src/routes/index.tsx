import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Mail, NotebookPen, PencilLine, Sparkles, Wand2 } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — WorkMate AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "WorkMate AI helps you draft workplace emails, summarise meeting notes and plan tasks with structured, responsible AI prompts.",
      },
      { property: "og:title", content: "WorkMate AI — Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Three AI workspaces in one dashboard: Smart Email Generator, Meeting Notes Summarizer and AI Task Planner.",
      },
    ],
  }),
  component: Dashboard,
});

const WORKSPACES = [
  {
    to: "/email-generator" as const,
    icon: Mail,
    title: "Smart Email",
    description:
      "Turn a short brief and a few key points into a clear, well-structured workplace email in your chosen tone.",
    cta: "Open Email Generator",
  },
  {
    to: "/meeting-summarizer" as const,
    icon: NotebookPen,
    title: "Meeting Notes",
    description:
      "Paste raw meeting notes and get a structured summary with decisions, action items, owners and open questions.",
    cta: "Open Meeting Summarizer",
  },
  {
    to: "/task-planner" as const,
    icon: CalendarClock,
    title: "Task Planner",
    description:
      "Turn a task list into a realistic daily or weekly schedule ordered by priority and deadline.",
    cta: "Open Task Planner",
  },
];

const STEPS = [
  {
    icon: PencilLine,
    title: "Describe the work",
    description: "Fill in a short form with the details you already have. No confidential data.",
  },
  {
    icon: Wand2,
    title: "Generate",
    description: "A structured prompt guides the AI to produce accurate, well-formatted output.",
  },
  {
    icon: Sparkles,
    title: "Review, edit, copy",
    description: "Every result is editable. Check the facts, adjust the wording, then copy it out.",
  },
];

function Dashboard() {
  return (
    <AppShell>
      <section className="glass-panel-strong mb-10 rounded-3xl p-6 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          <Sparkles className="size-3.5" /> Structured prompts, reviewable output
        </span>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Your workplace productivity assistant
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          WorkMate AI brings three everyday work tasks into one calm workspace: writing emails,
          summarising meetings and planning your week. You stay in control — every result is
          editable before you use it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/email-generator">
              Start with an email <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/meeting-summarizer">Summarise a meeting</Link>
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Your Workspaces</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {WORKSPACES.map(({ to, icon: Icon, title, description, cta }) => (
            <article key={to} className="glass-panel flex flex-col rounded-2xl p-5 sm:p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <Button asChild className="mt-5 w-full" variant="secondary">
                <Link to={to}>
                  {cta} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold sm:text-2xl">How WorkMate Works</h2>
        <p className="mb-5 max-w-2xl text-sm text-muted-foreground">
          Each workspace uses its own structured prompt that defines the AI's role, your task, the
          information you provided, the required output format and strict constraints against
          inventing facts.
        </p>
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="glass-panel rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <ResponsibleAINotice />
    </AppShell>
  );
}
