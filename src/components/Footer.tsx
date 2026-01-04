import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-brand-gold/20 pt-10 md:pt-16 pb-6 md:pb-8 relative z-20 text-white">
      {/* Gold Texture Overlay */}
      <div className="absolute inset-0 bg-cubes opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand & Contacts */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="text-xl md:text-2xl font-header font-medium tracking-widest text-white mb-3 md:mb-4">
              GELINHO<span className="text-brand-gold">.</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 md:mb-6 font-light">
              NIF: 5001115006 <br />
              Traçamos Sonhos, Erguemos Conforto.
            </p>

            <div className="space-y-2 mb-4 md:mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <i className="fas fa-phone text-brand-gold"></i>
                <span>(+244) 934 566 545</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <i className="fas fa-envelope text-brand-gold"></i>
                <span className="break-all">gelinhoo.projectart@gmail.com</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/gelinhooprojetart.lda?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="text-gray-400 hover:text-brand-gold transition-colors"
              >
                <i className="fab fa-instagram text-lg md:text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-gold transition-colors"
              >
                <i className="fab fa-facebook text-lg md:text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-gold transition-colors"
              >
                <i className="fab fa-linkedin text-lg md:text-xl"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-brand-gold font-medium uppercase tracking-widest text-xs mb-4 md:mb-6">
              Navegação
            </h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm font-light">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors">
                  A Empresa
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="hover:text-white transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="hover:text-white transition-colors"
                >
                  Portfólio
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="text-brand-gold font-medium uppercase tracking-widest text-xs mb-4 md:mb-6">
              Áreas de Atuação
            </h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm font-light">
              <li>Arquitetura & Projetos 3D</li>
              <li>Design & Decoração de Interiores</li>
              <li>Construção & Obras Públicas</li>
              <li>Fiscalização</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 md:pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs font-light">
            &copy; {currentYear} Gelinhoo Projectart (SU), LDA. Todos os direitos
            reservados.
          </p>
          </div>
        <div class="flex items-center space-x-2 text-gray-500 hover:text-[#D4AF37] transition-all duration-300">
            <span>Desenvolvido por</span>
            <a href="https://vendaia.site" target="_blank" rel="noopener noreferrer" class="font-bold tracking-tighter hover:scale-105 transform transition">
                <span class="text-white">VENDAIA</span><span class="text-[#D4AF37]">.SITE</span>
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
