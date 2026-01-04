import { useEffect, useRef } from "react";

interface WireframeShapeProps {
  type: "cube" | "grid";
  className?: string;
}

export const WireframeCube = ({ className = "" }: { className?: string }) => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cubeRef.current) {
        const scrollY = window.scrollY;
        const rotation = scrollY * 0.02;
        const translateY = Math.sin(scrollY * 0.002) * 20;
        cubeRef.current.style.transform = `rotateX(${rotation}deg) rotateY(${rotation * 1.5}deg) translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={cubeRef}
      className={`wireframe-cube ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div className="cube-face front"></div>
      <div className="cube-face back"></div>
      <div className="cube-face left"></div>
      <div className="cube-face right"></div>
      <div className="cube-face top"></div>
      <div className="cube-face bottom"></div>
    </div>
  );
};

export const WireframeGrid = ({ className = "" }: { className?: string }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const scrollY = window.scrollY;
        const rotation = scrollY * 0.015;
        const translateX = Math.cos(scrollY * 0.001) * 15;
        gridRef.current.style.transform = `rotateX(60deg) rotateZ(${45 + rotation}deg) translateX(${translateX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={gridRef}
      className={`wireframe-grid ${className}`}
      style={{ 
        perspective: "1000px",
        transform: "rotateX(60deg) rotateZ(45deg)"
      }}
    >
      {/* Grid lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute w-full h-px bg-brand-gold/15"
          style={{ top: `${i * 14.28}%` }}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute h-full w-px bg-brand-gold/15"
          style={{ left: `${i * 14.28}%` }}
        />
      ))}
    </div>
  );
};

export const FloatingShape = ({ type, className = "" }: WireframeShapeProps) => {
  if (type === "cube") {
    return <WireframeCube className={className} />;
  }
  return <WireframeGrid className={className} />;
};
