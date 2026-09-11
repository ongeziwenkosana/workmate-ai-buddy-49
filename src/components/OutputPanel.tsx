import { AlertTriangle, Check, Copy, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  error: string | null;
  emptyHint: string;
  loadingHint: string;
  title?: string;
};

export function OutputPanel({
  value,
  onChange,
  loading,
  error,
  emptyHint,
  loadingHint,
  title = "AI output",
}: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Select the text and copy manually.");
    }
  }

  return (
    <section className="glass-panel-strong flex min-h-[28rem] flex-col rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">Editable — refine it before you use it.</p>
        </div>
        {value && !loading ? (
          <Button variant="outline" size="sm" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        ) : null}
      </div>

      {error ? (
        <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      {loading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 p-8 text-center">
          <Loader2 className="size-7 animate-spin text-primary" />
          <p className="text-sm font-medium">{loadingHint}</p>
          <p className="text-xs text-muted-foreground">This usually takes a few seconds.</p>
        </div>
      ) : value ? (
        <>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <Check className="size-3.5" /> Draft ready
          </div>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Generated output"
            className="min-h-[22rem] flex-1 resize-y bg-background/70 font-sans text-sm leading-relaxed whitespace-pre-wrap"
          />
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 p-8 text-center">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Sparkles className="size-5" />
          </span>
          <p className="max-w-xs text-sm text-muted-foreground">{emptyHint}</p>
        </div>
      )}
    </section>
  );
}
