import { useProcessSteps } from "@/hooks/useSiteData";
import { useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const toComponent = (key?: string | null): LucideIcon => {
  if (!key) return LucideIcons.Circle;
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
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  if (steps.length === 0) return null;

  return (
    <section
      className={`py-16 md:py-24 ${
        inverted ? "bg-brand-slate text-white" : "bg-brand-gray bg-texture text-brand-slate"
      } relative`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-medium mb-3">
            {subtitle ?? "Como Trabalhamos"}
          </h4>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
            {title ?? "O Nosso Processo"}
          </h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Same desktop layout, scaled down on mobile */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-gold/30 -translate-x-1/2" />
          <div className="space-y-5 md:space-y-12">
            {steps.map((step, i) => {
              const Icon = toComponent(step.icon);
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.id}
                  ref={addToRefs}
                  className={`reveal-element relative flex items-center gap-3 md:gap-8 ${isLeft ? "" : "flex-row-reverse"}`}
                >
                  <div className="w-1/2 px-2 md:px-8">
                    <div
                      className={`bg-background ${inverted ? "" : "shadow-md"} border border-border rounded-sm p-3 md:p-6 hover:border-brand-gold/40 transition-colors text-brand-slate`}
                    >
                      <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                        <span className="text-brand-gold font-display text-base md:text-2xl tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-brand-gold" />
                      </div>
                      <h3 className="font-display text-sm md:text-xl mb-1 md:mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-[11px] md:text-sm font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {/* dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-brand-gold ring-2 md:ring-4 ring-background" />
                  <div className="w-1/2" />
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
