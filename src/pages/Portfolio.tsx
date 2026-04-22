import { useState } from "react";
import { useProjects, CATEGORY_LABELS } from "@/hooks/useSiteData";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Calendar, User, X } from "lucide-react";

const CATEGORIES = ["all", ...Object.keys(CATEGORY_LABELS)];

const Portfolio = () => {
  const [category, setCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const { data: projects = [] } = useProjects(category === "all" ? undefined : category);

  const { data: openProject } = useQuery({
    queryKey: ["project_full", openId],
    enabled: !!openId,
    queryFn: async () => {
      if (!openId) return null;
      const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("id", openId)
        .maybeSingle();
      const { data: images } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", openId)
        .order("display_order");
      return { project, images: images ?? [] };
    },
  });

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="text-center mb-10">
          <h4 className="text-brand-gold font-medium uppercase tracking-[0.3em] text-xs mb-4">
            Portfólio
          </h4>
          <h2 className="text-3xl md:text-5xl font-header font-light text-brand-slate">
            Obras de Arte Reais
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full border transition-all ${
                category === c
                  ? "bg-brand-gold text-white border-brand-gold"
                  : "bg-background text-brand-slate border-border hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {c === "all" ? "Todos" : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Ainda não há projetos nesta categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[280px]">
            {projects.map((item) => (
              <button
                key={item.id}
                onClick={() => setOpenId(item.id)}
                className={`group relative overflow-hidden cursor-pointer bg-background shadow-lg rounded-lg text-left ${
                  item.grid_class ?? ""
                }`}
              >
                {item.main_image_url ? (
                  <img
                    src={item.main_image_url}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-slate text-brand-gold/40 font-header text-2xl">
                    GELINHOO
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                    {CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                  <h3 className="text-lg md:text-2xl font-header font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  {item.location && (
                    <p className="text-gray-300 text-xs flex items-center gap-2 font-light">
                      <MapPin className="w-3 h-3 text-brand-gold" />
                      {item.location}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {openProject?.project && (
            <>
              <button
                onClick={() => setOpenId(null)}
                className="absolute right-4 top-4 z-50 bg-background/80 backdrop-blur p-2 rounded-full hover:bg-background"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-video w-full overflow-hidden bg-brand-gray">
                {openProject.project.main_image_url && (
                  <img
                    src={openProject.project.main_image_url}
                    alt={openProject.project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-6 md:p-8">
                <DialogHeader>
                  <span className="text-xs text-brand-gold uppercase tracking-[0.25em] font-medium">
                    {CATEGORY_LABELS[openProject.project.category] ?? openProject.project.category}
                  </span>
                  <DialogTitle className="text-2xl md:text-3xl font-header font-light text-brand-slate mt-2">
                    {openProject.project.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-6 text-sm">
                  {openProject.project.year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Ano</p>
                        <p className="text-brand-slate font-medium">{openProject.project.year}</p>
                      </div>
                    </div>
                  )}
                  {openProject.project.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Localização
                        </p>
                        <p className="text-brand-slate font-medium">
                          {openProject.project.location}
                        </p>
                      </div>
                    </div>
                  )}
                  {openProject.project.client && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Cliente
                        </p>
                        <p className="text-brand-slate font-medium">{openProject.project.client}</p>
                      </div>
                    </div>
                  )}
                </div>

                {openProject.project.description && (
                  <p className="text-muted-foreground font-light leading-relaxed mb-8">
                    {openProject.project.description}
                  </p>
                )}

                {openProject.images.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-4">
                      Galeria do Projeto
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {openProject.images.map((img) => (
                        <div key={img.id} className="aspect-square overflow-hidden rounded-sm">
                          <img
                            src={img.image_url}
                            alt={img.caption ?? ""}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
