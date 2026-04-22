import { useProcessSteps } from "@/hooks/useSiteData";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const toComponent = (key?: string | null): LucideIcon => {
  if (!key) return LucideIcons.Circle;
  // map kebab-case to PascalCase
  const pascal = key
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  return ((LucideIcons as unknown) as Record<string, LucideIcon>)[pascal] ?? LucideIcons.Circle;
};

interface Props {
  type: "projectart" | "expostands";
  title?: string;
  subtitle?: string;
  inverted?: boolean;
}

const ProcessTimeline = ({ type, title, subtitle, inverted }: Props) => {
  const { data: steps = [] } = useProcessSteps(type);
  if (steps.length === 0) return null;

  return (
    <section
      className={`py-16 md:py-24 ${
        inverted ? "bg-brand-slate text-white" : "bg-brand-gray bg-texture text-brand-slate"
      } relative`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
            {subtitle ?? "Como Trabalhamos"}
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-light">
            {title ?? "O Nosso Processo"}
          </h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-4" />
        </div>

        <div className="relative">
          {/* timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-gold/30 -translate-x-1/2" />
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => {
              const Icon = toComponent(step.icon);
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.id}
                  className={`relative md:flex items-center gap-8 ${isLeft ? "" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2 md:px-8">
                    <div
                      className={`bg-background ${
                        inverted ? "" : "shadow-md"
                      } border border-border rounded-sm p-5 md:p-6 hover:border-brand-gold/40 transition-colors text-brand-slate`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-brand-gold font-header text-2xl font-light tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon className="w-5 h-5 text-brand-gold" />
                      </div>
                      <h3 className="font-header font-medium text-lg md:text-xl mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {/* dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-gold ring-4 ring-background" />
                  <div className="md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
