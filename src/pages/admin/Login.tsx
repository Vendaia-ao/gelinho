import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/logo-gelinho.png";

const Login = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, navigate]);

  if (loading) return null;
  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) {
      toast.error(error.message ?? "Falha no login");
    } else {
      toast.success("Sessão iniciada");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-slate p-4">
      <div className="w-full max-w-md bg-background rounded-sm shadow-2xl p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="Gelinho" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-header font-light text-brand-slate">Backoffice</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold mt-2">
            Área Reservada
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <Input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Palavra-passe</label>
            <Input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "A entrar..." : "Entrar"}
          </Button>
        </form>
        {user && !isAdmin && (
          <p className="text-xs text-destructive mt-4 text-center">
            Sessão iniciada mas sem permissões de admin.
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
