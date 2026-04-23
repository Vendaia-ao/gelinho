import { useEffect, useRef } from "react";
import ceoImage from "@/assets/team/ceo-magdiel.jpeg";
import aboutImage1 from "@/assets/about/about-1.jpeg";
import aboutImage2 from "@/assets/about/about-2.jpeg";
import MissionVisionValues from "@/components/MissionVisionValues";

const About = () => {
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
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const team = [
    {
      name: "Magdiel Tigre",
      role: "Arquitecto & CEO",
      image: ceoImage,
      instagram: "https://www.instagram.com/__mvgdiell",
    },
  ];

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

      {/* TEAM */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h4 className="text-brand-gold font-medium uppercase tracking-[0.3em] text-xs mb-4">
              Liderança
            </h4>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-slate">
              Nosso <span className="italic text-brand-gold">team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 max-w-sm sm:max-w-none mx-auto">
            {team.map((member) => (
              <div key={member.name} className="group relative">
                <div
                  ref={addToRefs}
                  className="reveal-element relative overflow-hidden rounded-sm mb-4 md:mb-6 aspect-[3/4] bg-gray-100"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-gold">
                        <i className="fab fa-instagram text-lg"></i>
                      </a>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-display text-2xl text-brand-slate group-hover:text-brand-gold transition-colors duration-500">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
