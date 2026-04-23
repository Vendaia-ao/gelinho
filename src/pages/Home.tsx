import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero.jpeg";
import { WireframeCube, WireframeGrid } from "@/components/WireframeShapes";
import StatsCounter from "@/components/StatsCounter";
import ExpostandsHighlight from "@/components/ExpostandsHighlight";
import ProcessTimeline from "@/components/ProcessTimeline";
import BlogTeaser from "@/components/BlogTeaser";
import ClientsMarquee from "@/components/ClientsMarquee";

const Home = () => {
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

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const marqueeImages1 = [
    "/portfolio/p2.jpeg",
    "/portfolio/p3.jpeg",
    "/portfolio/p6.jpeg",
    "/portfolio/p8.jpeg",
    "/portfolio/p9.jpeg",
  ];
  const marqueeImages2 = [
    "/portfolio/p10.jpeg",
    "/portfolio/p11.jpeg",
    "/portfolio/p12.jpeg",
    "/portfolio/p13.jpeg",
    "/portfolio/p14.jpeg",
  ];

  const specialties = [
    {
      title: "Arquitetura",
      icon: "fa-compass-drafting",
      copy:
        "Visões traduzidas em planos. Do conceito ao licenciamento, com renderização 3D hiper-realista.",
    },
    {
      title: "Interiores & Exteriores",
      icon: "fa-couch",
      copy:
        "Atmosferas que contam histórias. Curadoria de materiais, luz e mobiliário — dentro e fora.",
    },
    {
      title: "Construção & Manutenção",
      icon: "fa-trowel-bricks",
      copy:
        "Execução com rigor e prazos cumpridos. E acompanhamos a obra muito depois das chaves entregues.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. FIXED HERO */}
      <section className="fixed inset-0 w-full h-screen flex items-center justify-center overflow-hidden bg-foreground -z-10">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Urban Architecture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full pt-20 md:pt-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-white mb-4 md:mb-5 tracking-tight leading-tight drop-shadow-xl animate-fade-in-up">
            Soluções mais criativas
          </h1>
          <div className="space-y-2 mb-6 md:mb-8 animate-fade-in-up-delay-1 px-2">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 font-light leading-relaxed">
              Facilitamos o acesso a um projeto para quem almeja qualidade de vida.
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 font-light">
              Traçamos sonhos, erguemos conforto.
            </p>
          </div>
          <Link
            to="/contacto#formulario"
            className="bg-white text-foreground hover:bg-brand-gold hover:text-white px-6 md:px-8 py-3 rounded-full font-medium text-xs md:text-sm transition-all duration-500 ease-out shadow-xl hover:scale-105 animate-fade-in-up-delay-2"
          >
            Peça o orçamento para o seu projeto
          </Link>
          <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow opacity-70">
            <i className="fas fa-chevron-down text-white text-xl"></i>
          </div>
        </div>
      </section>

      {/* 2. CONTENT OVERLAY */}
      <div className="relative z-20 mt-[100vh] bg-background shadow-[0_-20px_30px_rgba(0,0,0,0.1)]">
        {/* QUEM SOMOS */}
        <section className="py-16 md:py-32 px-4 max-w-7xl mx-auto relative">
          <div className="absolute top-0 right-0 w-1/3 h-full border-l border-brand-gold/10 -z-10"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-border -z-10"></div>
          <div className="absolute top-20 right-10 z-[5] opacity-60 pointer-events-none hidden lg:block">
            <WireframeCube />
          </div>

          <div
            ref={addToRefs}
            className="reveal-element grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10"
          >
            <div className="relative order-2 md:order-1">
              <div className="absolute -inset-4 bg-brand-gold/10 rounded-lg transform rotate-3 z-0 hidden md:block"></div>
              <img
                src="https://picsum.photos/id/434/600/700"
                alt="About Gelinhoo"
                className="relative rounded-lg shadow-2xl z-10 bg-white p-2 w-full"
              />
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-brand-gold uppercase tracking-[0.3em] md:tracking-[0.4em] text-xs font-medium mb-3 md:mb-4">
                Quem Somos
              </h3>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-brand-slate mb-6 md:mb-8 leading-[1.05]">
                Construindo Legados <br />
                <span className="italic text-brand-gold">desde a fundação.</span>
              </h2>

              <div className="w-16 md:w-20 h-px bg-brand-gold mb-6 md:mb-8"></div>

              <p className="text-muted-foreground font-light leading-relaxed md:leading-loose text-base md:text-lg mb-4 md:mb-6">
                <span className="text-brand-slate font-medium">Gelinhoo Projectart (SU), LDA</span> —
                NIF 5001115006. Trabalhamos a pensar em si para deixar o seu empreendimento
                mais bonito.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed md:leading-loose mb-6 md:mb-8 text-sm md:text-base">
                Combinamos rigor técnico com sensibilidade artística para entregar obras que não
                são apenas estruturas, mas marcos de design em Angola.
              </p>

              <div className="flex items-center gap-4">
                <div className="bg-brand-gray p-3 md:p-4 rounded-full border border-border shadow-sm">
                  <i className="fas fa-hard-hat text-brand-gold text-lg md:text-xl"></i>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Excelência Certificada
                  </p>
                  <p className="text-brand-slate font-medium text-sm md:text-base">
                    NIF: 5001115006
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLIENTS MARQUEE — moved here, right after Quem Somos */}
        <ClientsMarquee />

        {/* ESPECIALIDADES */}
        <section className="py-16 md:py-32 bg-secondary bg-texture-rich relative overflow-hidden">
          <div className="absolute top-10 left-10 w-[80%] h-[1px] bg-brand-gold/20 hidden md:block"></div>
          <div className="absolute top-10 left-10 w-[1px] h-[80%] bg-brand-gold/20 hidden md:block"></div>
          <div className="absolute bottom-20 right-20 z-[5] opacity-50 pointer-events-none hidden lg:block">
            <WireframeGrid />
          </div>
          <div className="absolute top-40 left-16 z-[5] opacity-40 pointer-events-none hidden xl:block">
            <WireframeGrid className="scale-75" />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10 md:mb-20">
              <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
                Especialidades
              </h4>
              <h2
                ref={addToRefs}
                className="reveal-element font-display text-3xl sm:text-4xl md:text-5xl text-brand-slate mb-4"
              >
                Nossas <span className="italic text-brand-gold">especialidades</span>
              </h2>
              <div className="w-12 h-[2px] bg-brand-gold mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {specialties.map((s, i) => (
                <div
                  key={s.title}
                  ref={addToRefs}
                  className={`reveal-element group bg-background p-6 md:p-10 rounded-xl shadow-sm border border-border relative overflow-hidden lift hover:shadow-2xl ${
                    i === 2 ? "sm:col-span-2 md:col-span-1" : ""
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                  <div className="text-brand-gold text-3xl md:text-4xl mb-4 md:mb-6 transition-transform duration-500 group-hover:-translate-y-1">
                    <i className={`fa-solid ${s.icon}`}></i>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-brand-slate mb-3 md:mb-4 group-hover:text-brand-gold transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    {s.copy}
                  </p>
                  <Link
                    to="/servicos"
                    className="inline-block mt-4 md:mt-6 text-brand-gold text-xs uppercase tracking-widest font-medium link-underline"
                  >
                    Saber mais →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO MARQUEE */}
        <section className="py-12 md:py-20 bg-background bg-dots relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-8 md:mb-12 text-center">
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-2">
              Portfólio
            </h4>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-slate">
              Obras de <span className="italic text-brand-gold">arte reais</span>
            </h2>
          </div>

          <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden -skew-y-3 scale-105 md:scale-110">
            <div className="flex space-x-4 md:space-x-6 w-[300%] md:w-[200%] animate-marquee mb-4 md:mb-6">
              {[...marqueeImages1, ...marqueeImages1].map((img, index) => (
                <div
                  key={`row1-${index}`}
                  className="w-48 h-36 md:w-80 md:h-60 flex-shrink-0 relative rounded-lg overflow-hidden group shadow-lg"
                >
                  <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4 md:space-x-6 w-[300%] md:w-[200%] animate-marquee-reverse -translate-x-1/2">
              {[...marqueeImages2, ...marqueeImages2].map((img, index) => (
                <div
                  key={`row2-${index}`}
                  className="w-48 h-36 md:w-80 md:h-60 flex-shrink-0 relative rounded-lg overflow-hidden group shadow-lg"
                >
                  <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12 relative z-10">
            <Link
              to="/portfolio"
              className="inline-block border border-brand-slate text-brand-slate px-6 md:px-8 py-3 rounded-full uppercase tracking-widest text-xs font-medium hover:bg-brand-slate hover:text-white transition-colors"
            >
              Ver Galeria Completa
            </Link>
          </div>
        </section>

        <StatsCounter />
        <ExpostandsHighlight />
        <ProcessTimeline type="projectart" title="Como Trabalhamos" subtitle="Processo Projectart" />
        <BlogTeaser />

        {/* CTA FINAL */}
        <section className="py-16 md:py-24 bg-secondary bg-texture-rich relative border-t border-border">
          <div className="absolute inset-0 bg-blueprint opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-brand-slate mb-6 md:mb-8 leading-[1.05]">
              Pronto para erguer o <span className="italic text-brand-gold">seu sonho?</span>
            </h2>
            <p className="text-gray-500 mb-8 md:mb-10 font-light text-base md:text-lg">
              A excelência começa com uma conversa.
            </p>
            <Link
              to="/contacto"
              className="inline-block px-8 md:px-10 py-3 md:py-4 bg-brand-gold text-white font-medium uppercase tracking-widest hover:bg-brand-gold-dark transition-all duration-500 rounded-full shadow-lg hover:shadow-xl text-xs md:text-sm"
            >
              Solicitar Consulta Gratuita
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
