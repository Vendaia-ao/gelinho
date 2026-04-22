import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-gelinho.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/sobre", label: "A Empresa" },
    { path: "/servicos", label: "Serviços" },
    { path: "/portfolio", label: "Portfólio" },
    { path: "/expostands", label: "Expostands" },
    { path: "/blog", label: "Blog" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-500 ease-in-out border-b border-transparent ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Larger and more visible */}
          <Link to="/" className="flex-shrink-0 cursor-pointer">
            <img
              src={logo}
              alt="Gelinho ProjectArt"
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-brand-gold relative group ${
                    isActive(item.path) ? "text-brand-gold font-bold" : ""
                  } ${
                    isScrolled && !isActive(item.path)
                      ? "text-brand-slate"
                      : !isActive(item.path)
                      ? "text-white"
                      : ""
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}

              <Link
                to="/contacto"
                className={`px-6 py-2 rounded-sm text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 border hover:bg-brand-gold hover:text-white ${
                  isScrolled
                    ? "border-brand-gold text-brand-gold"
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors hover:text-brand-gold ${
                isScrolled ? "text-brand-slate" : "text-white"
              }`}
            >
              <span className="sr-only">Abrir menu</span>
              <i className="fas fa-bars text-2xl drop-shadow-md"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl absolute w-full left-0 animate-fade-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block px-3 py-4 text-sm font-medium tracking-widest w-full border-b border-gray-100 transition-colors ${
                  isActive(item.path)
                    ? "text-brand-gold"
                    : "text-brand-slate hover:text-brand-gold"
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={closeMenu}
              className="block px-3 py-4 text-sm font-medium text-brand-gold tracking-widest"
            >
              CONTACTO
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
