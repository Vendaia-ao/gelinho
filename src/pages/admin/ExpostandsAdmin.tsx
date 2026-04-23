import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaInput from "@/components/admin/MediaInput";
import { toast } from "sonner";

type Row = Record<string, string | null>;

const fields: { name: string; label: string; type?: "text" | "textarea" }[] = [
  { name: "hero_title", label: "Hero - Título" },
  { name: "hero_subtitle", label: "Hero - Subtítulo", type: "textarea" },
  { name: "about_text", label: "Sobre", type: "textarea" },
  { name: "services_text", label: "Texto dos serviços", type: "textarea" },
  { name: "cta_label", label: "Texto do botão CTA" },
  { name: "cta_link", label: "Link do CTA" },
];

const ExpostandsAdmin = () => {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["expostands_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("expostands_info").select("*").maybeSingle();
      return data;
    },
  });
  const [form, setForm] = useState<Row>({});

  useEffect(() => {
    if (data) setForm(data as unknown as Row);
  }, [data]);

  const save = async () => {
    if (!data?.id) {
      const { error } = await supabase.from("expostands_info").insert(form as never);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase
        .from("expostands_info")
        .update(form as never)
        .eq("id", data.id);
      if (error) return toast.error(error.message);
    }
    toast.success("Guardado");
    qc.invalidateQueries({ queryKey: ["expostands_admin"] });
    qc.invalidateQueries({ queryKey: ["expostands_info"] });
  };

  return (
    <div>
      <h1 className="text-3xl font-header font-light mb-2">Expostands</h1>
      <p className="text-muted-foreground mb-8">
        Conteúdo da página dedicada à Gelinho Expostands.
      </p>
      <div className="space-y-4 bg-background border rounded-sm p-6">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="text-sm font-medium block mb-1">{f.label}</label>
            {f.type === "textarea" ? (
              <Textarea
                rows={3}
                value={form[f.name] ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
              />
            ) : (
              <Input
                value={form[f.name] ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <MediaInput
          label="Imagem de capa"
          folder="expostands"
          value={form.cover_image_url}
          onChange={(url) => setForm((p) => ({ ...p, cover_image_url: url }))}
        />
      </div>
      <Button className="mt-4" onClick={save}>
        Guardar
      </Button>
    </div>
  );
};

export default ExpostandsAdmin;
