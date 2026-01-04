const Portfolio = () => {
  const portfolio = [
    {
      title: "Moradia Moderna",
      category: "Residencial",
      location: "Luanda, Angola",
      image: "/portfolio/bento-1.jpeg",
      gridClass: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Salão de Beleza Premium",
      category: "Comercial",
      location: "Luanda, Angola",
      image: "/portfolio/bento-2.jpeg",
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Estações de Estética",
      category: "Comercial",
      location: "Benfica, Luanda",
      image: "/portfolio/bento-3.jpeg",
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Escadaria em Mármore",
      category: "Residencial",
      location: "Talatona, Luanda",
      image: "/portfolio/bento-4.jpeg",
      gridClass: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Lobby Contemporâneo",
      category: "Comercial",
      location: "Luanda Sul, Angola",
      image: "/portfolio/bento-5.jpeg",
      gridClass: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <h4 className="text-brand-gold font-medium uppercase tracking-[0.3em] text-xs mb-4">
            Portfólio
          </h4>
          <h2 className="text-3xl md:text-5xl font-header font-light text-brand-slate">
            Obras de Arte Reais
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          {portfolio.map((item) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden cursor-pointer bg-white shadow-lg rounded-lg ${item.gridClass}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <h3 className="text-xl md:text-2xl font-header font-medium text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-xs flex items-center gap-2 font-light translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <i className="fas fa-map-marker-alt text-brand-gold"></i>
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
