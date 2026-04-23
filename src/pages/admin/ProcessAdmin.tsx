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
  process_type: "projectart" | "expostands";
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number;
};

const ProcessAdmin = () => (
  <CrudPage<Row>
    title="Etapas de Processo"
    description="Etapas dos processos Projectart e Expostands."
    table="process_steps"
    columns={[
      { key: "title", label: "Título" },
      { key: "process_type", label: "Tipo" },
      { key: "display_order", label: "Ordem" },
    ]}
    initialValues={{ process_type: "projectart", display_order: 0 } as Partial<Row>}
    validate={(f) => (!f.title ? "Título obrigatório" : null)}
    renderForm={(form, setForm) => (
      <>
        <Field label="Tipo">
          <Select
            value={form.process_type ?? "projectart"}
            onValueChange={(v) =>
              setForm((p) => ({ ...p, process_type: v as "projectart" | "expostands" }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="projectart">Projectart</SelectItem>
              <SelectItem value="expostands">Expostands</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Título">
          <Input
            value={form.title ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </Field>
        <Field label="Ícone (lucide kebab-case, ex: 'pencil-ruler')">
          <Input
            value={form.icon ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
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

export default ProcessAdmin;
