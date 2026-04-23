import { Input } from "@/components/ui/input";
import CrudPage from "@/components/admin/CrudPage";
import MediaInput from "@/components/admin/MediaInput";
import { Switch } from "@/components/ui/switch";

type Row = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
  active: boolean;
};

const ClientsAdmin = () => (
  <CrudPage<Row>
    title="Clientes"
    description="Logos das empresas que confiam em nós."
    table="clients"
    columns={[
      {
        key: "logo_url",
        label: "Logo",
        render: (r) =>
          r.logo_url ? (
            <img src={r.logo_url} alt={r.name} className="h-8 w-auto object-contain" />
          ) : (
            "—"
          ),
      },
      { key: "name", label: "Nome" },
      { key: "display_order", label: "Ordem" },
      { key: "active", label: "Ativo", render: (r) => (r.active ? "Sim" : "Não") },
    ]}
    initialValues={{ active: true, display_order: 0 } as Partial<Row>}
    validate={(f) => (!f.name ? "Nome obrigatório" : null)}
    renderForm={(form, setForm) => (
      <>
        <Field label="Nome">
          <Input
            value={form.name ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </Field>
        <MediaInput
          label="Logo"
          folder="clients"
          accept="image/*"
          value={form.logo_url}
          onChange={(url) => setForm((p) => ({ ...p, logo_url: url }))}
        />
        <Field label="Website">
          <Input
            type="url"
            value={form.website_url ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, website_url: e.target.value }))}
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

export default ClientsAdmin;
