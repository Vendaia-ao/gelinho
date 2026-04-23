import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CrudPage from "@/components/admin/CrudPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Row = {
  id: string;
  value_type: "mission" | "vision" | "value";
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number;
};

const ValuesAdmin = () => (
  <CrudPage<Row>
    title="Identidade (Missão, Visão, Valores)"
    description="Conteúdo da secção de identidade na página A Empresa."
    table="company_values"
    columns={[
      { key: "title", label: "Título" },
      { key: "value_type", label: "Tipo" },
      { key: "display_order", label: "Ordem" },
    ]}
    initialValues={{ value_type: "value", display_order: 0 } as Partial<Row>}
    validate={(f) => (!f.title ? "Título obrigatório" : null)}
    renderForm={(form, setForm) => (
      <>
        <Field label="Tipo">
          <Select
            value={form.value_type ?? "value"}
            onValueChange={(v) =>
              setForm((p) => ({ ...p, value_type: v as Row["value_type"] }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mission">Missão</SelectItem>
              <SelectItem value="vision">Visão</SelectItem>
              <SelectItem value="value">Valor</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Título">
          <Input
            value={form.title ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </Field>
        <Field label="Descrição">
          <Textarea
            rows={3}
            value={form.description ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
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

export default ValuesAdmin;
