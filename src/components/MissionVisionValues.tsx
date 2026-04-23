import { useCompanyValues } from "@/hooks/useSiteData";

const MissionVisionValues = () => {
  const { data: items = [] } = useCompanyValues();
  const mission = items.find((i) => i.value_type === "mission");
  const vision = items.find((i) => i.value_type === "vision");
  const values = items.filter((i) => i.value_type === "value");

  if (items.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h4 className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-5">
            Identidade
          </h4>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-slate leading-[1.05]">
            O que nos move,<br />
            <span className="italic text-brand-gold">o que nos define.</span>
          </h2>
          <div className="w-16 h-px bg-brand-gold mt-8" />
        </div>

        {/* Mission & Vision — editorial split */}
        <div className="grid md:grid-cols-2 gap-px bg-border mb-px">
          {[mission, vision].filter(Boolean).map((item) => (
            <div
              key={item!.id}
              className="bg-background p-8 md:p-12 lg:p-16 group transition-colors duration-700 hover:bg-brand-gray/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6">
                {item!.value_type === "mission" ? "01 — Missão" : "02 — Visão"}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-brand-slate mb-6 leading-[1.1]">
                {item!.title}
              </h3>
              <div className="w-12 h-px bg-brand-slate/20 mb-6 transition-all duration-700 group-hover:w-24 group-hover:bg-brand-gold" />
              <p className="text-muted-foreground font-light leading-relaxed text-base md:text-lg">
                {item!.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values — minimal numbered list */}
        {values.length > 0 && (
          <div className="mt-20 md:mt-32">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-10">
              03 — Valores
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-px">
              {values.map((v, i) => (
                <div
                  key={v.id}
                  className="group flex gap-6 md:gap-8 py-8 border-t border-border last:border-b transition-colors duration-700"
                >
                  <span className="font-display text-3xl md:text-4xl text-brand-gold/70 tabular-nums shrink-0 transition-colors duration-700 group-hover:text-brand-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-display text-2xl md:text-3xl text-brand-slate mb-2 transition-colors duration-700 group-hover:text-brand-gold">
                      {v.title}
                    </h4>
                    <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MissionVisionValues;
