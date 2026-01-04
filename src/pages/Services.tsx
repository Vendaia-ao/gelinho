import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Import service images
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

  const services = [
    {
      id: 1,
      title: "Arquitetura & Projetos 3D",
      description:
        "Transformamos visões abstratas em projetos tangíveis e deslumbrantes. A nossa abordagem arquitetónica equilibra a estética contemporânea com a funcionalidade prática, utilizando tecnologia de renderização 3D de última geração para que possa 'caminhar' pela sua obra antes mesmo de ela começar.",
      icon: "fa-compass-drafting",
      image: heroServicesImg,
      features: [
        "Estudos de Viabilidade e Layout",
        "Modelagem 3D e Renderização Hiper-realista",
        "Projetos de Licenciamento Camarário",
        "Arquitetura Sustentável e Bioclimática",
      ],
    },
    {
      id: 2,
      title: "Design de Interiores",
      description:
        "Criamos atmosferas que contam histórias. O nosso design de interiores vai além da decoração; é uma curadoria de conforto, luxo e identidade. Selecionamos materiais nobres, texturas ricas e mobiliário exclusivo para elevar o padrão do seu espaço residencial ou comercial.",
      icon: "fa-couch",
      image: interior1Img,
      features: [
        "Planeamento de Espaços (Space Planning)",
        "Desenho de Mobiliário à Medida",
        "Seleção de Acabamentos e Iluminação",
        'Decoração "Chave na Mão"',
      ],
    },
    {
      id: 3,
      title: "Construção Civil",
      description:
        "Rigor, segurança e prazos cumpridos. A nossa equipa de engenharia gere obras de alta complexidade, garantindo que o projeto aprovado no papel é executado com precisão milimétrica. Utilizamos materiais certificados e técnicas construtivas avançadas.",
      icon: "fa-trowel-bricks",
      image: interior2Img,
      features: [
        "Construção de Moradias de Alto Padrão",
        "Edifícios Comerciais e Escritórios",
        "Gestão e Fiscalização de Obra",
        "Reabilitação de Estruturas",
      ],
    },
    {
      id: 4,
      title: "Obras Públicas & Infraestruturas",
      description:
        "Parceiros no desenvolvimento de Angola. Executamos projetos de grande escala com a seriedade que o setor público exige. Focamo-nos na durabilidade e no impacto social positivo das infraestruturas que erguemos.",
      icon: "fa-building-columns",
      image: eventsImg,
      features: [
        "Pavimentação e Estradas",
        "Edifícios Institucionais e Escolas",
        "Saneamento Básico e Redes Hidráulicas",
        "Manutenção de Infraestruturas Públicas",
      ],
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* HERO HEADER */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={heroServicesImg}
            alt="Arquitetura moderna - Gelinho Projectart"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 animate-fade-in-up">
            Serviços
          </h4>
          <h1 className="text-4xl md:text-6xl font-header font-light text-white mb-6 animate-fade-in-up-delay-1">
            O que Fazemos de <span className="font-medium">Melhor</span>
          </h1>
          <div className="w-16 h-[2px] bg-brand-gold mx-auto"></div>
        </div>
      </section>

      {/* SERVICES SECTIONS */}
      {services.map((service, index) => (
        <section
          key={service.id}
          className={`py-24 ${
            index % 2 === 0 ? "bg-white" : "bg-brand-gray bg-texture"
          } relative overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex flex-col lg:flex-row items-center gap-16 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Content */}
              <div
                ref={addToRefs}
                className="reveal-element w-full lg:w-1/2"
              >
                <div className="inline-flex items-center gap-4 mb-8 px-6 py-3 bg-brand-gold/10 rounded-sm">
                  <i
                    className={`fa-solid ${service.icon} text-brand-gold text-2xl`}
                  ></i>
                  <span className="text-brand-gold text-xs uppercase font-medium tracking-widest">
                    Serviço {String(service.id).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-header font-light text-brand-slate mb-8 leading-tight">
                  {service.title}
                </h2>

                <p className="text-gray-600 font-light leading-loose mb-10">
                  {service.description}
                </p>

                <div className="space-y-4 border-l-2 border-brand-gold/20 pl-6">
                  {service.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center gap-4 text-gray-700 font-light"
                    >
                      <i className="fas fa-check-circle text-brand-gold text-sm"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Content */}
              <div
                ref={addToRefs}
                className="reveal-element w-full lg:w-1/2"
                style={{ transitionDelay: "200ms" }}
              >
                <div className="relative group">
                  {/* Image Frame/Shadow Effect */}
                  <div className="absolute inset-0 bg-brand-gold transition-transform duration-500 ease-out translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 -z-10 rounded-sm"></div>

                  <div className="relative overflow-hidden rounded-sm shadow-2xl aspect-[4/3]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FINAL CTA */}
      <section className="py-24 bg-brand-slate text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cubes"></div>
        <div className="relative z-10 px-4">
          <h2 className="text-3xl text-white font-light mb-8">
            Tem um projeto complexo em mente?
          </h2>
          <Link
            to="/contacto"
            className="px-10 py-4 bg-brand-gold text-white font-medium uppercase tracking-widest hover:bg-white hover:text-brand-slate transition-all duration-300 rounded-sm inline-block"
          >
            Fale com um Engenheiro
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
