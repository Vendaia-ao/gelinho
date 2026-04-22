import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: settings } = useSiteSettings();

  return (
    <footer className="bg-gray-900 border-t border-brand-gold/20 pt-10 md:pt-16 pb-6 md:pb-8 relative z-20 text-white">
      <div className="absolute inset-0 bg-cubes opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Brand & Contacts */}
          <div className="sm:col-span-2 md:col-span-2">
            <div className="text-xl md:text-2xl font-header font-medium tracking-widest text-white mb-3 md:mb-4">
              GELINHO<span className="text-brand-gold">.</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 md:mb-6 font-light">
              NIF: {settings?.nif ?? "5001115006"} <br />
              {settings?.tagline ?? "Traçamos Sonhos, Erguemos Conforto."}
            </p>

            <div className="space-y-2 mb-4 md:mb-6">
              {settings?.phone && (
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <i className="fas fa-phone text-brand-gold"></i>
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings?.whatsapp && (
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <i className="fab fa-whatsapp text-brand-gold"></i>
                  <span>{settings.whatsapp}</span>
                </div>
              )}
              {settings?.email && (
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <i className="fas fa-envelope text-brand-gold"></i>
                  <span className="break-all">{settings.email}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <a
                href={settings?.instagram_url ?? "https://www.instagram.com/gelinhooprojetart.lda"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors"
              >
                <i className="fab fa-instagram text-lg md:text-xl"></i>
              </a>
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  <i className="fab fa-facebook text-lg md:text-xl"></i>
                </a>
              )}
              {settings?.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  <i className="fab fa-linkedin text-lg md:text-xl"></i>
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-brand-gold font-medium uppercase tracking-widest text-xs mb-4 md:mb-6">
              Navegação
            </h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm font-light">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">A Empresa</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfólio</Link></li>
              <li><Link to="/expostands" className="hover:text-white transition-colors">Expostands</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-brand-gold font-medium uppercase tracking-widest text-xs mb-4 md:mb-6">
              Áreas de Atuação
            </h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm font-light">
              <li>Arquitetura</li>
              <li>Design de Interiores</li>
              <li>Design de Exteriores</li>
              <li>Construção</li>
              <li>Fiscalização</li>
              <li>Manutenção</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 md:pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs font-light">
            &copy; {currentYear} Gelinhoo Projectart (SU), LDA. Todos os direitos reservados.
          </p>
          <div className="flex flex-col items-center justify-center space-y-2 group">
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Desenvolvido por</span>
            <a
              href="https://vendaia.site"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-lg tracking-tighter transition-all duration-500"
            >
              <span className="text-brand-gold font-bold">VENDAIA</span>
            </a>
            <div className="w-0 group-hover:w-12 h-[1px] bg-brand-gold transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
