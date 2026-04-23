import { useEffect, useRef, useState } from "react";
import ceoImage from "@/assets/team/ceo-magdiel.jpeg";
import aboutImage1 from "@/assets/about/about-1.jpeg";
import aboutImage2 from "@/assets/about/about-2.jpeg";
import MissionVisionValues from "@/components/MissionVisionValues";
import { useTeamMembers } from "@/hooks/useSiteData";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Instagram, ArrowUpRight } from "lucide-react";

const About = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const { data: teamMembers, isLoading } = useTeamMembers();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [activeDetailMemberId, setActiveDetailMemberId] = useState<string | null>(null);

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
  }, [teamMembers, isLoading]);

  useEffect(() => {
    if (teamMembers && teamMembers.length > 0 && !selectedMemberId) {
      setSelectedMemberId(teamMembers[0].id);
    }
  }, [teamMembers, selectedMemberId]);

  const getImageUrl = (url: string | null) => {
    if (!url) return ceoImage;
    if (url.startsWith("http")) return url;
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/${url}`;
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const selectedMember = teamMembers?.find(m => m.id === selectedMemberId) || (teamMembers && teamMembers[0]);
  const activeDetailMember = teamMembers?.find(m => m.id === activeDetailMemberId);

  return (
    <>
      {/* DARK HERO */}
      <section className="inner-hero pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 animate-fade-in-up">
            A Empresa
          </h4>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-[1.05] mb-5 animate-fade-in-up-delay-1">
            Excelência e solidez <br />
            <span className="italic text-brand-gold">em cada traço.</span>
          </h1>
          <p className="text-gray-300 font-light max-w-2xl mx-auto text-base md:text-lg animate-fade-in-up-delay-2">
            Uma referência angolana em arquitetura, interiores e construção. Rigor técnico,
            sensibilidade artística, acabamentos de nível internacional.
          </p>
          <div className="w-16 h-px bg-brand-gold mx-auto mt-8"></div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 md:py-24 bg-brand-gray bg-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h4 className="text-brand-gold font-medium uppercase tracking-[0.3em] text-xs mb-4">
                Sobre Nós
              </h4>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-slate mb-6 md:mb-8 leading-[1.1]">
                Construímos com <span className="italic text-brand-gold">propósito.</span>
              </h2>
              <div className="w-16 md:w-20 h-[3px] bg-brand-gold mb-8 md:mb-10"></div>

              <p className="text-gray-600 leading-relaxed md:leading-loose font-light mb-4 md:mb-6 text-base md:text-lg">
                A <span className="text-brand-slate font-medium">Gelinhoo Projectart (SU), LDA</span> é
                uma referência no mercado angolano, dedicando-se à criação de espaços que
                transcendem a função básica de abrigo. Combinamos inovação técnica com uma
                sensibilidade artística apurada.
              </p>
              <p className="text-gray-600 leading-relaxed md:leading-loose font-light mb-8 md:mb-10 text-sm md:text-lg">
                Atendemos clientes residenciais premium e entidades governamentais, garantindo
                rigor, transparência e acabamentos de nível internacional.
              </p>

              <div className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 border border-brand-gold/20 bg-white shadow-lg rounded-sm">
                <i className="fas fa-certificate text-brand-gold text-xl md:text-2xl mr-4 md:mr-6"></i>
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    Entidade Certificada
                  </p>
                  <p className="text-brand-slate font-mono tracking-wider text-base md:text-lg font-medium">
                    NIF: 5001115006
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 relative order-1 lg:order-2">
              <div className="space-y-4 md:space-y-6 pt-0 md:pt-12">
                <img
                  src={aboutImage1}
                  alt="Projeto Exterior - Gelinho Projectart"
                  className="rounded-sm shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700 hover:-translate-y-2"
                />
              </div>
              <div className="space-y-4 md:space-y-6">
                <img
                  src={aboutImage2}
                  alt="Projeto Arquitetónico - Gelinho Projectart"
                  className="rounded-sm shadow-2xl border-2 md:border-4 border-white hover:-translate-y-2 transition-transform duration-700"
                />
              </div>
              <div className="absolute -z-10 top-0 right-0 w-24 md:w-40 h-24 md:h-40 border-2 border-brand-gold/20 mt-[-10px] md:mt-[-20px] mr-[-10px] md:mr-[-20px] hidden md:block"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-24 md:w-40 h-24 md:h-40 bg-brand-gold/10 mb-[-10px] md:mb-[-20px] ml-[-10px] md:ml-[-20px] hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      <MissionVisionValues />

      {/* TEAM SECTION */}
      <section className="relative bg-white overflow-hidden py-20 md:py-0">
        {/* Mobile: EDITORIAL STRIP + FOCUS SHIFT */}
        <div className="md:hidden">
          <div className="px-6 mb-8">
            <h4 className="text-brand-gold font-medium uppercase tracking-[0.3em] text-[10px] mb-2">
              Liderança
            </h4>
            <h2 className="font-display text-4xl text-brand-slate">
              Nosso <span className="italic text-brand-gold">team</span>
            </h2>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-6 pb-12 no-scrollbar">
            {isLoading ? (
              <Skeleton className="w-[80vw] h-[110vw] rounded-2xl flex-shrink-0" />
            ) : teamMembers && teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <div 
                  key={member.id} 
                  onClick={() => setActiveDetailMemberId(member.id)}
                  className="group flex-shrink-0 w-[80vw] aspect-[3/4] snap-center relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ease-apple active:scale-[0.98]"
                >
                  <img
                    src={getImageUrl(member.photo_url)}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-brand-gold font-medium uppercase tracking-[0.3em] text-[10px] mb-1">
                      {member.role}
                    </p>
                    <h3 className="font-display text-2xl mb-3">{member.name}</h3>
                    <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/70">
                      Ver detalhe <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>

        {/* Desktop: Spotlight (1 grande + lista lateral) */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h4 className="text-brand-gold font-medium uppercase tracking-[0.3em] text-xs mb-4">
              Liderança
            </h4>
            <h2 className="font-display text-5xl text-brand-slate">
              Nosso <span className="italic text-brand-gold">team</span>
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-12 items-start h-[700px]">
            {/* Main Spotlight */}
            <div className="col-span-8 h-full">
              {isLoading ? (
                <Skeleton className="w-full h-full rounded-sm" />
              ) : selectedMember ? (
                <div className="relative w-full h-full rounded-sm overflow-hidden group shadow-2xl">
                  <img
                    src={getImageUrl(selectedMember.photo_url)}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-brand-gold font-medium uppercase tracking-[0.3em] text-xs mb-2">
                      {selectedMember.role}
                    </p>
                    <h3 className="font-display text-5xl mb-4">{selectedMember.name}</h3>
                    {selectedMember.instagram_url && (
                      <a href={selectedMember.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-300 hover:text-brand-gold transition-colors">
                        <i className="fab fa-instagram text-xl"></i>
                        <span>Seguir no Instagram</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-sm">
                  <p className="text-gray-400">Selecione um membro</p>
                </div>
              )}
            </div>

            {/* Sidebar List */}
            <div className="col-span-4 h-full flex flex-col gap-4 overflow-y-auto pr-4 custom-scrollbar">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-sm" />
                ))
              ) : teamMembers && teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMemberId(member.id)}
                    className={`flex items-center gap-4 p-4 rounded-sm transition-all duration-300 text-left border ${
                      selectedMemberId === member.id
                        ? "bg-brand-slate text-white border-brand-gold shadow-lg translate-x-2"
                        : "bg-white text-brand-slate border-gray-100 hover:border-brand-gold/30 hover:bg-brand-gray"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0">
                      <img
                        src={getImageUrl(member.photo_url)}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className={`font-display text-lg ${selectedMemberId === member.id ? "text-white" : "text-brand-slate"}`}>
                        {member.name}
                      </h4>
                      <p className={`text-[10px] uppercase tracking-wider ${selectedMemberId === member.id ? "text-brand-gold" : "text-gray-400"}`}>
                        {member.role}
                      </p>
                    </div>
                  </button>
                ))
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {/* DETAIL REVEAL OVERLAY (Apple-style) */}
      {activeDetailMember && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setActiveDetailMemberId(null)}
          />
          
          <div className="relative w-full max-w-xl bg-white md:rounded-3xl rounded-t-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full md:slide-in-from-bottom-10 duration-700 ease-apple max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="sticky top-0 right-0 w-full flex justify-end p-6 z-20 pointer-events-none">
              <button 
                onClick={() => setActiveDetailMemberId(null)}
                className="w-10 h-10 bg-black/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-8 pb-12 -mt-16">
              <div className="aspect-square w-48 h-48 mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={getImageUrl(activeDetailMember.photo_url)}
                  alt={activeDetailMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center">
                <h4 className="text-brand-gold font-medium uppercase tracking-[0.3em] text-xs mb-3">
                  {activeDetailMember.role}
                </h4>
                <h2 className="font-display text-4xl text-brand-slate mb-6">
                  {activeDetailMember.name}
                </h2>
                
                <div className="w-12 h-px bg-brand-gold/30 mx-auto mb-6"></div>
                
                <p className="text-gray-500 font-light leading-relaxed text-base mb-8 max-w-md mx-auto">
                  {activeDetailMember.bio || "Comprometido com a excelência e inovação em cada detalhe, trazendo a visão da Gelinhoo Projectart para a realidade angolana."}
                </p>
                
                <div className="flex justify-center items-center gap-6">
                  {activeDetailMember.instagram_url && (
                    <a 
                      href={activeDetailMember.instagram_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-brand-gray border border-border rounded-full text-brand-slate hover:bg-brand-gold hover:text-white transition-all duration-500 group"
                    >
                      <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-medium uppercase tracking-widest">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Visual Highlight Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-gold/5 to-transparent -z-10"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
