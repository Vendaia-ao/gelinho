import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-brand-gold/20 pt-16 pb-8 relative z-20 text-white">
      {/* Gold Texture Overlay */}
      <div className="absolute inset-0 bg-cubes opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Contacts */}
          <div>
            <div className="text-2xl font-header font-medium tracking-widest text-white mb-4">
              GELINHO<span className="text-brand-gold">.</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
              NIF: 5001115006 <br />
              Traçamos Sonhos, Erguemos Conforto.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <i className="fas fa-phone text-brand-gold"></i>
                <span>(+244) 934 566 545</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <i className="fas fa-envelope text-brand-gold"></i>
                <span>gelinhoo.projectart@gmail.com</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-brand-gold transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-gold transition-colors"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-gold transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-brand-gold font-medium uppercase tracking-widest text-xs mb-6">
              Navegação
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm font-light">
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
          <div>
            <h4 className="text-brand-gold font-medium uppercase tracking-widest text-xs mb-6">
              Áreas de Atuação
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm font-light">
              <li>Arquitetura & Projetos 3D</li>
              <li>Design & Decoração de Interiores</li>
              <li>Construção & Obras Públicas</li>
              <li>Fiscalização</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs font-light">
            &copy; {currentYear} Gelinhoo Projectart (SU), LDA. Todos os direitos
            reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0 font-light hidden md:block">
            Website Premium por Gelinhoo Tech.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
