import { useProcessSteps } from "@/hooks/useSiteData";
import { useEffect, useRef } from "react";

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
      className={`py-20 md:py-32 ${
        inverted ? "bg-brand-slate text-white" : "bg-brand-gray bg-texture text-brand-slate"
      } relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h4 className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-5">
            {subtitle ?? "Como Trabalhamos"}
          </h4>
          <h2 className={`font-display text-4xl sm:text-5xl md:text-6xl ${inverted ? "text-white" : "text-brand-slate"} leading-[1.05]`}>
            {title ?? "O Nosso Processo"}
          </h2>
          <div className="w-16 h-px bg-brand-gold mt-8" />
        </div>

        {/* Steps — minimal numbered list grid (replicating "Valores" layout) */}
        <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-px">
          {steps.map((step, i) => {
            return (
              <div
                key={step.id}
                ref={addToRefs}
                className="reveal-element group flex gap-6 md:gap-8 py-8 md:py-12 border-t border-border last:border-b transition-colors duration-700"
              >
                <div className="flex flex-col items-center shrink-0">
                  <span className="font-display text-xl md:text-3xl text-brand-gold/70 tabular-nums transition-colors duration-700 group-hover:text-brand-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-display text-2xl md:text-3xl ${inverted ? "text-white" : "text-brand-slate"} mb-4 transition-colors duration-700 group-hover:text-brand-gold`}>
                    {step.title}
                  </h4>
                  <p className={`${inverted ? "text-gray-300" : "text-muted-foreground"} font-light leading-relaxed text-sm md:text-base`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
