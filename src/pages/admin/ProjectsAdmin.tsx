import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CrudPage from "@/components/admin/CrudPage";
import MediaInput from "@/components/admin/MediaInput";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Row = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  client: string | null;
  location: string | null;
  year: number | null;
  main_image_url: string | null;
  grid_class: string | null;
  display_order: number;
  featured: boolean;
  published: boolean;
};

const CATEGORIES = [
  "arquitetura",
  "design_interiores",
  "design_exteriores",
  "construcao",
  "fiscalizacao",
  "manutencao",
  "expostands",
];

const ProjectsAdmin = () => {
  const [galleryOf, setGalleryOf] = useState<Row | null>(null);

  return (
    <>
      <CrudPage<Row>
        title="Projetos"
        description="Portfolio. Cada projeto pode ter uma galeria de imagens."
        table="projects"
        columns={[
          { key: "title", label: "Título" },
          { key: "category", label: "Categoria" },
          { key: "year", label: "Ano" },
          { key: "display_order", label: "Ordem" },
          {
            key: "published",
            label: "Publicado",
            render: (r) => (r.published ? "Sim" : "Não"),
          },
          {
            key: "id",
            label: "Galeria",
            render: (r) => (
              <Button variant="outline" size="sm" onClick={() => setGalleryOf(r)}>
                Imagens
              </Button>
            ),
          },
        ]}
        initialValues={
          { published: true, featured: false, display_order: 0, category: "arquitetura" } as Partial<Row>
        }
        validate={(f) =>
          !f.title || !f.slug || !f.category ? "Título, slug e categoria são obrigatórios" : null
        }
        renderForm={(form, setForm) => (
          <>
            <Field label="Título">
              <Input
                value={form.title ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              />
            </Field>
            <Field label="Slug">
              <Input
                value={form.slug ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              />
            </Field>
            <Field label="Categoria">
              <Select
                value={form.category ?? "arquitetura"}
                onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Cliente">
                <Input
                  value={form.client ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, client: e.target.value }))}
                />
              </Field>
              <Field label="Localização">
                <Input
                  value={form.location ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                />
              </Field>
              <Field label="Ano">
                <Input
                  type="number"
                  value={form.year ?? ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, year: e.target.value ? Number(e.target.value) : null }))
                  }
                />
              </Field>
              <Field label="Ordem">
                <Input
                  type="number"
                  value={form.display_order ?? 0}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, display_order: Number(e.target.value) }))
                  }
                />
              </Field>
            </div>
            <Field label="Descrição">
              <Textarea
                rows={4}
                value={form.description ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              />
            </Field>
            <MediaInput
              label="Imagem principal"
              folder="projects"
              value={form.main_image_url}
              onChange={(url) => setForm((p) => ({ ...p, main_image_url: url }))}
            />
            <Field label="Grid class (opcional, ex: 'md:col-span-2')">
              <Input
                value={form.grid_class ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, grid_class: e.target.value }))}
              />
            </Field>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <Switch
                  checked={form.published ?? true}
                  onCheckedChange={(v) => setForm((p) => ({ ...p, published: v }))}
                />
                Publicado
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch
                  checked={form.featured ?? false}
                  onCheckedChange={(v) => setForm((p) => ({ ...p, featured: v }))}
                />
                Destaque
              </label>
            </div>
          </>
        )}
      />

      <Dialog open={!!galleryOf} onOpenChange={(o) => !o && setGalleryOf(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Galeria — {galleryOf?.title}</DialogTitle>
          </DialogHeader>
          {galleryOf && <GalleryEditor projectId={galleryOf.id} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-sm font-medium block mb-1">{label}</label>
    {children}
  </div>
);

const GalleryEditor = ({ projectId }: { projectId: string }) => {
  const qc = useQueryClient();
  const [newUrl, setNewUrl] = useState("");
  const [caption, setCaption] = useState("");

  const { data: images = [] } = useQuery({
    queryKey: ["admin_project_images", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", projectId)
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const add = async () => {
    if (!newUrl) return toast.error("Selecione uma imagem");
    const { error } = await supabase.from("project_images").insert({
      project_id: projectId,
      image_url: newUrl,
      caption: caption || null,
      display_order: images.length,
    });
    if (error) return toast.error(error.message);
    setNewUrl("");
    setCaption("");
    qc.invalidateQueries({ queryKey: ["admin_project_images", projectId] });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("project_images").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin_project_images", projectId] });
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-sm p-4 space-y-3 bg-muted/30">
        <MediaInput
          label="Adicionar imagem"
          folder={`projects/${projectId}`}
          value={newUrl}
          onChange={setNewUrl}
        />
        <Input
          placeholder="Legenda (opcional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button onClick={add} size="sm">
          <Plus className="w-3 h-3 mr-1" /> Adicionar à galeria
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative group border rounded-sm overflow-hidden">
            <img src={img.image_url} alt="" className="w-full h-32 object-cover" />
            <button
              onClick={() => remove(img.id)}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            {img.caption && (
              <p className="text-xs p-2 bg-background border-t truncate">{img.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
