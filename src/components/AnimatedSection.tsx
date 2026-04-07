import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right";
}

export function AnimatedSection({ children, className, delay = 0, animation = "fade-up", ...props }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getAnimationClasses = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return "opacity-0 translate-y-8";
        case "fade-in":
          return "opacity-0";
        case "fade-left":
          return "opacity-0 -translate-x-8";
        case "fade-right":
          return "opacity-0 translate-x-8";
        default:
          return "opacity-0 translate-y-8";
      }
    }
    return "opacity-100 translate-y-0 translate-x-0";
  };

  return (
    <div ref={ref} className={cn("transition-all duration-700 ease-out", getAnimationClasses(), className)} style={{ transitionDelay: `${delay}ms` }} {...props}>
      {children}
    </div>
  );
}
