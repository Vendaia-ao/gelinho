import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Row = Record<string, string | null>;

const fields: { name: string; label: string; type?: "text" | "textarea" }[] = [
  { name: "tagline", label: "Tagline" },
  { name: "hero_title", label: "Hero - Título" },
  { name: "hero_subtitle", label: "Hero - Subtítulo", type: "textarea" },
  { name: "hero_cta_label", label: "Hero - Texto do botão" },
  { name: "about_short", label: "Texto curto sobre", type: "textarea" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Telefone" },
  { name: "whatsapp", label: "WhatsApp" },
  { name: "address", label: "Morada" },
  { name: "nif", label: "NIF" },
  { name: "facebook_url", label: "Facebook URL" },
  { name: "instagram_url", label: "Instagram URL" },
  { name: "linkedin_url", label: "LinkedIn URL" },
];

const SiteSettings = () => {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site_settings_admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });
  const [form, setForm] = useState<Row>({});

  useEffect(() => {
    if (data) setForm(data as unknown as Row);
  }, [data]);

  const save = async () => {
    if (!data?.id) {
      const { error } = await supabase.from("site_settings").insert(form as never);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase
        .from("site_settings")
        .update(form as never)
        .eq("id", data.id);
      if (error) return toast.error(error.message);
    }
    toast.success("Definições guardadas");
    qc.invalidateQueries({ queryKey: ["site_settings_admin"] });
    qc.invalidateQueries({ queryKey: ["site_settings"] });
  };

  return (
    <div>
      <h1 className="text-3xl font-header font-light mb-2">Definições do Site</h1>
      <p className="text-muted-foreground mb-8">Informações globais e contactos.</p>
      <div className="grid md:grid-cols-2 gap-4 bg-background border rounded-sm p-6">
        {fields.map((f) => (
          <div key={f.name} className={f.type === "textarea" ? "md:col-span-2" : ""}>
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
      </div>
      <Button className="mt-4" onClick={save}>
        Guardar alterações
      </Button>
    </div>
  );
};

export default SiteSettings;
