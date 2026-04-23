import bicLogo from "@/assets/clients/banco-bic.png";
import endiamaLogo from "@/assets/clients/endiama.png";
import minfinLogo from "@/assets/clients/minfin.png";
import apoloniaLogo from "@/assets/clients/apolonia.png";
import inssLogo from "@/assets/clients/inss.png";
import angolaTelecomLogo from "@/assets/clients/angola-telecom.png";
import cegidLogo from "@/assets/clients/cegid.png";

// Map seeded client names to their bundled logo assets so the seed data
// looks great immediately even before admins upload custom logos.
const LOGO_MAP: Record<string, string> = {
  "Banco BIC": bicLogo,
  ENDIAMA: endiamaLogo,
  "Ministério das Finanças": minfinLogo,
  "Apolonia Complexus": apoloniaLogo,
  INSS: inssLogo,
  "Angola Telecom": angolaTelecomLogo,
  Cegid: cegidLogo,
};

interface ClientLogoProps {
  name: string;
  logoUrl?: string | null;
}

const ClientLogo = ({ name, logoUrl }: ClientLogoProps) => {
  const resolved = logoUrl || LOGO_MAP[name];

  if (resolved) {
    return (
      <img
        src={resolved}
        alt={name}
        className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
        loading="lazy"
      />
    );
  }

  // Elegant typographic placeholder
  return (
    <div className="flex items-center justify-center px-6 py-4 min-w-[140px]">
      <span className="font-header text-base md:text-lg font-medium text-brand-slate/70 tracking-[0.2em] uppercase whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

export default ClientLogo;
