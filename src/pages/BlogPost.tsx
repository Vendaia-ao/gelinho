import { Link, useParams } from "react-router-dom";
import { useBlogPost } from "@/hooks/useSiteData";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug);

  if (isLoading) {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 text-center text-muted-foreground">
          A carregar artigo...
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-header text-brand-slate mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="text-brand-gold hover:underline">
            ← Voltar ao Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="min-h-screen pt-28 md:pt-32 pb-20 bg-background">
      {post.cover_image_url && (
        <div className="w-full h-64 md:h-[420px] overflow-hidden">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 mt-10 md:mt-14">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao blog
        </Link>

        {post.category && (
          <span className="text-xs text-brand-gold uppercase tracking-[0.25em] font-medium">
            {post.category}
          </span>
        )}
        <h1 className="mt-3 mb-4 text-3xl md:text-5xl font-header font-light text-brand-slate leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>{post.author_name}</span>
          <span>·</span>
          <span>
            {post.published_at &&
              new Date(post.published_at).toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
          </span>
          {post.reading_minutes && (
            <>
              <span>·</span>
              <span>{post.reading_minutes} min de leitura</span>
            </>
          )}
        </div>

        {post.excerpt && (
          <p className="text-lg text-muted-foreground font-light italic border-l-2 border-brand-gold pl-4 mb-8">
            {post.excerpt}
          </p>
        )}

        <div className="prose prose-lg max-w-none text-brand-slate font-light leading-relaxed">
          {post.content?.split("\n").map((line, i) => {
            if (line.startsWith("## "))
              return (
                <h2
                  key={i}
                  className="text-2xl md:text-3xl font-header font-medium text-brand-slate mt-10 mb-4"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            if (line.startsWith("# "))
              return (
                <h1
                  key={i}
                  className="text-3xl font-header font-medium text-brand-slate mt-10 mb-4"
                >
                  {line.replace("# ", "")}
                </h1>
              );
            if (!line.trim()) return <br key={i} />;
            return (
              <p key={i} className="mb-5 text-base md:text-lg">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
