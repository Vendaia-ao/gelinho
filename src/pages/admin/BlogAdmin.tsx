import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CrudPage from "@/components/admin/CrudPage";
import MediaInput from "@/components/admin/MediaInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  category: string | null;
  author_name: string | null;
  reading_minutes: number | null;
  status: "draft" | "published";
  published_at: string | null;
};

const BlogAdmin = () => (
  <CrudPage<Row>
    title="Blog"
    description="Artigos publicados no blog."
    table="blog_posts"
    orderBy="created_at"
    ascending={false}
    columns={[
      { key: "title", label: "Título" },
      { key: "category", label: "Categoria" },
      { key: "author_name", label: "Autor" },
      { key: "status", label: "Estado" },
    ]}
    initialValues={{ status: "draft", reading_minutes: 5 } as Partial<Row>}
    validate={(f) => (!f.title || !f.slug ? "Título e slug obrigatórios" : null)}
    beforeSave={(f) => {
      if (f.status === "published" && !f.published_at) {
        return { ...f, published_at: new Date().toISOString() };
      }
      return f;
    }}
    renderForm={(form, setForm) => (
      <>
        <Field label="Título">
          <Input
            value={form.title ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </Field>
        <Field label="Slug">
          <Input
            value={form.slug ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Categoria">
            <Input
              value={form.category ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            />
          </Field>
          <Field label="Autor">
            <Input
              value={form.author_name ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, author_name: e.target.value }))}
            />
          </Field>
          <Field label="Tempo de leitura (min)">
            <Input
              type="number"
              value={form.reading_minutes ?? 5}
              onChange={(e) =>
                setForm((p) => ({ ...p, reading_minutes: Number(e.target.value) }))
              }
            />
          </Field>
          <Field label="Estado">
            <Select
              value={form.status ?? "draft"}
              onValueChange={(v) => setForm((p) => ({ ...p, status: v as "draft" | "published" }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <MediaInput
          label="Imagem de capa"
          folder="blog"
          value={form.cover_image_url}
          onChange={(url) => setForm((p) => ({ ...p, cover_image_url: url }))}
        />
        <Field label="Excerto">
          <Textarea
            rows={2}
            value={form.excerpt ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
          />
        </Field>
        <Field label="Conteúdo (Markdown / HTML)">
          <Textarea
            rows={10}
            value={form.content ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
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

export default BlogAdmin;
