import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Settings,
  Wrench,
  Image,
  Users2,
  FileText,
  Boxes,
  ListOrdered,
  Heart,
  TrendingUp,
  UsersRound,
  LogOut,
  Home,
} from "lucide-react";
import logo from "@/assets/logo-gelinho.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/site", label: "Site", icon: Settings },
  { to: "/admin/services", label: "Serviços", icon: Wrench },
  { to: "/admin/projects", label: "Projetos", icon: Image },
  { to: "/admin/clients", label: "Clientes", icon: Users2 },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/expostands", label: "Expostands", icon: Boxes },
  { to: "/admin/process", label: "Processo", icon: ListOrdered },
  { to: "/admin/values", label: "Identidade", icon: Heart },
  { to: "/admin/stats", label: "Estatísticas", icon: TrendingUp },
  { to: "/admin/team", label: "Equipa", icon: UsersRound },
  { to: "/admin/users", label: "Utilizadores", icon: Users2 },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">A carregar…</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background flex-col gap-4 p-6 text-center">
        <h1 className="text-2xl font-header">Acesso restrito</h1>
        <p className="text-muted-foreground max-w-md">
          A sua conta não tem permissões de administrador. Contacte o responsável
          do sistema para receber acesso.
        </p>
        <Button variant="outline" onClick={() => signOut().then(() => navigate("/admin/login"))}>
          Terminar sessão
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      <aside className="w-64 bg-background border-r flex flex-col">
        <div className="p-4 border-b flex items-center gap-3">
          <img src={logo} alt="Gelinho" className="h-10 w-auto" />
          <div className="leading-tight">
            <p className="font-header font-medium text-sm">Backoffice</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Gelinho
            </p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary border-r-2 border-primary font-medium"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <it.icon className="w-4 h-4" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Home className="w-4 h-4 mr-2" /> Ver site
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => signOut().then(() => navigate("/admin/login"))}
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
