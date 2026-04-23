import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useSiteData";
import { ArrowRight } from "lucide-react";

const BlogTeaser = () => {
  const { data: posts = [] } = useBlogPosts();
  const featured = posts.slice(0, 3);

  if (featured.length === 0) return null;

  const [first, ...rest] = featured;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
              Blog
            </h4>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-slate">
              Últimas do nosso <span className="italic text-brand-gold">atelier</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-brand-slate hover:text-brand-gold transition-colors uppercase tracking-widest link-underline"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* MOBILE: BENTO GRID */}
        <div className="grid grid-cols-2 grid-rows-[180px_140px_140px] gap-3 md:hidden">
          <Card post={first} className="col-span-2 row-span-1" big />
          {rest[0] && <Card post={rest[0]} className="col-span-1 row-span-2" tall />}
          {rest[1] && <Card post={rest[1]} className="col-span-1 row-span-1" />}
          {rest[1] && <CardText post={rest[1]} className="col-span-1 row-span-1" />}
        </div>

        {/* DESKTOP: STANDARD 3-COL */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {featured.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-background border border-border rounded-sm overflow-hidden lift hover:shadow-xl"
            >
              <div className="aspect-[16/10] overflow-hidden bg-brand-gray">
                {post.cover_image_url ? (
                  <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-gold/30 font-display text-3xl">GELINHOO</div>
                )}
              </div>
              <div className="p-5 md:p-6">
                {post.category && (
                  <span className="text-[10px] text-brand-gold uppercase tracking-[0.2em] font-medium">{post.category}</span>
                )}
                <h3 className="mt-2 mb-3 font-display text-2xl text-brand-slate group-hover:text-brand-gold transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light line-clamp-3">{post.excerpt}</p>
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

type Post = ReturnType<typeof useBlogPosts>["data"] extends (infer T)[] | undefined ? T : never;

const Card = ({ post, className, big, tall }: { post: Post; className?: string; big?: boolean; tall?: boolean }) => (
  <Link to={`/blog/${post.slug}`} className={`group relative overflow-hidden rounded-sm bg-brand-gray ${className ?? ""}`}>
    {post.cover_image_url ? (
      <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-brand-gold/40 font-display text-2xl">
        GELINHOO
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
    <div className="absolute inset-0 p-3 flex flex-col justify-end">
      {post.category && (
        <span className="text-brand-gold text-[9px] uppercase tracking-[0.2em] font-medium mb-1">{post.category}</span>
      )}
      <h3 className={`font-display text-white leading-tight ${big ? "text-xl" : tall ? "text-base" : "text-sm"}`}>
        {post.title}
      </h3>
    </div>
  </Link>
);

const CardText = ({ post, className }: { post: Post; className?: string }) => (
  <Link
    to={`/blog/${post.slug}`}
    className={`group bg-brand-slate text-white rounded-sm p-3 flex flex-col justify-between ${className ?? ""}`}
  >
    {post.category && (
      <span className="text-brand-gold text-[9px] uppercase tracking-[0.2em] font-medium">{post.category}</span>
    )}
    <div>
      <p className="text-xs text-gray-300 font-light line-clamp-3 mb-2">{post.excerpt}</p>
      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-brand-gold">
        Ler artigo <ArrowRight className="w-3 h-3" />
      </span>
    </div>
  </Link>
);

export default BlogTeaser;
