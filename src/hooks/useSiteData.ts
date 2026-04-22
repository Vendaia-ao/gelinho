import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useProjects = (category?: string) =>
  useQuery({
    queryKey: ["projects", category ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("display_order");
      if (category && category !== "all") query = query.eq("category", category as never);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });

export const useProjectBySlug = (slug?: string) =>
  useQuery({
    queryKey: ["project", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data: project, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      if (!project) return null;
      const { data: images } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", project.id)
        .order("display_order");
      return { ...project, images: images ?? [] };
    },
  });

export const useBlogPosts = () =>
  useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

export const useBlogPost = (slug?: string) =>
  useQuery({
    queryKey: ["blog_post", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const useClients = () =>
  useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("active", true)
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useStats = () =>
  useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .eq("active", true)
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useCompanyValues = () =>
  useQuery({
    queryKey: ["company_values"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_values")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useProcessSteps = (type: "projectart" | "expostands") =>
  useQuery({
    queryKey: ["process_steps", type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("process_steps")
        .select("*")
        .eq("process_type", type)
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useExpostandsInfo = () =>
  useQuery({
    queryKey: ["expostands_info"],
    queryFn: async () => {
      const { data, error } = await supabase.from("expostands_info").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const useTeamMembers = () =>
  useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("active", true)
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const CATEGORY_LABELS: Record<string, string> = {
  arquitetura: "Arquitetura",
  design_interiores: "Design de Interiores",
  design_exteriores: "Design de Exteriores",
  construcao: "Construção",
  fiscalizacao: "Fiscalização",
  manutencao: "Manutenção",
  expostands: "Expostands",
};
