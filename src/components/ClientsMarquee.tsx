import { useClients } from "@/hooks/useSiteData";
import ClientLogo from "./ClientLogo";

const ClientsMarquee = () => {
  const { data: clients = [] } = useClients();

  if (clients.length === 0) return null;

  // Duplicate list so the loop is seamless
  const loop = [...clients, ...clients];

  return (
    <section className="py-16 md:py-24 bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10 md:mb-14">
        <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
          Confiam em Nós
        </h4>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-light text-brand-slate">
          Empresas e Instituições Parceiras
        </h2>
      </div>

      <div className="relative w-full">
        {/* Side fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex w-max animate-marquee-seamless gap-12 md:gap-20 items-center py-4">
          {loop.map((c, i) => (
            <div key={`${c.id}-${i}`} className="flex-shrink-0 flex items-center justify-center h-20">
              <ClientLogo name={c.name} logoUrl={c.logo_url} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
