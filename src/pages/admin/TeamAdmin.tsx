import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CrudPage from "@/components/admin/CrudPage";
import MediaInput from "@/components/admin/MediaInput";
import { Switch } from "@/components/ui/switch";

type Row = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  photo_url: string | null;
  instagram_url: string | null;
  display_order: number;
  active: boolean;
};

const TeamAdmin = () => (
  <CrudPage<Row>
    title="Equipa"
    description="Membros da equipa apresentados na página A Empresa."
    table="team_members"
    columns={[
      { key: "name", label: "Nome" },
      { key: "role", label: "Cargo" },
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
        <Field label="Cargo">
          <Input
            value={form.role ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
          />
        </Field>
        <Field label="Bio">
          <Textarea
            rows={3}
            value={form.bio ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
          />
        </Field>
        <Field label="Instagram (opcional)">
          <Input
            placeholder="https://instagram.com/perfil"
            value={form.instagram_url ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, instagram_url: e.target.value }))}
          />
        </Field>
        <MediaInput
          label="Fotografia"
          folder="team"
          accept="image/*"
          value={form.photo_url}
          onChange={(url) => setForm((p) => ({ ...p, photo_url: url }))}
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

export default TeamAdmin;
