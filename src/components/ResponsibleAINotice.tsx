import { ShieldCheck } from "lucide-react";

const AVOID = [
  "Client names",
  "Contracts or NDA information",
  "Personal data",
  "Passwords or API keys",
  "Internal financial figures",
];

export function ResponsibleAINotice({ compact = false }: { compact?: boolean }) {
  return (
    <section className="glass-panel rounded-2xl border-primary/20 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="size-5" />
        </span>
        <div className="space-y-3">
          <h2 className="text-base font-semibold sm:text-lg">Responsible AI</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            AI-generated content should always be reviewed by the user before professional use. Do
            not enter confidential, private or sensitive company information. AI outputs may contain
            errors and should be verified.
          </p>
          {!compact && (
            <div>
              <p className="text-sm font-medium">Do not enter:</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {AVOID.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
