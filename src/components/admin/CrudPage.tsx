import { ReactNode, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type AdminTable =
  | "services"
  | "projects"
  | "clients"
  | "blog_posts"
  | "process_steps"
  | "company_values"
  | "stats"
  | "team_members";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface Props<T extends { id: string }> {
  title: string;
  description?: string;
  table: AdminTable;
  orderBy?: string;
  ascending?: boolean;
  columns: Column<T>[];
  initialValues: Partial<T>;
  renderForm: (
    form: Partial<T>,
    setForm: React.Dispatch<React.SetStateAction<Partial<T>>>
  ) => ReactNode;
  beforeSave?: (form: Partial<T>) => Partial<T>;
  validate?: (form: Partial<T>) => string | null;
}

function CrudPage<T extends { id: string }>({
  title,
  description,
  table,
  orderBy = "display_order",
  ascending = true,
  columns,
  initialValues,
  renderForm,
  beforeSave,
  validate,
}: Props<T>) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<Partial<T>>(initialValues);
  const [confirmDelete, setConfirmDelete] = useState<T | null>(null);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: [`admin_${table}`],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending });
      if (error) throw error;
      return (data ?? []) as unknown as T[];
    },
  });

  const openNew = () => {
    setEditing(null);
    setForm(initialValues);
    setOpen(true);
  };

  const openEdit = (row: T) => {
    setEditing(row);
    setForm(row);
    setOpen(true);
  };

  const save = async () => {
    const err = validate?.(form);
    if (err) return toast.error(err);
    const payload = beforeSave ? beforeSave(form) : form;
    if (editing) {
      const { error } = await supabase
        .from(table)
        .update(payload as never)
        .eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Atualizado");
    } else {
      const { error } = await supabase.from(table).insert(payload as never);
      if (error) return toast.error(error.message);
      toast.success("Criado");
    }
    setOpen(false);
    qc.invalidateQueries({ queryKey: [`admin_${table}`] });
    // Invalidate public-facing queries too
    qc.invalidateQueries();
  };

  const doDelete = async (row: T) => {
    const { error } = await supabase.from(table).delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    qc.invalidateQueries({ queryKey: [`admin_${table}`] });
    qc.invalidateQueries();
    setConfirmDelete(null);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-header font-light">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-1" /> Novo
        </Button>
      </div>

      <div className="bg-background border rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              {columns.map((c) => (
                <th key={String(c.key)} className="px-4 py-3 font-medium">
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                  A carregar…
                </td>
              </tr>
            )}
            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                  Sem registos.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-muted/30">
                {columns.map((c) => (
                  <td key={String(c.key)} className="px-4 py-3 align-middle">
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? "—")}
                  </td>
                ))}
                <td className="px-4 py-3 text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setConfirmDelete(row)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar" : "Novo registo"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">{renderForm(form, setForm)}</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={save}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar registo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação é permanente e não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmDelete && doDelete(confirmDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CrudPage;
