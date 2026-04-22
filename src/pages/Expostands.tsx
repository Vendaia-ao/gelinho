import { Link } from "react-router-dom";
import { useExpostandsInfo } from "@/hooks/useSiteData";
import ProcessTimeline from "@/components/ProcessTimeline";
import { Boxes, Hammer, LifeBuoy, Package } from "lucide-react";

const Expostands = () => {
  const { data: info } = useExpostandsInfo();

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center pt-24 bg-brand-slate text-white overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-[11px] uppercase tracking-[0.25em] font-medium mb-5">
              <Boxes className="w-3.5 h-3.5" />
              Gelinhoo Group
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-header font-light leading-tight mb-5">
              {info?.hero_title ?? "Gelinho Expostands"}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8">
              {info?.hero_subtitle ??
                "Stands e material corporativo para eventos de excelência."}
            </p>
            <Link
              to={info?.cta_link ?? "/contacto"}
              className="inline-block px-8 py-3 bg-brand-gold text-brand-slate font-medium uppercase tracking-widest text-xs rounded-full hover:bg-white transition-colors"
            >
              {info?.cta_label ?? "Pedir Orçamento"}
            </Link>
          </div>

          <div className="relative hidden md:block">
            <div className="aspect-square rounded-sm bg-gradient-to-br from-brand-gold/20 to-brand-slate/40 border border-brand-gold/30 flex items-center justify-center">
              <Boxes className="w-32 h-32 text-brand-gold opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
            Sobre
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-light text-brand-slate mb-6">
            O que fazemos
          </h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto mb-8" />
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed">
            {info?.about_text}
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 md:py-24 bg-brand-gray bg-texture">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
              Serviços
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-light text-brand-slate">
              Soluções completas para o seu evento
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: Hammer,
                title: "Montagem da Stand",
                desc: "Construção e montagem de stands personalizados, da estrutura aos acabamentos.",
              },
              {
                icon: LifeBuoy,
                title: "Apoio no Evento",
                desc: "Acompanhamento técnico durante toda a duração do evento.",
              },
              {
                icon: Package,
                title: "Desmontagem",
                desc: "Desmontagem rápida e organizada após o encerramento do evento.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-background p-6 md:p-8 border border-border rounded-sm hover:border-brand-gold/40 hover:shadow-md transition-all"
              >
                <s.icon className="w-8 h-8 text-brand-gold mb-4" />
                <h3 className="font-header font-medium text-lg text-brand-slate mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessTimeline
        type="expostands"
        title="O Nosso Processo"
        subtitle="Como Trabalhamos"
      />

      {/* CTA */}
      <section className="py-16 md:py-20 bg-brand-slate text-center text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-header font-light mb-4">
            Pronto para destacar a sua marca no próximo evento?
          </h2>
          <p className="text-gray-400 font-light mb-8">
            Fale connosco e receba um protótipo da sua stand.
          </p>
          <Link
            to="/contacto"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-slate font-medium uppercase tracking-widest text-xs rounded-full hover:bg-white transition-colors"
          >
            Pedir Orçamento
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Expostands;
