import { useState, useEffect, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?:
    | "div"
    | "section"
    | "li"
    | "article"
    | "header"
    | "footer"
    | "h1"
    | "h2"
    | "h3"
    | "p"
    | "span";
  eager?: boolean;
  style?: CSSProperties;
}

// Single shared IntersectionObserver instance to run animations at 60 FPS
let globalObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, () => void>();

function getGlobalObserver() {
  if (typeof window === "undefined") return null;
  if (!globalObserver) {
    globalObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const callback = observerCallbacks.get(entry.target);
            if (callback) callback();
          }
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 200px 0px" },
    );
  }
  return globalObserver;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  eager = false,
  style,
}: RevealProps) {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024);
    }
  }, []);

  useEffect(() => {
    if (eager) return;

    const el = ref.current;
    if (!el) return;

    const observer = getGlobalObserver();
    if (!observer) {
      setVisible(true);
      return;
    }

    const onIntersect = () => {
      setVisible(true);
      observer.unobserve(el);
      observerCallbacks.delete(el);
    };

    observerCallbacks.set(el, onIntersect);
    observer.observe(el);

    return () => {
      if (el) {
        observer.unobserve(el);
        observerCallbacks.delete(el);
      }
    };
  }, [eager]);

  const activeDelay = isMobile ? Math.round(delay * 0.4) : delay;

  if (eager) {
    const eagerStyle: CSSProperties = {
      ...style,
      ...(activeDelay ? { animationDelay: `${activeDelay}ms` } : {}),
    };
    return (
      <Tag className={`animate-fade-in-up ${className}`} style={eagerStyle}>
        {children}
      </Tag>
    );
  }

  const revealStyle: CSSProperties = {
    ...style,
    ...(activeDelay ? { transitionDelay: `${activeDelay}ms` } : {}),
  };
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={revealStyle}
    >
      {children}
    </Tag>
  );
}
