import { Input } from "@/components/ui/input";
import CrudPage from "@/components/admin/CrudPage";
import { Switch } from "@/components/ui/switch";

type Row = {
  id: string;
  label: string;
  value: number;
  suffix: string | null;
  icon: string | null;
  display_order: number;
  active: boolean;
};

const StatsAdmin = () => (
  <CrudPage<Row>
    title="Estatísticas"
    description="Contadores apresentados na home page."
    table="stats"
    columns={[
      { key: "label", label: "Etiqueta" },
      { key: "value", label: "Valor" },
      { key: "suffix", label: "Sufixo" },
      { key: "active", label: "Ativo", render: (r) => (r.active ? "Sim" : "Não") },
    ]}
    initialValues={{ active: true, display_order: 0, value: 0 } as Partial<Row>}
    validate={(f) => (!f.label ? "Etiqueta obrigatória" : null)}
    renderForm={(form, setForm) => (
      <>
        <Field label="Etiqueta">
          <Input
            value={form.label ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Valor">
            <Input
              type="number"
              value={form.value ?? 0}
              onChange={(e) => setForm((p) => ({ ...p, value: Number(e.target.value) }))}
            />
          </Field>
          <Field label="Sufixo (ex: +)">
            <Input
              value={form.suffix ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, suffix: e.target.value }))}
            />
          </Field>
        </div>
        <Field label="Ícone (calendar, briefcase, users, user-cog)">
          <Input
            value={form.icon ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
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

export default StatsAdmin;
