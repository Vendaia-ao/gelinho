import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Trash2, Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type Profile = {
  id: string;
  user_id: string;
  email: string | null;
  display_name: string | null;
};

type Role = "admin" | "editor";

const UsersAdmin = () => {
  const qc = useQueryClient();
  const { user: currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<Role>("editor");

  const { data: profiles = [] } = useQuery({
    queryKey: ["admin_profiles"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").order("created_at");
      return (data ?? []) as Profile[];
    },
  });

  const { data: roles = [] } = useQuery({
    queryKey: ["admin_user_roles"],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("*");
      return data ?? [];
    },
  });

  const createUser = async () => {
    if (!email || !password) return toast.error("Email e password são obrigatórios");
    // Sign up via public API; profile is auto-created by trigger.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) return toast.error(error.message);
    if (data.user) {
      const { error: rErr } = await supabase
        .from("user_roles")
        .insert({ user_id: data.user.id, role });
      if (rErr) toast.error(`Utilizador criado mas falhou atribuição de role: ${rErr.message}`);
      else toast.success("Utilizador criado");
    }
    setOpen(false);
    setEmail("");
    setPassword("");
    setDisplayName("");
    setRole("editor");
    qc.invalidateQueries({ queryKey: ["admin_profiles"] });
    qc.invalidateQueries({ queryKey: ["admin_user_roles"] });
  };

  const toggleRole = async (userId: string, target: Role) => {
    const has = roles.find((r) => r.user_id === userId && r.role === target);
    if (has) {
      const { error } = await supabase.from("user_roles").delete().eq("id", has.id);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: target });
      if (error) return toast.error(error.message);
    }
    qc.invalidateQueries({ queryKey: ["admin_user_roles"] });
  };

  const deleteProfile = async (userId: string) => {
    if (userId === currentUser?.id) return toast.error("Não pode remover-se a si mesmo");
    if (!confirm("Eliminar este utilizador (apenas perfil e roles, conta auth permanece)?"))
      return;
    await supabase.from("user_roles").delete().eq("user_id", userId);
    const { error } = await supabase.from("profiles").delete().eq("user_id", userId);
    if (error) return toast.error(error.message);
    toast.success("Perfil removido");
    qc.invalidateQueries({ queryKey: ["admin_profiles"] });
    qc.invalidateQueries({ queryKey: ["admin_user_roles"] });
  };

  const userRoles = (uid: string) =>
    roles.filter((r) => r.user_id === uid).map((r) => r.role as Role);

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-header font-light">Utilizadores</h1>
          <p className="text-muted-foreground mt-1">
            Gerir contas, papéis e acessos ao backoffice.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Novo utilizador
        </Button>
      </div>

      <div className="bg-background border rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Papéis</th>
              <th className="px-4 py-3 font-medium w-72">Ações</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => {
              const ur = userRoles(p.user_id);
              return (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.display_name ?? "—"}</td>
                  <td className="px-4 py-3">{p.email ?? "—"}</td>
                  <td className="px-4 py-3">
                    {ur.length === 0 ? (
                      <span className="text-muted-foreground text-xs">Sem papéis</span>
                    ) : (
                      ur.map((r) => (
                        <span
                          key={r}
                          className="inline-block px-2 py-0.5 mr-1 text-xs rounded bg-primary/10 text-primary"
                        >
                          {r}
                        </span>
                      ))
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRole(p.user_id, "admin")}
                    >
                      {ur.includes("admin") ? (
                        <>
                          <ShieldOff className="w-3 h-3 mr-1" /> Remover admin
                        </>
                      ) : (
                        <>
                          <Shield className="w-3 h-3 mr-1" /> Tornar admin
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRole(p.user_id, "editor")}
                    >
                      {ur.includes("editor") ? "Remover editor" : "Tornar editor"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteProfile(p.user_id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo utilizador</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium block mb-1">Nome</label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Palavra-passe</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Papel inicial</label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">
              O utilizador receberá um email de confirmação. Após confirmar, terá acesso com o
              papel definido.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={createUser}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersAdmin;
