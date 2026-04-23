import { useClients } from "@/hooks/useSiteData";
import ClientLogo from "./ClientLogo";

const ClientsMarquee = () => {
  const { data: clients = [] } = useClients();

  if (clients.length === 0) return null;

  // Duplicate list so the loop is seamless


  return (
    <section className="py-20 md:py-32 bg-brand-gray border-t border-border overflow-hidden relative">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-texture opacity-30"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Architectural Lines */}
        <div className="absolute top-10 left-10 w-40 h-px bg-brand-gold/20 rotate-45 transform-gpu"></div>
        <div className="absolute top-20 left-12 w-20 h-px bg-brand-gold/20 -rotate-45 transform-gpu"></div>
        <div className="absolute bottom-20 right-10 w-60 h-px bg-brand-gold/10 rotate-12 transform-gpu"></div>
        
        {/* Deconstructed Shapes */}
        <div className="absolute top-1/3 right-[10%] w-12 h-12 border border-brand-gold/10 rotate-12 animate-bounce-slow"></div>
        <div className="absolute bottom-1/4 left-[15%] w-8 h-8 bg-brand-gold/5 rounded-sm -rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 left-5 w-4 h-4 border-l border-t border-brand-gold/20"></div>
        
        {/* Sparkle effects (small points) */}
        <div className="absolute top-[20%] left-[40%] w-1 h-1 bg-brand-gold rounded-full animate-ping"></div>
        <div className="absolute bottom-[30%] right-[30%] w-1 h-1 bg-brand-gold rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center mb-16 md:mb-20 relative z-10">
        <h4 className="text-brand-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-medium mb-4">
          Confiam em Nós
        </h4>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-brand-slate">
          Empresas e Instituições <span className="italic text-brand-gold">Parceiras</span>
        </h2>
        <div className="w-16 h-px bg-brand-gold/30 mx-auto mt-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-5 gap-4 sm:gap-8 md:gap-12 lg:gap-20 items-center justify-items-center">
          {clients.map((c) => (
            <div key={c.id} className="w-full flex items-center justify-center h-16 md:h-24">
              <ClientLogo name={c.name} logoUrl={c.logo_url} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
