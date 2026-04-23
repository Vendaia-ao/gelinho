import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useSiteData";

const Blog = () => {
  const { data: posts = [], isLoading } = useBlogPosts();

  return (
    <>
      {/* DARK HERO */}
      <section className="inner-hero pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 animate-fade-in-up">
            Blog
          </h4>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-[1.05] animate-fade-in-up-delay-1">
            Ideias, projetos e <span className="italic text-brand-gold">inspiração.</span>
          </h1>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-8" />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-gray bg-texture">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading && (
            <p className="text-center text-muted-foreground">A carregar artigos...</p>
          )}

          {!isLoading && posts.length === 0 && (
            <p className="text-center text-muted-foreground">Ainda não há artigos publicados.</p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-background border border-border rounded-sm overflow-hidden lift hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden bg-brand-gray">
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-gold/30 font-display text-3xl">
                      GELINHOO
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {post.category && (
                    <span className="text-[10px] text-brand-gold uppercase tracking-[0.2em] font-medium">
                      {post.category}
                    </span>
                  )}
                  <h2 className="mt-2 mb-3 font-display text-2xl text-brand-slate group-hover:text-brand-gold transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.author_name}</span>
                    <span>·</span>
                    <span>
                      {post.published_at &&
                        new Date(post.published_at).toLocaleDateString("pt-PT", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                    </span>
                    {post.reading_minutes && (
                      <>
                        <span>·</span>
                        <span>{post.reading_minutes} min</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
