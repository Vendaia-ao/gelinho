import { useSiteSettings } from "@/hooks/useSiteData";

const WhatsAppButton = () => {
  const { data: settings } = useSiteSettings();
  const number = (settings?.whatsapp ?? "+244934566545").replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-white"
    >
      <i className="fab fa-whatsapp text-3xl"></i>
    </a>
  );
};

export default WhatsAppButton;
