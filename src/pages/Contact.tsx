import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [projectType, setProjectType] = useState<"novo" | "remodelacao">("novo");
  const [formData, setFormData] = useState({
    isHouse: false,
    isCommerce: false,
    isOther: false,
    landSize: "",
    location: "",
    description: "",
    name: "",
    email: "",
    whatsapp: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", { type: projectType, ...formData });
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contacto brevemente.",
    });
    setFormData({
      isHouse: false,
      isCommerce: false,
      isOther: false,
      landSize: "",
      location: "",
      description: "",
      name: "",
      email: "",
      whatsapp: "",
    });
    setProjectType("novo");
  };

  const isFormValid =
    formData.landSize &&
    formData.location &&
    formData.description &&
    formData.name &&
    formData.email &&
    formData.whatsapp;

  return (
    <section className="min-h-screen pt-24 pb-20 relative flex flex-col lg:flex-row">
      {/* Left Image Side */}
      <div className="w-full lg:w-1/2 relative bg-gray-900 min-h-[400px] lg:min-h-full group">
        <img
          src="https://picsum.photos/id/164/800/1200"
          alt="Projeto em Destaque"
          className="object-cover w-full h-full opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 bg-brand-slate text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-4">
          Contacto
        </h4>
        <h2 className="text-3xl md:text-4xl font-header font-light mb-8">
          Pronto para Começar o{" "}
          <span className="font-medium text-brand-gold">Seu Projeto?</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Type Toggle */}
          <div className="flex gap-2 mb-6 bg-gray-800 p-1 rounded-sm">
            <button
              type="button"
              onClick={() => setProjectType("novo")}
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-medium rounded-sm transition-all ${
                projectType === "novo"
                  ? "bg-brand-gold text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Projeto Novo
            </button>
            <button
              type="button"
              onClick={() => setProjectType("remodelacao")}
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-medium rounded-sm transition-all ${
                projectType === "remodelacao"
                  ? "bg-brand-gold text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Remodelação
            </button>
          </div>

          {/* Checkboxes: Project Category */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="isHouse"
                checked={formData.isHouse}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-sm group-hover:text-brand-gold transition-colors">
                Moradia
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="isCommerce"
                checked={formData.isCommerce}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-sm group-hover:text-brand-gold transition-colors">
                Comércio
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="isOther"
                checked={formData.isOther}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-sm group-hover:text-brand-gold transition-colors">
                Outro
              </span>
            </label>
          </div>

          {/* Input: Land Size */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tamanho do Terreno (m²)*
            </label>
            <input
              type="text"
              name="landSize"
              value={formData.landSize}
              onChange={handleInputChange}
              placeholder="Ex: 500 m²"
              className="w-full bg-white text-gray-800 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder-gray-400"
              required
            />
          </div>

          {/* Input: Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Localização do Projeto*
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Ex: Talatona, Luanda"
              className="w-full bg-white text-gray-800 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder-gray-400"
              required
            />
          </div>

          {/* Input: Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Descreva Brevemente o Projeto*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Conte-nos sobre a sua visão..."
              className="w-full bg-white text-gray-800 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder-gray-400 resize-none"
              required
            />
          </div>

          {/* Input: Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Nome Completo*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-white text-gray-800 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              required
            />
          </div>

          {/* Input: Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white text-gray-800 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              required
            />
          </div>

          {/* Input: WhatsApp */}
          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp*</label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="+244 900 000 000"
              className="w-full bg-white text-gray-800 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder-gray-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className="bg-destructive hover:bg-red-700 text-white font-medium text-sm uppercase px-8 py-3 rounded-sm shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
