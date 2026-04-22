import { useCompanyValues } from "@/hooks/useSiteData";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const toComponent = (key?: string | null): LucideIcon => {
  if (!key) return LucideIcons.Sparkles;
  const pascal = key
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  return ((LucideIcons as unknown) as Record<string, LucideIcon>)[pascal] ?? LucideIcons.Sparkles;
};

const MissionVisionValues = () => {
  const { data: items = [] } = useCompanyValues();
  const mission = items.find((i) => i.value_type === "mission");
  const vision = items.find((i) => i.value_type === "vision");
  const values = items.filter((i) => i.value_type === "value");

  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-gray bg-texture relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
            Identidade
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-light text-brand-slate">
            Missão, Visão e Valores
          </h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {[mission, vision].filter(Boolean).map((item) => {
            const Icon = toComponent(item!.icon);
            return (
              <div
                key={item!.id}
                className="relative bg-background p-8 md:p-10 rounded-sm shadow-sm border border-border hover:border-brand-gold/40 transition-colors"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold" />
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-brand-gold" />
                  <h3 className="text-xl md:text-2xl font-header font-medium text-brand-slate">
                    {item!.title}
                  </h3>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {item!.description}
                </p>
              </div>
            );
          })}
        </div>

        {values.length > 0 && (
          <>
            <h3 className="text-center text-sm uppercase tracking-[0.3em] text-brand-gold font-medium mb-8">
              Os Nossos Valores
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {values.map((v) => {
                const Icon = toComponent(v.icon);
                return (
                  <div
                    key={v.id}
                    className="text-center p-5 md:p-6 bg-background border border-border rounded-sm hover:shadow-md hover:-translate-y-1 transition-all"
                  >
                    <Icon className="w-7 h-7 text-brand-gold mx-auto mb-3" />
                    <h4 className="font-header font-medium text-brand-slate mb-2">{v.title}</h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MissionVisionValues;
