import { useEffect, useRef, useState } from "react";
import { useStats } from "@/hooks/useSiteData";
import { Calendar, Briefcase, Users, UserCog, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  calendar: Calendar,
  briefcase: Briefcase,
  users: Users,
  "user-cog": UserCog,
};

const Counter = ({ value, suffix }: { value: number; suffix?: string | null }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const StatsCounter = () => {
  const { data: stats = [] } = useStats();

  if (stats.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-slate text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-cubes opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <h4 className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">
            Em Números
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-light">
            A nossa marca em <span className="text-brand-gold">Angola</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => {
            const Icon = ICONS[s.icon ?? ""] ?? Briefcase;
            return (
              <div
                key={s.id}
                className="text-center p-6 md:p-8 border border-white/10 rounded-sm bg-white/5 backdrop-blur-sm hover:border-brand-gold/40 transition-colors"
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-brand-gold mx-auto mb-3 md:mb-4" />
                <div className="text-3xl md:text-5xl font-header font-light text-white mb-2">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="text-xs md:text-sm uppercase tracking-widest text-gray-300">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
