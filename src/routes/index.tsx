import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Workflow,
  Compass,
  BookOpen,
  Sparkles,
  Wrench,
  AlertCircle,
  Briefcase,
  FolderOpen,
  User,
  Users,
  Rocket,
  Building2,
  Star,
  Check,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TypeLine } from "@/components/TypeLine";
import { CorePillars } from "@/components/CorePillars";
import { StrategyCallButton } from "@/components/StrategyCallButton";
import { Marquee } from "@/components/Marquee";
import { ServiceCarousel } from "@/components/ServiceCarousel";
import { BookStickySection } from "@/components/BookStickySection";
import { buildMeta, jsonLd, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { ParticleField } from "@/components/ParticleField";
import { RichHeading } from "@/components/RichHeading";
import { usePageContent } from "@/hooks/use-page-content";
import { EXACT_DEFAULT_HOME_CONTENT } from "./admin/pages/home";

export const Route = createFileRoute("/")({
  head: () => {
    const m = buildMeta({
      path: "/",
      title: "Ambesh Tiwari | Business Operating Systems Consultant and AI Trainer",
      description:
        "Ambesh Tiwari helps founder-led businesses build SOPs, workflows, reporting systems and AI-enabled execution. Consulting and training led by Ambesh, with implementation from BDA Technologies.",
      keywords:
        "Business Systems Consultant, Business Operating System, SOPs and workflows, founder dependency, corporate AI training, Ambesh Tiwari, BDA Technologies",
    });
    return {
      ...m,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Ambesh Tiwari",
          url: SITE_URL,
          inLanguage: "en-IN",
        }),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Ambesh Tiwari - Business Systems Consulting and AI Training",
          url: SITE_URL,
          areaServed: ["India", "United Arab Emirates", "Tanzania", "Africa"],
          serviceType: [
            "Business Operating Systems consulting",
            "SOPs and workflow design",
            "Corporate AI training",
          ],
          provider: { "@type": "Person", name: "Ambesh Tiwari" },
        }),
        jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }])),
      ],
    };
  },
  component: HomePage,
});

const heroStats = [
  { v: "5,000+", l: "Professionals trained", icon: Users },
  { v: "150+", l: "Sessions and engagements", icon: Rocket },
  { v: "11+", l: "Industries delivered in", icon: Building2 },
  { v: "9.5/10", l: "Average session rating", icon: Star },
];

const proofLogos = [
  { name: "Forbes India", src: "/logos/forbes-india.svg", className: "h-5 sm:h-8" },
  { name: "Mid-day", src: "/logos/mid-day.png", className: "h-5 sm:h-8" },
  { name: "Disrupt", src: "/logos/disrupt.png", className: "h-10 sm:h-14" },
  { name: "Navbharat Times", src: "/logos/navbharat-times.png", className: "h-5 sm:h-8" },
  { name: "Dailyhunt", src: "/logos/dailyhunt-full.png", className: "h-8 sm:h-16" },
  { name: "Thrive Global", src: "/logos/thrive-global.svg", className: "h-4 sm:h-6" },
  { name: "NewsTrack", src: "/logos/newstrack.jpg", className: "h-5 sm:h-8", solid: true },
];

const problems = [
  "Everything depends on me to keep the business running",
  "My team isn't productive without constant supervision",
  "We don't know where AI actually fits in our business",
  "Sales and marketing teams aren't aligned or connected",
  "We waste too much time on manual, repetitive tasks",
  "We have too many software tools but poor execution",
];

const beliefs = [
  {
    n: "01",
    icon: Workflow,
    title: "A business should not depend on the founder.",
    desc: "Founder dependency is structural, not personal. It is resolved with clear accountability, SOPs, and system design.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "AI adoption matters more than AI awareness.",
    desc: "Workshops have limited value unless teams change how they work. Real training requires daily AI adoption rhythms.",
  },
  {
    n: "03",
    icon: Compass,
    title: "Do not automate a process you do not understand.",
    desc: "Automation makes clean processes faster, but broken ones fail faster. Map the workflow manually before coding.",
  },
  {
    n: "04",
    icon: Wrench,
    title: "Technology is only one part of the answer.",
    desc: "Clear roles and accountability matter more than new tools. Tech accelerates, but human execution is the foundation.",
  },
];

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^\d+(\.\d+)?/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[0]);
    const suffix = value.slice(match[0].length);
    const decimals = match[0].includes(".") ? 1 : 0;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            observer.disconnect();
            const duration = 1400;
            const startTime = performance.now();
            const step = (now: number) => {
              const p = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              const current = target * eased;
              const formatted = decimals
                ? current.toFixed(decimals)
                : Math.round(current).toLocaleString("en-US");
              setDisplay(`${formatted}${suffix}`);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
      style={{ scaleX, background: "var(--gradient-brand)" }}
    />
  );
}

function HomePage() {
  const cms = usePageContent("home", EXACT_DEFAULT_HOME_CONTENT);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [spotIndex, setSpotIndex] = useState(0);
  const problemsRef = useRef<HTMLDivElement>(null);
  const [easeActive, setEaseActive] = useState(0);
  const easeRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const starsInView = useInView(testimonialsRef, { once: true, margin: "0px 0px -80px 0px" });

  const dynamicProblems = [
    cms.problems?.problem_1,
    cms.problems?.problem_2,
    cms.problems?.problem_3,
    cms.problems?.problem_4,
    cms.problems?.problem_5,
    cms.problems?.problem_6,
  ].filter(Boolean) as string[];

  const activeProblems = dynamicProblems.length > 0 ? dynamicProblems : problems;

  // Floating badges parsers
  const badge1Raw = cms.hero?.floatingBadge1 || "13+ Years of Experience";
  const badge1Parts = badge1Raw.trim().split(/\s+/);
  const badge1Num = badge1Parts[0] || "13+";
  const badge1Label = badge1Parts.length > 1 ? badge1Parts.slice(1).join(" ") : "Years of Experience";

  const badge2Raw = cms.hero?.floatingBadge2 || "100+ Businesses Scaled";
  const badge2Parts = badge2Raw.trim().split(/\s+/);
  const badge2Num = badge2Parts[0] || "100+";
  const badge2Label = badge2Parts.length > 1 ? badge2Parts.slice(1).join(" ") : "Businesses Scaled";

  const badge3Raw = cms.hero?.floatingBadge3 || "5,000+ Professionals Trained";
  const badge3Parts = badge3Raw.trim().split(/\s+/);
  const badge3Num = badge3Parts[0] || "5,000+";
  const badge3Label = badge3Parts.length > 1 ? badge3Parts.slice(1).join(" ") : "Professionals Trained";

  useEffect(() => {
    const el = problemsRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let running = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running) {
            running = true;
            timer = setInterval(() => {
              setSpotIndex((i) => (i + 1) % activeProblems.length);
            }, 1700);
          } else if (!e.isIntersecting && running) {
            running = false;
            if (timer) clearInterval(timer);
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [activeProblems.length]);

  useEffect(() => {
    const el = easeRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let running = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running) {
            running = true;
            timer = setInterval(() => {
              setEaseActive((i) => (i + 1) % 4);
            }, 1900);
          } else if (!e.isIntersecting && running) {
            running = false;
            if (timer) clearInterval(timer);
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className="homepage-wrapper">
      <ScrollProgress />
      {/* HERO */}
      <section className="premium-canvas bg-premium-side-gradient relative isolate overflow-x-clip">
        <GridVignetteBackground
          className="hidden dark:block opacity-40"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <ParticleField className="opacity-40 hidden md:block" count={14} seed={7} />
        <div className="container-edit pt-10 pb-28 md:pt-14 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="animate-fade-in-up">
                <span className="eyebrow flex items-center gap-2 whitespace-nowrap max-sm:gap-1 max-sm:px-2 max-sm:text-[0.45rem] min-[360px]:max-sm:text-[0.52rem] max-sm:tracking-[0.08em]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {cms.hero?.eyebrow || "AI Strategist  |  Author  |  Entrepreneur"}
                </span>
              </div>

              <h1 className="animate-fade-in-up delay-80 mt-6 font-display text-[8.5vw] min-[360px]:text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink dark:text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
                <RichHeading
                  text={
                    cms.hero?.heading ||
                    "I Help Founders Scale Their [Service Business] *Without Depending on Them.*"
                  }
                />
              </h1>

              <p className="animate-fade-in-up delay-150 mt-4 max-w-2xl text-base leading-[1.6] text-ink-soft md:text-lg">
                {cms.hero?.subheading ||
                  "For over 13 years, I've worked across business development, sales, marketing, branding, operations, technology, and entrepreneurship. Today, I help founders simplify their business, build better systems, and use AI where it creates real business value."}
              </p>

              <div className="animate-fade-in-up delay-280 mt-6 flex flex-col items-start">
                <StrategyCallButton size="lg" />
              </div>
            </div>

            <div className="animate-fade-in-up delay-200 lg:col-span-5">
              <div className="relative">
                <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-rule shadow-lift">
                  <div className="absolute inset-0 bg-black" />
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                  <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                  <img
                    src="/ambesh-tiwari.jpg"
                    alt="Ambesh Tiwari"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/0"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div className="flex items-center justify-between">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    </div>
                    <div>
                      <div className="h-px w-16 bg-white/40" />
                      <p className="mt-4 font-serif text-xl italic text-white/90">
                        &ldquo;{cms.hero?.quote || "A business that only runs when the founder pushes it, is a job with extra steps."}&rdquo;
                      </p>
                      <p className="mt-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white">
                        Ambesh Tiwari
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[20px]"
                  style={{ background: "var(--accent-soft)" }}
                  aria-hidden
                />
                {/* Floating circle 1: Dynamic badge 1 */}
                <div className="animate-float-1 absolute top-[22%] left-0 lg:-left-12 z-20 w-[70px] h-[70px] md:w-[96px] md:h-[96px] rounded-full bg-canvas/40 backdrop-blur-md border border-rule shadow-lift hover:scale-105 hover:border-accent transition-all duration-300 flex flex-col items-center justify-center p-1 text-center">
                  <span className="font-display text-[12px] md:text-lg font-extrabold text-gradient-brand animate-gradient hero-stat-solid-white">
                    {badge1Num}
                  </span>
                  <span className="text-[6px] md:text-[8px] uppercase tracking-wider font-extrabold text-ink leading-tight mt-1 max-w-[58px] md:max-w-[80px]">
                    {badge1Label}
                  </span>
                </div>
                {/* Floating circle 2: Dynamic badge 2 */}
                <div className="animate-float-2 absolute -bottom-10 right-0 lg:-bottom-10 lg:-right-12 z-20 w-[70px] h-[70px] md:w-[96px] md:h-[96px] rounded-full bg-canvas/40 backdrop-blur-md border border-rule shadow-lift hover:scale-105 hover:border-accent transition-all duration-300 flex flex-col items-center justify-center p-1 text-center">
                  <span className="font-display text-[12px] md:text-lg font-extrabold text-gradient-brand animate-gradient hero-stat-solid-white">
                    {badge2Num}
                  </span>
                  <span className="text-[6px] md:text-[8px] uppercase tracking-wider font-extrabold text-ink leading-tight mt-1 max-w-[58px] md:max-w-[80px]">
                    {badge2Label}
                  </span>
                </div>
                {/* Floating circle 3: Dynamic badge 3 */}
                <div className="animate-float-3 absolute top-[35%] right-0 lg:-right-12 z-20 w-[70px] h-[70px] md:w-[96px] md:h-[96px] rounded-full bg-canvas/40 backdrop-blur-md border border-rule shadow-lift hover:scale-105 hover:border-accent transition-all duration-300 flex flex-col items-center justify-center p-1 text-center">
                  <span className="font-display text-[12px] md:text-lg font-extrabold text-gradient-brand animate-gradient hero-stat-solid-white">
                    {badge3Num}
                  </span>
                  <span className="text-[6px] md:text-[8px] uppercase tracking-wider font-extrabold text-ink leading-tight mt-1 max-w-[58px] md:max-w-[80px]">
                    {badge3Label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO BAR */}
      <section className="relative bg-canvas py-6 featured-bar home-section-alt">
        <div className="container-edit">
          <Reveal eager>
            <p className="text-center text-xs uppercase tracking-widest text-ink-muted">
              Featured In
            </p>
          </Reveal>
          <div className="mt-4">
            <Marquee
              fade={32}
              speed={60}
              fadeColor="var(--featured-fade)"
              items={proofLogos.map((l) => (
                <img
                  key={l.name}
                  src={l.src}
                  alt={l.name}
                  title={l.name}
                  className={`${l.className} w-auto object-contain opacity-80 ${l.solid ? "featured-logo-solid" : "featured-logo"}`}
                  loading="lazy"
                />
              ))}
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section
        id="problems"
        className="relative overflow-hidden bg-canvas bg-premium-side-gradient py-20 md:py-32 lg:py-36 optimize-render"
        style={{ containIntrinsicSize: "0 700px" }}
      >
        <GridVignetteBackground
          className="hidden dark:block opacity-35"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-edit relative">
          <div className="grid gap-12 md:grid-cols-12 md:items-start lg:gap-16">
            <Reveal className="md:col-span-5">
              <p className="eyebrow eyebrow-indigo flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5" /> {cms.problems?.section_eyebrow || "The Problems I Solve"}
              </p>
              <h2 className="mt-4 pb-2 font-display text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink">
                <RichHeading
                  text={
                    cms.problems?.section_heading ||
                    "Running a business\nshouldn't feel like\n*putting out fires\nevery day.*"
                  }
                />
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-7">
              <div className="space-y-4 text-ink-soft">
                <TypeLine
                  text={cms.problems?.section_subheading || "I help founders solve problems like:"}
                  className="text-ink text-xl md:text-2xl font-bold tracking-tight"
                />
              </div>
              <div ref={problemsRef} className="relative mt-8">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {activeProblems.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.55,
                        delay: i * 0.09,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative flex items-start gap-3 rounded-[20px] custom-theme-card-static pointer-events-none p-5 md:p-6 text-[15px] md:text-base leading-relaxed text-ink-soft"
                    >
                      <motion.div
                        className="pointer-events-none absolute inset-0 rounded-[20px]"
                        animate={{ opacity: i === spotIndex ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        style={{
                          boxShadow: "0 0 0 1.5px var(--accent), 0 0 30px -4px var(--accent)",
                        }}
                        aria-hidden
                      />
                      <motion.span
                        className="problem-tick mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 18,
                          delay: i * 0.09 + 0.2,
                        }}
                        aria-hidden
                      >
                        <Check className="h-3.5 w-3.5" />
                      </motion.span>
                      <span>{p}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MY APPROACH & EASE FRAMEWORK */}
      <section className="relative overflow-hidden bg-canvas py-16 md:py-24 home-section-alt optimize-render">
        <div className="container-edit relative">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12 mb-12">
            <Reveal className="md:col-span-7">
              <p className="eyebrow eyebrow-indigo flex items-center gap-2">
                <Compass className="h-3.5 w-3.5" /> {cms.ease?.section_eyebrow || "My Approach"}
              </p>
              <h2 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl text-ink">
                <RichHeading
                  text={
                    cms.ease?.section_heading ||
                    "Better businesses aren't built by *adding more tools.*"
                  }
                />
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-5">
              <p className="text-base leading-[1.6] text-ink-soft md:text-lg dark:text-white">
                {cms.ease?.section_subheading || "They're built by improving the way work gets done. The EASE Framework is a structured path to simplification, clarity, and automation."}
              </p>
            </Reveal>
          </div>

          <div className="text-center mb-12">
            <Reveal>
              <h3 className="font-display text-2xl font-extrabold text-ink tracking-tight">
                {cms.ease?.framework_title || "The EASE Framework"}
              </h3>
            </Reveal>
          </div>

          {/* EASE journey highlight (cycling card glow) */}
          <div ref={easeRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                stage: "Stage 01",
                label: cms.ease?.stage1_label || "Eliminate",
                desc: cms.ease?.stage1_desc || "Remove work that doesn't create value.",
              },
              {
                stage: "Stage 02",
                label: cms.ease?.stage2_label || "Automate",
                desc: cms.ease?.stage2_desc || "Use AI only after the process is clear.",
              },
              {
                stage: "Stage 03",
                label: cms.ease?.stage3_label || "Streamline",
                desc: cms.ease?.stage3_desc || "Connect people, processes, and technology.",
              },
              {
                stage: "Stage 04",
                label: cms.ease?.stage4_label || "Execute",
                desc: cms.ease?.stage4_desc || "Turn ideas into consistent business results.",
              },
            ].map(({ stage, label, desc }, i) => (
              <Reveal key={label} delay={i * 120} className="h-full">
                <div className="relative h-full">
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-[20px]"
                    animate={{ opacity: i === easeActive ? 1 : 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    style={{
                      boxShadow: "0 0 0 1.5px var(--accent), 0 0 30px -4px var(--accent)",
                    }}
                    aria-hidden
                  />
                  <div className="custom-theme-card group relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] backdrop-blur-md p-6">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full pointer-events-none" />
                    <div
                      className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-[850ms] ease-out group-hover:opacity-50"
                      style={{ background: "var(--accent-soft)" }}
                      aria-hidden
                    />
                    <div>
                      <span className="font-mono text-[0.65rem] md:text-[0.78rem] font-bold uppercase tracking-[0.15em] text-accent">
                        {stage}
                      </span>
                      <h4 className="mt-3 font-display text-lg md:text-xl font-extrabold tracking-tight text-ink">
                        {label}
                      </h4>
                      <p className="mt-3 text-[15px] md:text-[16px] leading-[1.65] text-ink-soft">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-10 text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:opacity-70"
              >
                Learn More About EASE <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW I HELP */}
      <section
        id="services"
        className="relative overflow-hidden bg-canvas bg-premium-side-gradient py-16 md:py-24 optimize-render"
      >
        <GridVignetteBackground
          className="hidden dark:block opacity-40"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-edit relative">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
            <Reveal className="md:col-span-7">
              <p className="eyebrow eyebrow-indigo flex items-center gap-2">
                <Wrench className="h-3.5 w-3.5" /> {cms.howIHelp?.section_eyebrow || "How I Help"}
              </p>
              <h2 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl">
                <RichHeading
                  text={cms.howIHelp?.section_heading || "I Build. I Advise. *I Train.*"}
                />
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-5">
              <p className="text-base leading-[1.6] text-ink-soft md:text-lg dark:text-white">
                {cms.howIHelp?.section_subheading || "Practical, hands-on support for founder-led businesses. Building software-driven operations, advising on management processes, and training teams for AI adoption."}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 flex flex-col gap-4 md:mt-16 lg:h-[430px] lg:flex-row w-full">
            {[
              {
                num: "01",
                title: cms.howIHelp?.card1_title || "Build",
                eyebrow: cms.howIHelp?.card1_eyebrow || "Operating Systems",
                desc: cms.howIHelp?.card1_desc || "I build practical AI products to turn messy business operations into systems people actually use.",
                image: "/service-os.jpg",
                href: "/services",
              },
              {
                num: "02",
                title: cms.howIHelp?.card2_title || "Advice",
                eyebrow: cms.howIHelp?.card2_eyebrow || "Better Ways of Working",
                desc: cms.howIHelp?.card2_desc || "I help founders improve systems, align execution rhythms, and drive practical AI adoption across the team.",
                image: "/service-transformation.jpg",
                href: "/services",
              },
              {
                num: "03",
                title: cms.howIHelp?.card3_title || "Train",
                eyebrow: cms.howIHelp?.card3_eyebrow || "Practical AI Training",
                desc: cms.howIHelp?.card3_desc || "I help teams & professionals to use AI in their daily work, not only learn about new tools.",
                image: "/service-ai-training.jpg",
                href: "/services",
              },
            ].map(({ num, title, eyebrow, desc, image, href }, i) => {
              const isHovered = hoveredService === i;
              return (
                <Link
                  key={title}
                  to={href}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  onFocus={() => setHoveredService(i)}
                  onBlur={() => setHoveredService(null)}
                  className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 shadow-soft transition-all duration-1500 ease-out sm:min-h-[360px] lg:min-h-0 w-full"
                  style={{
                    flexGrow: isHovered ? 2.4 : 1,
                    flexBasis: 0,
                    transition: "flex-grow 1500ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1500 ease-out ${isHovered ? "scale-100" : "scale-105"
                      }`}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-1500 ${isHovered
                        ? "bg-gradient-to-t from-black/95 via-black/55 to-black/15"
                        : "bg-gradient-to-t from-black/95 via-black/75 to-black/40"
                      }`}
                  />

                  {/* Service Number Badge */}
                  <span className="absolute left-6 top-6 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-sm md:left-8 md:top-8">
                    {num}
                  </span>

                  {/* Card Content */}
                  <div className="relative p-6 md:p-8 w-full">
                    <h3
                      className={`font-display leading-tight tracking-tight text-white transition-all duration-1000 ${isHovered
                          ? "text-2xl md:text-[30px] font-extrabold"
                          : "text-xl md:text-2xl font-bold"
                        }`}
                    >
                      {title}
                    </h3>

                    <p
                      className="mt-2 inline-flex w-fit items-center gap-1.5 border-l-2 pl-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/70"
                      style={{ borderColor: "var(--accent)" }}
                    >
                      {eyebrow}
                    </p>

                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 transition-all duration-1000 md:text-base">
                      {desc}
                    </p>

                    {/* Bottom row CTA */}
                    <div className="mt-6 flex items-center gap-3 text-sm font-medium text-white">
                      <span className="transition-opacity duration-1000">Explore Service</span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className="relative overflow-hidden bg-canvas home-section-alt py-16 md:py-24"
      >
        <div className="container-edit relative">
          <Reveal>
            <p className="eyebrow eyebrow-indigo flex items-center gap-2">
              <Star className="h-3.5 w-3.5" /> {cms.testimonials?.section_eyebrow || "What clients say"}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl text-ink">
              <RichHeading
                text={
                  cms.testimonials?.section_heading || "Results that speak *for themselves.*"
                }
              />
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  cms.testimonials?.t1_quote ||
                  "Ambesh didn't just teach AI — he rewired how our team thinks about work. Three months later, we've cut manual reporting time by 60% and our managers actually own their numbers.",
                name: cms.testimonials?.t1_name || "Chief Operating Officer",
                role: cms.testimonials?.t1_role || "Mid-size Financial Services Firm",
                rating: 5,
              },
              {
                quote:
                  cms.testimonials?.t2_quote ||
                  "We've had plenty of consultants come in with slides. Ambesh came in with a system. The SOPs, the accountability structure, the AI workflows — it all clicked together in weeks, not quarters.",
                name: cms.testimonials?.t2_name || "Founder & CEO",
                role: cms.testimonials?.t2_role || "E-commerce Brand, UAE",
                rating: 5,
              },
              {
                quote:
                  cms.testimonials?.t3_quote ||
                  "The session rating doesn't lie — 9.6 out of 10 from a room of sceptical senior managers. He made AI feel practical, not threatening. People left wanting to try things the very next day.",
                name: cms.testimonials?.t3_name || "Head of Learning & Development",
                role: cms.testimonials?.t3_role || "Large Retail Group, India",
                rating: 5,
              },
            ].map(({ quote, name, role, rating }, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="custom-theme-card group relative flex h-full flex-col justify-between rounded-[20px] p-7">
                  <div>
                    <div className="flex gap-0.5 mb-5">
                      {Array.from({ length: rating }).map((_, s) => {
                        const delay = 0.4 + s * 0.13;
                        return (
                          <motion.span
                            key={s}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={starsInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{
                              delay,
                              duration: 0.35,
                              type: "spring",
                              stiffness: 400,
                              damping: 18,
                            }}
                            style={{ display: "inline-flex" }}
                          >
                            <Star className="testimonial-star h-4 w-4 fill-current text-accent dark:text-white" />
                          </motion.span>
                        );
                      })}
                    </div>
                    <p className="text-[15px] leading-[1.7] text-ink-soft">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-rule pt-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{name}</p>
                      <p className="text-xs text-ink-muted">{role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I HAVE BUILT */}
      <section
        id="built"
        className="relative overflow-hidden bg-canvas bg-premium-side-gradient pt-8 pb-16 md:py-24 optimize-render"
      >
        <GridVignetteBackground
          className="hidden dark:block opacity-40"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-edit relative">
          <div className="grid gap-6 md:grid-cols-12 md:items-start md:gap-12 mb-12">
            <Reveal className="md:col-span-6">
              <p className="eyebrow eyebrow-indigo flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5" /> {cms.ventures?.section_eyebrow || "Brands and Products"}
              </p>
              <h2 className="mt-4 pb-2 font-display text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl text-ink">
                <RichHeading
                  text={cms.ventures?.section_heading || "I do not only advise.\n*I build.*"}
                />
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-6">
              <div className="space-y-2 text-[15px] leading-[1.5] text-ink-soft md:text-base dark:text-white">
                <p className="dark:text-white">
                  {cms.ventures?.section_subheading ||
                    "Building products has taught me lessons that cannot be learned from presentations. You have to understand customers, make difficult choices, work with a team, manage costs and make the product useful enough for people to keep using it."}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01 / Product",
                title: cms.ventures?.v1_title || "BDA Technologies",
                eyebrow: cms.ventures?.v1_eyebrow || "Business systems & automation",
                color: "to-cyan-500/15",
                logo: "/logos/bda.png",
                desc: cms.ventures?.v1_desc || "BDA Technologies helps founder-led businesses improve reporting, workflows, dashboards, automation and use of AI.",
                link: { href: "https://bdatechnologies.com", label: "Visit BDA Technologies" },
              },
              {
                n: "02 / Product",
                title: cms.ventures?.v2_title || "LinkAssist",
                eyebrow: cms.ventures?.v2_eyebrow || "AI support for LinkedIn authority",
                color: "to-accent-soft/30",
                logo: "/logos/linkassist.png",
                desc: cms.ventures?.v2_desc || "LinkAssist helps professionals find ideas, write stronger LinkedIn content and build authority with more consistency.",
                link: { href: "https://linkassist.ai/", label: "Explore LinkAssist" },
              },
              {
                n: "03 / Platform",
                title: cms.ventures?.v3_title || "Automation School",
                eyebrow: cms.ventures?.v3_eyebrow || "AI Training For Professionals",
                color: "to-amber-500/15",
                logo: "/logos/automation-school.png",
                desc: cms.ventures?.v3_desc || "Practical AI training courses and customized corporate programs designed for hands-on operational adoption.",
                link: { href: "https://automationschool.in/", label: "Explore Automation School" },
              },
            ].map(({ n, title, eyebrow, logo, desc, link }) => (
              <Reveal key={n} delay={100}>
                <div className="custom-theme-card group relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] backdrop-blur-md p-7 md:p-8">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full pointer-events-none" />
                  <div
                    className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-[850ms] ease-out group-hover:opacity-50"
                    style={{ background: "var(--accent-soft)" }}
                    aria-hidden
                  />
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-accent">
                        {n}
                      </span>
                      <img
                        src={logo}
                        alt={title}
                        loading="lazy"
                        className="h-9 w-28 shrink-0 translate-x-6 object-contain mix-blend-multiply dark:mix-blend-normal"
                      />
                    </div>
                    <h3 className="mt-0 font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-2 inline-flex w-fit items-center gap-1.5 border-l-2 pl-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-accent border-accent">
                      {eyebrow}
                    </p>
                    <p className="mt-4 text-[15px] leading-[1.65] text-ink-soft">{desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-rule">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1 text-sm font-semibold text-shiny transition-colors"
                    >
                      {link.label}{" "}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section
        id="work"
        className="relative overflow-hidden bg-canvas py-16 md:py-24 home-section-alt"
      >
        <div className="container-edit relative">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
            <Reveal className="md:col-span-7">
              <p className="eyebrow eyebrow-indigo flex items-center gap-2">
                <FolderOpen className="h-3.5 w-3.5" /> {cms.stats?.section_eyebrow || "Selected Work"}
              </p>
              <h2 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl">
                <RichHeading
                  text={
                    cms.stats?.section_heading ||
                    "Work across companies, *teams and institutions.*"
                  }
                />
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-5">
              <p className="text-base leading-[1.6] text-ink-soft md:text-lg dark:text-white">
                {cms.stats?.section_subheading || "I have worked with founders, corporate teams, professional bodies, educational institutions and government organisations."}
              </p>
            </Reveal>
          </div>

          {/* 3D Service Carousel */}
          <ServiceCarousel
            cards={[
              {
                title: "Landmark Group, Dubai",
                desc: "Practical AI & automation training for retail operations teams.",
                image: "/training/landmark-group-dubai.jpg",
                href: "/services",
              },
              {
                title: "TATA Digital",
                desc: "AI consulting & training program for cross-functional digital teams.",
                image: "/service-transformation.jpg",
                href: "/services",
              },
              {
                title: "NICASA of NIRC of ICAI",
                desc: "AI training for finance professionals across ICAI chapters.",
                image: "/training/icai-nirc-new-delhi.jpg",
                href: "/services",
              },
              {
                title: "Ministry of Finance, Tanzania",
                desc: "AI awareness & practical use program for government officials.",
                image: "/training/ministry-of-finance-tanzania.jpg",
                href: "/services",
              },
              {
                title: "Future Engagements",
                desc: "New case studies and training programs are added regularly.",
                image: "/service-os.jpg",
                href: "/services",
              },
              {
                title: "Recent Workshops",
                desc: "Fresh AI workshops and consulting across emerging industries.",
                image: "/service-ai-training.jpg",
                href: "/services",
              },
            ]}
          />

          {/* Training/Speaking Stats Strip */}
          <div className="mt-20 md:mt-8">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto">
              {[
                { v: cms.stats?.stat1_value || "5,000+", l: cms.stats?.stat1_label || "Professionals trained", icon: Users },
                { v: cms.stats?.stat2_value || "150+", l: cms.stats?.stat2_label || "Sessions and engagements", icon: Rocket },
                { v: cms.stats?.stat3_value || "11+", l: cms.stats?.stat3_label || "Industries delivered in", icon: Building2 },
                { v: cms.stats?.stat4_value || "9.5/10", l: cms.stats?.stat4_label || "Average session rating", icon: Star },
              ].map((s, i) => (
                <Reveal key={s.l} delay={120 + i * 60}>
                  <div className="custom-theme-card-static relative h-full overflow-hidden rounded-[20px] p-4 text-center">
                    <div
                      className="stat-aurora pointer-events-none absolute inset-0 opacity-50"
                      aria-hidden
                    />
                    <div className="relative flex items-center justify-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow">
                        <s.icon className="h-3.5 w-3.5" />
                      </div>
                      <p className="stats-value font-display text-2xl font-extrabold tracking-tight text-gradient-brand animate-gradient md:text-3xl">
                        <CountUp value={s.v} />
                      </p>
                    </div>
                    <p className="stats-label relative mt-2 text-xs uppercase tracking-wider font-semibold text-ink-muted leading-tight">
                      {s.l}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative overflow-hidden bg-canvas bg-premium-side-gradient py-12 md:py-16">
        <GridVignetteBackground
          className="hidden dark:block opacity-40"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-edit relative">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <p className="eyebrow eyebrow-indigo flex items-center gap-2">
                <User className="h-3.5 w-3.5" /> {cms.about?.section_eyebrow || "About"}
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] md:text-5xl text-ink">
                <RichHeading text={cms.about?.section_heading || "Meet *Ambesh.*"} />
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-7">
              <p className="text-base text-ink leading-relaxed font-semibold">
                {cms.about?.intro || "I am Ambesh Tiwari, an AI Trainer, Business Systems Consultant, author and founder of BDA Technologies."}
              </p>
              <hr className="border-rule my-3" />
              <div className="space-y-3.5 text-[15px] md:text-base leading-[1.6] text-ink-soft">
                <p>I started my career in business development and marketing.</p>
                <p>
                  Over time, I realised that most business problems weren't caused by technology.
                </p>
                <blockquote
                  className="border-l-2 pl-4 font-serif text-lg md:text-xl italic leading-snug text-ink my-3"
                  style={{ borderColor: "var(--accent)" }}
                >
                  &ldquo;{cms.about?.quote || "They were caused by unclear systems and inconsistent execution."}&rdquo;
                </blockquote>
                <p>This taught me how founders think, how teams work and how businesses grow.</p>
                <p>I saw the same problem again and again.</p>
                <p>
                  Companies were buying more tools, but people were still working through WhatsApp,
                  spreadsheets and repeated follow-ups.
                </p>
                <p>The problem was often not a lack of technology.</p>
                <p>The problem was the gap between people, process and technology.</p>
                <p className="text-ink font-semibold">
                  {cms.about?.closing || "Today, I help businesses close that gap. I help founders build businesses that are simpler to run and easier to grow."}
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="btn-premium group inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-semibold"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Read My Story
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BOOK */}
      <BookStickySection>
        <p className="eyebrow eyebrow-indigo flex items-center gap-2 mb-4">
          <BookOpen className="h-3.5 w-3.5" /> {cms.book?.section_eyebrow || "THE BOOK"}
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] md:text-5xl text-ink">
          <RichHeading text={cms.book?.section_heading || "Accelerate *with AI.*"} />
        </h2>
        <p className="mt-3 font-serif text-xl italic text-ink-soft">
          {cms.book?.section_subheading || "A simple guide to using AI in business."}
        </p>
        <div className="mt-6 max-w-xl text-[15px] md:text-base leading-[1.65] text-ink-soft space-y-4">
          <p>
            {cms.book?.desc || "Accelerate with AI helps founders and professionals understand what AI can do and how they can start using it in practical work."}
          </p>

          {/* Key pillars bullets in book section (Desktop Only) */}
          <ul className="hidden md:grid mt-6 grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-ink-soft pt-3 border-t border-rule/50">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" /> No-Code Automation
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" /> Practical Business Value
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" /> LLM Fine-Tuning Basics
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" /> Operations Scaling
            </li>
          </ul>
        </div>
        <div className="mt-8 flex w-full flex-wrap items-center gap-2 sm:gap-3">
          <a
            href="https://www.amazon.in/dp/B0CLKZK6JS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium group inline-flex h-12 w-full justify-center items-center gap-2 whitespace-nowrap rounded-full px-2 text-xs font-semibold min-[400px]:w-auto min-[400px]:flex-1 sm:px-6 sm:text-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get the Book <ArrowRight className="h-4 w-4" />
            </span>
          </a>
          <Link
            to="/book"
            className="inline-flex h-12 w-full justify-center items-center gap-2 whitespace-nowrap rounded-full border border-rule bg-canvas px-2 text-xs font-semibold text-ink hover:bg-sand transition-colors min-[400px]:w-auto min-[400px]:flex-1 sm:px-6 sm:text-sm"
          >
            See What Is Inside
          </Link>
        </div>
      </BookStickySection>

      {/* FINAL CTA */}
      <section className="cta-dark relative overflow-hidden border-b border-white/10">
        <ParticleField className="opacity-70" color="rgba(255,255,255,0.8)" count={26} seed={11} />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 md:hidden" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(125% 70% at 50% -12%, color-mix(in oklch, var(--accent) 28%, transparent) 0%, transparent 62%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(75% 45% at 100% 105%, color-mix(in oklch, var(--accent) 18%, transparent) 0%, transparent 55%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklch, var(--accent) 55%, transparent) 50%, transparent)",
            }}
            aria-hidden
          />
        </div>
        <div className="container-edit relative py-16 md:py-24">
          <Reveal>
            <h2 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl md:text-7xl">
              <RichHeading
                text={
                  cms.cta?.heading || "Ready to Build a Business *That Runs Better?*"
                }
              />
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-[1.65] text-white/70 md:text-xl">
              {cms.cta?.subheading ||
                "Let's talk about your business, your goals, and where AI and better systems can create the biggest impact."}
            </p>
            <div className="mt-10 flex flex-row items-center gap-1.5 sm:gap-3">
              <Link
                to="/contact"
                search={{ service: "strategy" }}
                className="btn-premium group inline-flex h-11 flex-1 items-center justify-center gap-1 min-[375px]:gap-1.5 whitespace-nowrap rounded-full px-2 min-[375px]:px-3 text-[11px] min-[360px]:text-xs min-[400px]:text-sm font-semibold text-white transition-all duration-300 sm:h-14 sm:flex-none sm:gap-2 sm:justify-start sm:px-8 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  {cms.cta?.button_text || "Book a Strategy Call"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </span>
              </Link>
              <a
                href="https://wa.me/918929465115?text=Hi%20Ambesh%2C%20I%20want%20to%20book%20a%20strategy%20call."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Ambesh"
                className="wa-btn relative inline-flex h-11 flex-1 items-center justify-center gap-1 min-[375px]:gap-2 overflow-hidden whitespace-nowrap rounded-full border border-white/20 bg-[#25D366] pl-1.5 pr-2 min-[375px]:pl-2.5 min-[375px]:pr-3 text-[11px] min-[360px]:text-xs min-[400px]:text-sm text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1fb958] hover:shadow-[0_12px_40px_-8px_rgba(37,211,102,0.65)] active:scale-[0.98] sm:h-14 sm:flex-none sm:justify-start sm:gap-2.5 sm:pl-4 sm:pr-7 sm:text-base"
              >
                <span className="wa-shine" aria-hidden />
                <span className="flex shrink-0 items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4 sm:h-6 sm:w-6"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
                <span className="sm:hidden">WhatsApp Ambesh</span>
                <TypeLine
                  text="WhatsApp Ambesh"
                  loop
                  className="hidden whitespace-nowrap sm:block sm:min-w-[16ch]"
                />
              </a>
            </div>
            <p className="mt-5 text-xs text-white/50">
              {cms.cta?.note || "Responds within 24 hours. No sales script. Just a real conversation."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CORE PILLARS (A-M-B-E-S-H) */}
      <CorePillars />
    </div>
  );
}
