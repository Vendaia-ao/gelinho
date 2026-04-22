
-- =========================================================
-- ENUMS
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TYPE public.project_category AS ENUM (
  'arquitetura',
  'design_interiores',
  'design_exteriores',
  'construcao',
  'fiscalizacao',
  'manutencao',
  'expostands'
);

CREATE TYPE public.post_status AS ENUM ('draft', 'published');

CREATE TYPE public.process_type AS ENUM ('projectart', 'expostands');

CREATE TYPE public.value_type AS ENUM ('mission', 'vision', 'value');

CREATE TYPE public.project_image_type AS ENUM ('main', 'render', 'plan', 'gallery');

-- =========================================================
-- HELPER: updated_at trigger
-- =========================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================================================
-- PROFILES & ROLES
-- =========================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Profiles policies
CREATE POLICY "Profiles viewable by self or admin"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins update any profile"
  ON public.profiles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete profiles"
  ON public.profiles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- SITE SETTINGS (single row)
-- =========================================================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  nif TEXT,
  address TEXT,
  tagline TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_cta_label TEXT,
  about_short TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings public read"
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Site settings admin write"
  ON public.site_settings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- SERVICES
-- =========================================================
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services public read"
  ON public.services FOR SELECT USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Services admin write"
  ON public.services FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- PROJECTS (Portfolio)
-- =========================================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category project_category NOT NULL,
  client TEXT,
  location TEXT,
  year INTEGER,
  description TEXT,
  main_image_url TEXT,
  grid_class TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects public read"
  ON public.projects FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Projects admin write"
  ON public.projects FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Project images (renders, plans, gallery)
CREATE TABLE public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type project_image_type NOT NULL DEFAULT 'gallery',
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project images public read"
  ON public.project_images FOR SELECT USING (true);

CREATE POLICY "Project images admin write"
  ON public.project_images FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- BLOG POSTS
-- =========================================================
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  author_name TEXT,
  category TEXT,
  status post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  reading_minutes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts public read published"
  ON public.blog_posts FOR SELECT
  USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Blog posts admin write"
  ON public.blog_posts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- CLIENTS (logos marquee)
-- =========================================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients public read"
  ON public.clients FOR SELECT USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients admin write"
  ON public.clients FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- EXPOSTANDS INFO (single row content)
-- =========================================================
CREATE TABLE public.expostands_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT,
  hero_subtitle TEXT,
  about_text TEXT,
  services_text TEXT,
  cover_image_url TEXT,
  cta_label TEXT,
  cta_link TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.expostands_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Expostands info public read"
  ON public.expostands_info FOR SELECT USING (true);

CREATE POLICY "Expostands info admin write"
  ON public.expostands_info FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER expostands_info_updated_at
BEFORE UPDATE ON public.expostands_info
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- PROCESS STEPS (work process)
-- =========================================================
CREATE TABLE public.process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_type process_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.process_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Process steps public read"
  ON public.process_steps FOR SELECT USING (true);

CREATE POLICY "Process steps admin write"
  ON public.process_steps FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER process_steps_updated_at
BEFORE UPDATE ON public.process_steps
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- TEAM MEMBERS
-- =========================================================
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team public read"
  ON public.team_members FOR SELECT USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Team admin write"
  ON public.team_members FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- STATS (counters home)
-- =========================================================
CREATE TABLE public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  suffix TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stats public read"
  ON public.stats FOR SELECT USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Stats admin write"
  ON public.stats FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER stats_updated_at
BEFORE UPDATE ON public.stats
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- COMPANY VALUES (mission, vision, values)
-- =========================================================
CREATE TABLE public.company_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value_type value_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.company_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company values public read"
  ON public.company_values FOR SELECT USING (true);

CREATE POLICY "Company values admin write"
  ON public.company_values FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER company_values_updated_at
BEFORE UPDATE ON public.company_values
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- STORAGE BUCKET: media
-- =========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Media public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

CREATE POLICY "Media admin upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Media admin update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Media admin delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- SEED DATA
-- =========================================================

-- Site settings
INSERT INTO public.site_settings (phone, whatsapp, email, nif, address, tagline, hero_title, hero_subtitle, hero_cta_label, about_short)
VALUES (
  '+244 924 703 307',
  '+244 934 566 545',
  'geral@gelinhoo.ao',
  '5001115006',
  'Luanda, Angola',
  'Traçamos Sonhos, Erguemos Conforto.',
  'Arquitetura que Eleva o Conforto',
  'Da concepção à entrega, criamos espaços que traduzem a sua identidade com excelência e detalhe.',
  'Iniciar Projeto',
  'A Gelinhoo Projectart é um estúdio multidisciplinar de arquitetura, design e construção em Angola.'
);

-- Services
INSERT INTO public.services (slug, title, description, icon, display_order) VALUES
  ('arquitetura', 'Arquitetura', 'Conceção arquitetónica de espaços únicos, do conceito à execução.', 'building-2', 1),
  ('design-interiores', 'Design de Interiores', 'Ambientes interiores funcionais e elegantes que refletem a sua identidade.', 'sofa', 2),
  ('design-exteriores', 'Design de Exteriores', 'Paisagismo e fachadas que valorizam cada projeto.', 'trees', 3),
  ('construcao', 'Construção', 'Execução de obras com qualidade, prazo e rigor técnico.', 'hard-hat', 4),
  ('fiscalizacao', 'Fiscalização', 'Acompanhamento técnico para garantir excelência e conformidade.', 'clipboard-check', 5),
  ('manutencao', 'Manutenção', 'Cuidado contínuo para preservar o valor e a beleza do seu espaço.', 'wrench', 6);

-- Stats
INSERT INTO public.stats (label, value, suffix, icon, display_order) VALUES
  ('Anos no Mercado', 3, '+', 'calendar', 1),
  ('Projetos Concluídos', 50, '+', 'briefcase', 2),
  ('Clientes Satisfeitos', 20, '+', 'users', 3),
  ('Profissionais', 15, '+', 'user-cog', 4);

-- Company values
INSERT INTO public.company_values (value_type, title, description, icon, display_order) VALUES
  ('mission', 'Missão', 'Traçar sonhos e erguer conforto, entregando soluções de arquitetura, design e construção que elevam a vida das pessoas e o valor dos espaços em Angola.', 'target', 1),
  ('vision', 'Visão', 'Ser a referência angolana em arquitetura e design integrado, reconhecida pela excelência criativa, ética e compromisso com cada cliente.', 'eye', 2),
  ('value', 'Excelência', 'Detalhe rigoroso em cada projeto, do esboço à entrega.', 'award', 3),
  ('value', 'Integridade', 'Transparência total em prazos, custos e processos.', 'shield-check', 4),
  ('value', 'Criatividade', 'Soluções únicas que traduzem a identidade de cada cliente.', 'sparkles', 5),
  ('value', 'Compromisso', 'Acompanhamento próximo do início ao fim de cada obra.', 'handshake', 6);

-- Process steps - Projectart
INSERT INTO public.process_steps (process_type, title, description, icon, display_order) VALUES
  ('projectart', 'Deslocação ao Local', 'Visitamos o local do projeto (com taxa de deslocação) para compreender o contexto.', 'map-pin', 1),
  ('projectart', 'Consultoria Inicial', 'Pequena consultoria sobre o projeto para alinhar visão, escopo e necessidades.', 'message-square', 2),
  ('projectart', 'Envio da Proposta', 'Apresentamos uma proposta detalhada com escopo, prazos e valores.', 'file-text', 3),
  ('projectart', 'Pagamento de 30%', 'Após aprovação, é feito um adiantamento de 30% para iniciar o trabalho.', 'credit-card', 4),
  ('projectart', 'Execução do Projeto', 'Desenvolvimento completo do projeto com acompanhamento próximo.', 'pen-tool', 5),
  ('projectart', 'Entrega e Pagamento Final', 'Entrega do projeto e liquidação dos restantes 70%.', 'check-circle', 6),
  ('projectart', 'Construção (opcional)', 'Caso pretenda avançar para a construção connosco, é negociada à parte.', 'building', 7);

-- Process steps - Expostands
INSERT INTO public.process_steps (process_type, title, description, icon, display_order) VALUES
  ('expostands', 'Contacto Inicial', 'Reunimos com o cliente para perceber o conceito do evento e necessidades.', 'phone', 1),
  ('expostands', 'Envio do Protótipo', 'Apresentamos um protótipo 3D da stand para aprovação.', 'box', 2),
  ('expostands', 'Pagamento 100%', 'Após aprovação do protótipo, é efetuado o pagamento total.', 'credit-card', 3),
  ('expostands', 'Montagem no Evento', 'Montamos a stand no local e dia do evento.', 'hammer', 4),
  ('expostands', 'Apoio Durante o Evento', 'Acompanhamento técnico durante toda a duração do evento.', 'life-buoy', 5),
  ('expostands', 'Desmontagem', 'Desmontagem rápida e organizada após o encerramento.', 'package', 6);

-- Expostands info
INSERT INTO public.expostands_info (hero_title, hero_subtitle, about_text, services_text, cta_label, cta_link)
VALUES (
  'Gelinho Expostands',
  'Stands e Material Corporativo para Eventos de Excelência',
  'A Gelinho Expostands é a unidade do grupo Gelinhoo dedicada à criação de stands e material corporativo para feiras, conferências e eventos. Combinamos design impactante com execução impecável para destacar a sua marca.',
  'Construção e montagem de stands personalizados, apoio técnico durante o evento e desmontagem completa. Material corporativo, sinalética e mobiliário para eventos.',
  'Pedir Orçamento',
  '/contacto'
);

-- Clients (logos will be added via storage by admin; placeholders true)
INSERT INTO public.clients (name, display_order) VALUES
  ('Banco BIC', 1),
  ('ENDIAMA', 2),
  ('Ministério das Finanças', 3),
  ('Apolonia Complexus', 4),
  ('INSS', 5),
  ('Angola Telecom', 6),
  ('Cegid', 7),
  ('Nuno Baio', 8),
  ('BE NATURAL', 9),
  ('THE ONE', 10);

-- Projects (current portfolio)
INSERT INTO public.projects (slug, title, category, location, year, main_image_url, grid_class, display_order, featured, description)
VALUES
  ('moradia-moderna', 'Moradia Moderna', 'arquitetura', 'Luanda, Angola', 2024, '/portfolio/bento-1.jpeg', 'md:col-span-2 md:row-span-2', 1, true, 'Projeto residencial contemporâneo com integração paisagística.'),
  ('salao-beleza-premium', 'Salão de Beleza Premium', 'design_interiores', 'Luanda, Angola', 2024, '/portfolio/bento-2.jpeg', 'md:col-span-1 md:row-span-1', 2, false, 'Espaço comercial elegante focado em experiência premium.'),
  ('estacoes-estetica', 'Estações de Estética', 'design_interiores', 'Benfica, Luanda', 2024, '/portfolio/bento-3.jpeg', 'md:col-span-1 md:row-span-1', 3, false, 'Conceção e execução de estações modulares de estética.'),
  ('escadaria-marmore', 'Escadaria em Mármore', 'construcao', 'Talatona, Luanda', 2023, '/portfolio/bento-4.jpeg', 'md:col-span-1 md:row-span-2', 4, false, 'Execução de escadaria interior em mármore com detalhe artesanal.'),
  ('lobby-contemporaneo', 'Lobby Contemporâneo', 'design_interiores', 'Luanda Sul, Angola', 2024, '/portfolio/bento-5.jpeg', 'md:col-span-2 md:row-span-1', 5, false, 'Lobby corporativo com linguagem contemporânea e materiais nobres.');

-- Sample blog posts
INSERT INTO public.blog_posts (slug, title, excerpt, content, author_name, category, status, published_at, reading_minutes)
VALUES
  ('tendencias-arquitetura-angola-2025',
   'Tendências de Arquitetura em Angola para 2025',
   'Conheça as principais tendências que estão a moldar a arquitetura residencial e comercial em Angola este ano.',
   E'A arquitetura em Angola tem evoluído de forma notável nos últimos anos, integrando influências locais com tendências globais.\n\n## Sustentabilidade em Primeiro Lugar\n\nMateriais locais, ventilação natural e aproveitamento solar são prioridades crescentes nos novos projetos.\n\n## Espaços Multifuncionais\n\nA flexibilidade dos espaços tornou-se essencial, especialmente em ambientes urbanos onde o m² é precioso.\n\n## Conexão com o Exterior\n\nVarandas amplas, pátios internos e jardins integrados ganham destaque nos novos projetos residenciais.',
   'Equipa Gelinhoo', 'Arquitetura', 'published', now() - interval '5 days', 4),
  ('como-escolher-bom-arquiteto',
   'Como Escolher um Bom Arquiteto para o Seu Projeto',
   'Um guia prático com os critérios mais importantes para escolher o profissional certo para o seu projeto.',
   E'Escolher o arquiteto certo é uma das decisões mais importantes do seu projeto.\n\n## Verifique o Portfólio\n\nObserve a coerência estética e a diversidade de projetos realizados.\n\n## Avalie a Comunicação\n\nUm bom arquiteto sabe ouvir e traduzir as suas ideias em soluções viáveis.\n\n## Confirme as Referências\n\nFale com clientes anteriores para entender a experiência completa.',
   'Equipa Gelinhoo', 'Dicas', 'published', now() - interval '12 days', 5),
  ('beneficios-design-interiores',
   'Os Benefícios de Investir em Design de Interiores',
   'O design de interiores vai muito além da estética — descubra como pode transformar a sua qualidade de vida.',
   E'Investir em design de interiores traz retornos visíveis em conforto, funcionalidade e valor patrimonial.\n\n## Otimização do Espaço\n\nUm bom designer aproveita cada centímetro do seu imóvel de forma inteligente.\n\n## Personalização\n\nO espaço passa a refletir a sua identidade, gostos e necessidades específicas.\n\n## Valorização do Imóvel\n\nImóveis com design profissional valorizam significativamente no mercado.',
   'Equipa Gelinhoo', 'Design', 'published', now() - interval '20 days', 3);
