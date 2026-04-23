import { Link } from "react-router-dom";
import { useExpostandsInfo } from "@/hooks/useSiteData";
import { ArrowRight, Boxes } from "lucide-react";

const ExpostandsHighlight = () => {
  const { data: info } = useExpostandsInfo();

  return (
    <section className="relative py-16 md:py-28 overflow-hidden bg-brand-slate text-white">
      {/* gold accents */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-[11px] uppercase tracking-[0.25em] font-medium mb-5">
            <Boxes className="w-3.5 h-3.5" />
            Outra unidade do grupo
          </div>
          <h2 className="text-3xl md:text-5xl font-header font-light mb-5 leading-tight">
            {info?.hero_title ?? "Gelinho Expostands"}
          </h2>
          <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed mb-6">
            {info?.hero_subtitle ??
              "Stands e material corporativo para feiras, eventos e conferências."}
          </p>
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
            Criamos stands sob medida que destacam a sua marca: do protótipo 3D à montagem,
            apoio durante o evento e desmontagem completa.
          </p>
          <Link
            to="/expostands"
            className="inline-flex items-center gap-2 px-7 py-3 bg-brand-gold text-brand-slate font-medium uppercase tracking-widest text-xs rounded-full hover:bg-white transition-colors"
          >
            Conhecer a Gelinho Expostands
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-sm overflow-hidden bg-gradient-to-br from-brand-gold/20 to-brand-slate/40 border border-brand-gold/20 flex items-center justify-center">
            <div className="flex items-center justify-center p-12 w-full h-full">
              <img 
                src="/expostandslogo.png" 
                alt="Gelinho Expostands" 
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 rounded-sm overflow-hidden border-2 border-brand-gold/40 hidden md:block shadow-2xl z-20 bg-brand-slate">
            <video
              src="/videos/GE.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpostandsHighlight;
