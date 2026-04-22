import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useSiteData";
import { ArrowRight } from "lucide-react";

const BlogTeaser = () => {
  const { data: posts = [] } = useBlogPosts();
  const featured = posts.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
              Blog
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-light text-brand-slate">
              Últimas do nosso atelier
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-brand-slate hover:text-brand-gold transition-colors uppercase tracking-widest"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-background border border-border rounded-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden bg-brand-gray">
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-gold/30 font-header text-3xl">
                    GELINHOO
                  </div>
                )}
              </div>
              <div className="p-5 md:p-6">
                {post.category && (
                  <span className="text-[10px] text-brand-gold uppercase tracking-[0.2em] font-medium">
                    {post.category}
                  </span>
                )}
                <h3 className="mt-2 mb-3 font-header font-medium text-lg text-brand-slate group-hover:text-brand-gold transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {post.author_name} ·{" "}
                  {post.published_at &&
                    new Date(post.published_at).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogTeaser;
