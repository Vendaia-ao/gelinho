import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroServicesImg from "@/assets/services/hero-services.jpeg";
import interior1Img from "@/assets/services/interior-1.jpeg";
import interior2Img from "@/assets/services/interior-2.jpeg";
import eventsImg from "@/assets/services/events.jpeg";

const Services = () => {
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
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const services = [
    {
      id: 1,
      title: "Arquitetura & Projetos 3D",
      description:
        "Idealizamos cada espaço a partir de uma escuta atenta das suas ambições. Da volumetria ao último detalhe, traduzimos a sua visão em desenhos rigorosos e renderizações 3D hiper-realistas, para que possa habitar o projeto antes mesmo da primeira pedra.",
      icon: "fa-compass-drafting",
      image: heroServicesImg,
      features: [
        "Estudo prévio e projeto de licenciamento",
        "Modelação BIM e renderização 3D fotorrealista",
        "Projetos de execução com pormenor construtivo",
        "Arquitetura sustentável e bioclimática",
      ],
    },
    {
      id: 2,
      title: "Design de Interiores & Exteriores",
      description:
        "Curamos cada ambiente como uma peça única — dentro e fora. Da seleção de materiais nobres ao desenho de mobiliário à medida, do paisagismo ao desenho de áreas de lazer, criamos atmosferas que conjugam beleza, conforto e identidade.",
      icon: "fa-couch",
      image: interior1Img,
      features: [
        "Space planning e mood boards",
        "Mobiliário desenhado à medida",
        "Paisagismo e desenho de exteriores",
        "Decoração chave-na-mão",
      ],
    },
    {
      id: 3,
      title: "Construção Civil",
      description:
        "Executamos com rigor o que se desenhou com paixão. A nossa equipa coordena obras de moradias premium, edifícios comerciais e infraestruturas com gestão integrada de prazos, qualidade e segurança em estaleiro.",
      icon: "fa-trowel-bricks",
      image: interior2Img,
      features: [
        "Construção de moradias de alto padrão",
        "Edifícios comerciais e institucionais",
        "Reabilitação e remodelação de estruturas",
        "Fiscalização e gestão integrada de obra",
      ],
    },
    {
      id: 4,
      title: "Manutenção de Projetos",
      description:
        "O nosso compromisso continua depois da entrega. Mantemos os seus espaços como no primeiro dia: intervenções preventivas, correções pontuais e contratos de manutenção que preservam o valor e a beleza do investimento.",
      icon: "fa-screwdriver-wrench",
      image: eventsImg,
      features: [
        "Planos de manutenção preventiva e corretiva",
        "Acompanhamento técnico pós-entrega",
        "Renovação de acabamentos e instalações",
        "Suporte rápido a clientes residenciais e corporativos",
      ],
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* HERO */}
      <section className="inner-hero min-h-[55vh] md:min-h-[65vh] flex items-center justify-center pt-24 md:pt-32 pb-16">
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 animate-fade-in-up">
            Serviços
          </h4>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-white mb-5 md:mb-6 leading-[1.05] animate-fade-in-up-delay-1">
            O que fazemos de <span className="italic text-brand-gold">melhor</span>
          </h1>
          <p className="text-gray-300 font-light max-w-2xl mx-auto animate-fade-in-up-delay-2">
            Quatro pilares para uma só missão: erguer espaços que façam sentido para quem os habita.
          </p>
          <div className="w-12 md:w-16 h-[2px] bg-brand-gold mx-auto mt-6"></div>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          className={`py-12 md:py-24 ${index % 2 === 0 ? "bg-white" : "bg-brand-gray bg-texture"} relative overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col lg:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              <div ref={addToRefs} className="reveal-element w-full lg:w-1/2">
                <div className="inline-flex items-center gap-3 md:gap-4 mb-6 md:mb-8 px-4 md:px-6 py-2 md:py-3 bg-brand-gold/10 rounded-sm">
                  <i className={`fa-solid ${service.icon} text-brand-gold text-xl md:text-2xl`}></i>
                  <span className="text-brand-gold text-xs uppercase font-medium tracking-widest">
                    Serviço {String(service.id).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-slate mb-6 md:mb-8 leading-[1.05]">
                  {service.title}
                </h2>

                <p className="text-gray-600 font-light leading-relaxed md:leading-loose mb-8 md:mb-10 text-sm md:text-base">
                  {service.description}
                </p>

                <div className="space-y-3 md:space-y-4 border-l-2 border-brand-gold/20 pl-4 md:pl-6">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start md:items-center gap-3 md:gap-4 text-gray-700 font-light text-sm md:text-base">
                      <i className="fas fa-check-circle text-brand-gold text-sm mt-0.5 md:mt-0"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div ref={addToRefs} className="reveal-element w-full lg:w-1/2" style={{ transitionDelay: "200ms" }}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-brand-gold transition-transform duration-700 ease-out translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 -z-10 rounded-sm"></div>
                  <div className="relative overflow-hidden rounded-sm shadow-2xl aspect-[4/3]">
                    <img src={service.image} alt={service.title} className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 md:py-24 bg-brand-slate text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cubes"></div>
        <div className="relative z-10 px-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-6 md:mb-8">
            Tem um projeto complexo em mente?
          </h2>
          <Link
            to="/contacto"
            className="px-8 md:px-10 py-3 md:py-4 bg-brand-gold text-white font-medium uppercase tracking-widest hover:bg-white hover:text-brand-slate transition-all duration-500 rounded-sm inline-block text-sm"
          >
            Fale com um Engenheiro
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
