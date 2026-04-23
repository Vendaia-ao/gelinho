import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Image, Users2, Wrench } from "lucide-react";

const useCounts = () =>
  useQuery({
    queryKey: ["admin_counts"],
    queryFn: async () => {
      const tables = ["projects", "blog_posts", "clients", "services"] as const;
      const results = await Promise.all(
        tables.map((t) => supabase.from(t).select("*", { count: "exact", head: true }))
      );
      return {
        projects: results[0].count ?? 0,
        blog_posts: results[1].count ?? 0,
        clients: results[2].count ?? 0,
        services: results[3].count ?? 0,
      };
    },
  });

const Dashboard = () => {
  const { data } = useCounts();
  const cards = [
    { label: "Projetos", value: data?.projects ?? 0, icon: Image },
    { label: "Artigos", value: data?.blog_posts ?? 0, icon: FileText },
    { label: "Clientes", value: data?.clients ?? 0, icon: Users2 },
    { label: "Serviços", value: data?.services ?? 0, icon: Wrench },
  ];

  return (
    <div>
      <h1 className="text-3xl font-header font-light mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Bem-vindo ao backoffice da Gelinho ProjectArt.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-background rounded-sm border p-5">
            <c.icon className="w-5 h-5 text-brand-gold mb-3" />
            <p className="text-3xl font-header font-light tabular-nums">{c.value}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
              {c.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
