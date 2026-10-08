import { useEffect, useState } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCTABar } from "@/components/StickyCTABar";
import { PageTransition, FrozenRoute } from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";
import Lenis from "lenis";
import { SITE_URL, jsonLd, personSchema, organizationSchema } from "@/lib/seo";
import { applyElevenLabsTheme, applyElevenLabsLayout } from "@/lib/elevenLabsTheme";
import { enhanceElevenLabsAnimations, updateElevenLabsOrbTheme } from "@/lib/elevenLabsAnimations";
import { setupElevenLabsCollapse } from "@/lib/elevenLabsCollapse";

import appCss from "../styles.css?url";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "agent-id": string;
      };
    }
  }
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 text-7xl font-extrabold tracking-tighter">
          <span className="text-gradient-brand">404</span>
        </h1>
        <p className="mt-4 text-sm text-ink-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white animate-gradient"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#071123" },
      { name: "format-detection", content: "telephone=no" },
      { httpEquiv: "x-ua-compatible", content: "IE=edge" },

      // Geo / locale signals (helpful for India-focused queries)
      { name: "geo.region", content: "IN-DL" },
      { name: "geo.placename", content: "Delhi" },
      { name: "language", content: "English" },

      // Sensible site-wide defaults - every leaf route overrides title/description
      { title: "Ambesh Tiwari - AI Trainer for Corporate Teams & Founders" },
      {
        name: "description",
        content:
          "Ambesh Tiwari is one of India's leading AI trainers. He has trained 5,000+ professionals across 50+ organisations in 11 industries.",
      },
      {
        property: "og:title",
        content: "Ambesh Tiwari - AI Trainer for Corporate Teams & Founders",
      },
      {
        name: "twitter:title",
        content: "Ambesh Tiwari - AI Trainer for Corporate Teams & Founders",
      },
      {
        name: "description",
        content:
          "Ambesh helps companies turn confused, overloaded teams into confident, AI-ready professionals using practical Agentic AI systems they can apply from day one.",
      },
      {
        property: "og:description",
        content:
          "Ambesh helps companies turn confused, overloaded teams into confident, AI-ready professionals using practical Agentic AI systems they can apply from day one.",
      },
      {
        name: "twitter:description",
        content:
          "Ambesh helps companies turn confused, overloaded teams into confident, AI-ready professionals using practical Agentic AI systems they can apply from day one.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/zfDSuVYBGngYqKphABVIppoL25e2/social-images/social-1776622875929-Ambesh__AI_Portfolio_2024_(1080_x_1080_px).webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/zfDSuVYBGngYqKphABVIppoL25e2/social-images/social-1776622875929-Ambesh__AI_Portfolio_2024_(1080_x_1080_px).webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      // Preconnect to Google Fonts to eliminate DNS + TCP + TLS round-trips before fonts load
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Load the two custom fonts the design system uses
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,600;0,700;0,800;0,900;1,500&family=Inter:wght@400;500;600&family=Fraunces:ital,wght@1,500&display=swap",
      },
      // Preload the hero image so the browser fetches it immediately (improves LCP)
      { rel: "preload", href: "/ambesh-tiwari.jpg", as: "image", fetchPriority: "high" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-512.png", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "alternate", hrefLang: "en", href: SITE_URL },
      { rel: "alternate", hrefLang: "x-default", href: SITE_URL },
    ],
    scripts: [jsonLd(personSchema), jsonLd(organizationSchema)],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ambesh-theme");if(t==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
        <script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          async
          type="text/javascript"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const routeOrder = ["/", "/about", "/work", "/training", "/book", "/podcast", "/insights"];

function RootComponent() {
  useReveal();
  const location = useLocation();
  const [displayPath, setDisplayPath] = useState(location.pathname);
  const [transitionState, setTransitionState] = useState<"idle" | "closing" | "opening">("idle");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const getPageTitle = (path: string) => {
    if (path === "/" || !path) return "Home";
    const segment = path.split("/").filter(Boolean)[0];
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  useEffect(() => {
    if (location.pathname !== displayPath) {
      const oldIndex = routeOrder.indexOf(displayPath);
      const newIndex = routeOrder.indexOf(location.pathname);

      if (newIndex !== -1 && oldIndex !== -1) {
        setDirection(newIndex > oldIndex ? "forward" : "backward");
      } else {
        setDirection("forward");
      }

      setTransitionState("closing");
      
      const timer = setTimeout(() => {
        setDisplayPath(location.pathname);
        setTransitionState("opening");
        
        const openTimer = setTimeout(() => {
          setTransitionState("idle");
        }, 750);
        return () => clearTimeout(openTimer);
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, displayPath]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const apply = () => {
      const host = document.querySelector("elevenlabs-convai");
      if (!host) return;
      applyElevenLabsTheme(host);
      applyElevenLabsLayout(host);
      if (host.shadowRoot) {
        enhanceElevenLabsAnimations(host);
        // Update orb filter to match current light/dark theme every time
        // the dark class changes (setAttribute alone is ignored after mount).
        updateElevenLabsOrbTheme(host);
      }
    };

    apply();
    if (customElements.get("elevenlabs-convai")) {
      apply();
    } else {
      customElements
        .whenDefined("elevenlabs-convai")
        .then(apply)
        .catch(() => {});
    }

    const layoutQuery = window.matchMedia("(min-width: 1024px)");
    let collapseCleanup: (() => void) | null = null;
    const syncCollapse = () => {
      collapseCleanup?.();
      collapseCleanup = null;
      const host = document.querySelector("elevenlabs-convai");
      if (!host) return;
      if (window.matchMedia("(max-width: 1023px)").matches) {
        collapseCleanup = setupElevenLabsCollapse(host);
      } else {
        host.classList.remove("ambesh-minimized");
      }
    };
    syncCollapse();

    const onLayoutChange = () => {
      const host = document.querySelector("elevenlabs-convai");
      if (host) applyElevenLabsLayout(host);
      syncCollapse();
    };
    layoutQuery.addEventListener("change", onLayoutChange);

    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      layoutQuery.removeEventListener("change", onLayoutChange);
      collapseCleanup?.();
    };
  }, []);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    // Disable Lenis on mobile/touch devices for native, lag-free scrolling
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 1023px)").matches;
    if (isMobileDevice) return;

    const lenis = new Lenis({
      duration: 0.9, // Snappier duration to reduce sluggishness/lag feeling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15, // Snppier wheel responsiveness
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="admin-root min-h-screen bg-[#050d1a] text-white">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="app-shell relative flex min-h-screen flex-col bg-canvas text-ink">
      <AnimatePresence>
        {transitionState !== "idle" && (
          <PageTransition 
            key="curtain" 
            state={transitionState === "closing" ? "closing" : "opening"} 
            title={getPageTitle(location.pathname)} 
            direction={direction}
          />
        )}
      </AnimatePresence>
      <div
        className="home-top-grey pointer-events-none absolute top-0 left-0 right-0 z-40 h-16 md:h-20 xl:h-24"
        aria-hidden
      />
      <SiteHeader />
      <main className="flex-1 pt-16 md:pt-20 xl:pt-24">
        <FrozenRoute freeze={transitionState === "closing"}>
          <Outlet />
        </FrozenRoute>
      </main>
      <SiteFooter />
      <StickyCTABar />
      <elevenlabs-convai agent-id="agent_4201m0b292dtf5gvpf96ceb6ztkf"></elevenlabs-convai>
    </div>
  );
}
