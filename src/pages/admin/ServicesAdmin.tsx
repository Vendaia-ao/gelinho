import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CrudPage from "@/components/admin/CrudPage";
import MediaInput from "@/components/admin/MediaInput";
import { Switch } from "@/components/ui/switch";

type Row = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  display_order: number;
  active: boolean;
};

const ServicesAdmin = () => (
  <CrudPage<Row>
    title="Serviços"
    description="Serviços apresentados na página de Serviços."
    table="services"
    columns={[
      { key: "title", label: "Título" },
      { key: "slug", label: "Slug" },
      { key: "display_order", label: "Ordem" },
      {
        key: "active",
        label: "Ativo",
        render: (r) => (r.active ? "Sim" : "Não"),
      },
    ]}
    initialValues={{ active: true, display_order: 0 } as Partial<Row>}
    validate={(f) => (!f.title || !f.slug ? "Título e slug obrigatórios" : null)}
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
        <Field label="Ícone (FontAwesome ex: fa-compass-drafting)">
          <Input
            value={form.icon ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
          />
        </Field>
        <Field label="Descrição">
          <Textarea
            rows={4}
            value={form.description ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          />
        </Field>
        <MediaInput
          label="Imagem"
          folder="services"
          value={form.image_url}
          onChange={(url) => setForm((p) => ({ ...p, image_url: url }))}
        />
        <Field label="Ordem">
          <Input
            type="number"
            value={form.display_order ?? 0}
            onChange={(e) =>
              setForm((p) => ({ ...p, display_order: Number(e.target.value) }))
            }
          />
        </Field>
        <Field label="Ativo">
          <Switch
            checked={form.active ?? true}
            onCheckedChange={(v) => setForm((p) => ({ ...p, active: v }))}
          />
        </Field>
      </>
    )}
  />
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-sm font-medium block mb-1">{label}</label>
    {children}
  </div>
);

export default ServicesAdmin;
