import { useRef, useState, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Plus,
  Minus,
  Check,
  Compass,
  Users,
  GraduationCap,
  Wrench,
  MessageCircle,
  Sparkles,
  Building2,
  Star,
  CalendarClock,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ServicesLogo } from "@/components/ServicesLogos";
import { ProcessLogo } from "@/components/ProcessLogos";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { ParticleField } from "@/components/ParticleField";
import { usePageContent } from "@/hooks/use-page-content";
import { EXACT_DEFAULT_SERVICES_CONTENT } from "@/lib/cms-defaults";
import { RichHeading } from "@/components/RichHeading";

export const faqs = [
  { q: EXACT_DEFAULT_SERVICES_CONTENT.faqs.q1, a: EXACT_DEFAULT_SERVICES_CONTENT.faqs.a1 },
  { q: EXACT_DEFAULT_SERVICES_CONTENT.faqs.q2, a: EXACT_DEFAULT_SERVICES_CONTENT.faqs.a2 },
  { q: EXACT_DEFAULT_SERVICES_CONTENT.faqs.q3, a: EXACT_DEFAULT_SERVICES_CONTENT.faqs.a3 },
  { q: EXACT_DEFAULT_SERVICES_CONTENT.faqs.q4, a: EXACT_DEFAULT_SERVICES_CONTENT.faqs.a4 },
  { q: EXACT_DEFAULT_SERVICES_CONTENT.faqs.q5, a: EXACT_DEFAULT_SERVICES_CONTENT.faqs.a5 },
  { q: EXACT_DEFAULT_SERVICES_CONTENT.faqs.q6, a: EXACT_DEFAULT_SERVICES_CONTENT.faqs.a6 },
  { q: EXACT_DEFAULT_SERVICES_CONTENT.faqs.q7, a: EXACT_DEFAULT_SERVICES_CONTENT.faqs.a7 },
];

function parseStat(
  rawVal: string,
  defaultEnd: number,
  defaultPrefix: string,
  defaultSuffix: string,
  defaultDecimals: number
) {
  if (!rawVal) {
    return {
      end: defaultEnd,
      prefix: defaultPrefix,
      suffix: defaultSuffix,
      decimals: defaultDecimals,
      isCustomText: false,
      rawText: "",
    };
  }
  const numMatch = rawVal.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (numMatch) {
    const prefix = numMatch[1] || "";
    const end = parseFloat(numMatch[2]);
    const suffix = numMatch[3] || "";
    const decimals = numMatch[2].includes(".") ? numMatch[2].split(".")[1].length : 0;
    return { end, prefix, suffix, decimals, isCustomText: false, rawText: rawVal };
  }
  return { end: defaultEnd, prefix: "", suffix: "", decimals: 0, isCustomText: true, rawText: rawVal };
}

function ProcessStepCard({
  p,
  i,
  active,
}: {
  p: { step: string; title: string; body: string };
  i: number;
  active: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const lift = useTransform(scrollYProgress, [0, 0.5, 1], [36, 0, -36]);

  return (
    <div ref={cardRef} data-step={i} className="relative scroll-mt-28 md:pl-10">
      <span
        className={`absolute left-0 top-9 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-all duration-500 md:block ${
          active ? "border-accent bg-accent shadow-glow" : "border-rule bg-canvas"
        }`}
        aria-hidden
      />
      <motion.div style={{ y: lift }}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
          className={`process-card relative overflow-hidden rounded-3xl border p-7 transition-colors duration-500 md:p-9 ${
            active
              ? "border-accent/40 bg-canvas/90 shadow-[0_20px_60px_-24px_var(--accent)]"
              : "border-rule bg-canvas/60"
          }`}
        >
          <span
            className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-display text-[7rem] font-black leading-none tracking-tighter text-ink/[0.05] md:text-[9rem]"
            aria-hidden
          >
            {p.step}
          </span>
          <div className="relative flex items-center gap-4">
            <div className="icon-box flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rule transition-colors duration-300">
              <ProcessLogo variant={i} className="process-card-logo h-11 w-11 md:h-12 md:w-12" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-ink">{p.title}</h3>
            </div>
          </div>

          <p className="relative mt-5 text-[15px] leading-[1.65] text-ink-soft">{p.body}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProcessTimeline({
  steps,
}: {
  steps: Array<{ step: string; title: string; body: string }>;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const stepElements = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      const mid = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Infinity;
      for (let idx = 0; idx < stepElements.length; idx++) {
        const r = stepElements[idx].getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      }
      setActiveStep(best);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={railRef} className="relative mt-16">
      <div className="relative flex flex-col gap-6 md:gap-10">
        {steps.map((p, i) => (
          <ProcessStepCard key={p.step} p={p} i={i} active={i === activeStep} />
        ))}
      </div>
    </div>
  );
}

export function BusinessOSPage({ loaderData }: { loaderData?: Record<string, Record<string, string>> }) {
  const cms = usePageContent("services", EXACT_DEFAULT_SERVICES_CONTENT, loaderData);
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic Stats
  const statsList = useMemo(() => {
    const s1 = parseStat(cms.hero.stat1_val, 8, "", " to 12", 0);
    const s2 = parseStat(cms.hero.stat2_val, 50, "", "+", 0);
    const s3 = parseStat(cms.hero.stat3_val, 5000, "", "+", 0);
    const s4 = parseStat(cms.hero.stat4_val, 9.5, "", "", 1);

    return [
      { ...s1, l: cms.hero.stat1_label, icon: CalendarClock },
      { ...s2, l: cms.hero.stat2_label, icon: Building2 },
      { ...s3, l: cms.hero.stat3_label, icon: Users },
      { ...s4, l: cms.hero.stat4_label, icon: Star },
    ];
  }, [cms.hero]);

  // Dynamic Pillars
  const pillarsList = useMemo(() => {
    return [
      {
        icon: Compass,
        n: "01",
        name: cms.pillars.p1_name,
        tagline: cms.pillars.p1_tagline,
        body: cms.pillars.p1_body,
        points: [
          cms.pillars.p1_point1,
          cms.pillars.p1_point2,
          cms.pillars.p1_point3,
          cms.pillars.p1_point4,
        ].filter(Boolean),
        cta: cms.pillars.p1_cta,
        search: { service: "diagnostic" },
      },
      {
        icon: Layers,
        n: "02",
        name: cms.pillars.p2_name,
        tagline: cms.pillars.p2_tagline,
        body: cms.pillars.p2_body,
        points: [
          cms.pillars.p2_point1,
          cms.pillars.p2_point2,
          cms.pillars.p2_point3,
          cms.pillars.p2_point4,
        ].filter(Boolean),
        cta: cms.pillars.p2_cta,
        search: { service: "strategy" },
      },
      {
        icon: Users,
        n: "03",
        name: cms.pillars.p3_name,
        tagline: cms.pillars.p3_tagline,
        body: cms.pillars.p3_body,
        points: [
          cms.pillars.p3_point1,
          cms.pillars.p3_point2,
          cms.pillars.p3_point3,
          cms.pillars.p3_point4,
        ].filter(Boolean),
        cta: cms.pillars.p3_cta,
        search: { service: "training" },
      },
    ];
  }, [cms.pillars]);

  // Dynamic Audiences Tabs
  const audienceTabs = useMemo(() => {
    return {
      tab1: {
        label: cms.audiences.tab1_label,
        title: cms.audiences.tab1_title,
        body: cms.audiences.tab1_body,
        bullets: [
          cms.audiences.tab1_bullet1,
          cms.audiences.tab1_bullet2,
          cms.audiences.tab1_bullet3,
        ].filter(Boolean),
      },
      tab2: {
        label: cms.audiences.tab2_label,
        title: cms.audiences.tab2_title,
        body: cms.audiences.tab2_body,
        bullets: [
          cms.audiences.tab2_bullet1,
          cms.audiences.tab2_bullet2,
          cms.audiences.tab2_bullet3,
        ].filter(Boolean),
      },
      tab3: {
        label: cms.audiences.tab3_label,
        title: cms.audiences.tab3_title,
        body: cms.audiences.tab3_body,
        bullets: [
          cms.audiences.tab3_bullet1,
          cms.audiences.tab3_bullet2,
          cms.audiences.tab3_bullet3,
        ].filter(Boolean),
      },
    };
  }, [cms.audiences]);

  const currentAudience = audienceTabs[activeTab] || audienceTabs.tab1;

  // Dynamic Process Steps
  const processStepsList = useMemo(() => {
    return [
      {
        step: cms.process.s1_num,
        title: cms.process.s1_title,
        body: cms.process.s1_body,
      },
      {
        step: cms.process.s2_num,
        title: cms.process.s2_title,
        body: cms.process.s2_body,
      },
      {
        step: cms.process.s3_num,
        title: cms.process.s3_title,
        body: cms.process.s3_body,
      },
      {
        step: cms.process.s4_num,
        title: cms.process.s4_title,
        body: cms.process.s4_body,
      },
    ];
  }, [cms.process]);

  // Dynamic FAQs
  const faqsList = useMemo(() => {
    return [
      { q: cms.faqs.q1, a: cms.faqs.a1 },
      { q: cms.faqs.q2, a: cms.faqs.a2 },
      { q: cms.faqs.q3, a: cms.faqs.a3 },
      { q: cms.faqs.q4, a: cms.faqs.a4 },
      { q: cms.faqs.q5, a: cms.faqs.a5 },
      { q: cms.faqs.q6, a: cms.faqs.a6 },
      { q: cms.faqs.q7, a: cms.faqs.a7 },
    ].filter((f) => f.q && f.a);
  }, [cms.faqs]);

  return (
    <>
      {/* HERO */}
      <section className="premium-canvas bg-premium-side-gradient relative isolate overflow-hidden">
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
        <div className="container-edit relative pt-10 pb-20 md:pt-14 md:pb-24">
          <Reveal eager>
            <p className="eyebrow eyebrow-indigo flex items-center gap-2">
              <Layers className="h-3.5 w-3.5" /> {cms.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={100} eager>
            <h1 className="mt-6 max-w-5xl font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              <RichHeading text={cms.hero.heading} />
            </h1>
          </Reveal>
          <Reveal delay={250} eager>
            <p className="mt-8 max-w-2xl text-lg text-ink-soft">
              {cms.hero.subheading}
            </p>
          </Reveal>
          <Reveal delay={320} eager>
            <div className="mt-10 flex flex-row items-center gap-1.5 sm:gap-3">
              <Link
                to="/contact"
                search={{ service: "strategy" }}
                className="btn-premium inline-flex h-11 flex-1 items-center justify-center gap-1 min-[375px]:gap-1.5 whitespace-nowrap rounded-full px-2 min-[375px]:px-3 text-[11px] min-[360px]:text-xs min-[400px]:text-sm font-semibold sm:h-14 sm:flex-none sm:gap-2 sm:justify-start sm:px-8 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  {cms.hero.primary_btn_text} <ArrowRight className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </span>
              </Link>
              <Link
                to="/training"
                className="inline-flex h-11 flex-1 items-center justify-center gap-1 min-[375px]:gap-1.5 whitespace-nowrap rounded-full border border-ink/15 bg-canvas/80 px-2 min-[375px]:px-3 text-[11px] min-[360px]:text-xs min-[400px]:text-sm font-semibold text-ink hover:border-ink/40 sm:h-14 sm:flex-none sm:justify-start sm:px-8 sm:text-base"
              >
                {cms.hero.secondary_btn_text}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400} eager>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statsList.map((s) => (
                <div
                  key={s.l}
                  className="custom-theme-card-static relative h-full overflow-hidden rounded-[20px] p-4 text-center backdrop-blur shadow-soft"
                >
                  <div
                    className="stat-aurora pointer-events-none absolute inset-0 opacity-50"
                    aria-hidden
                  />
                  <div className="relative flex items-center justify-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow">
                      <s.icon className="h-3.5 w-3.5" />
                    </div>
                    <p className="stats-value font-display text-2xl font-extrabold tracking-tight text-gradient-brand animate-gradient md:text-3xl">
                      {s.isCustomText ? (
                        s.rawText
                      ) : (
                        <AnimatedCounter
                          end={s.end}
                          prefix={s.prefix}
                          suffix={s.suffix}
                          decimals={s.decimals}
                        />
                      )}
                    </p>
                  </div>
                  <p className="stats-label relative mt-2 text-xs uppercase tracking-wider font-semibold text-ink-muted leading-tight">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="relative overflow-hidden py-14 md:py-20 bg-canvas">
        <div className="container-edit relative">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <Wrench className="h-3.5 w-3.5" /> {cms.pillars.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tighter md:text-6xl text-ink">
              <RichHeading text={cms.pillars.heading} />
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              {cms.pillars.subheading}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {pillarsList.map((p, i) => {
              return (
                <Reveal key={p.n} delay={100}>
                  <div className="custom-theme-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-8">
                    <div className="flex items-start justify-between">
                      <div className="icon-box flex h-12 w-12 items-center justify-center rounded-2xl border border-rule">
                        <ServicesLogo variant={i} className="h-8 w-8 md:h-9 md:w-9" />
                      </div>
                      <span className="font-mono text-xs text-ink-muted">{p.n}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-base font-semibold text-ink">{p.tagline}</p>
                    <p className="mt-3 text-sm text-ink-muted">{p.body}</p>
                    <ul className="mt-6 space-y-2 border-t border-rule pt-6">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-ink-soft">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: "var(--accent)" }}
                          />{" "}
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      search={p.search}
                      className="btn-premium mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {p.cta} <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="relative isolate overflow-hidden bg-canvas bg-premium-side-gradient py-14 md:py-20">
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
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <Users className="h-3.5 w-3.5" /> {cms.audiences.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tighter md:text-6xl text-ink">
              <RichHeading text={cms.audiences.heading} />
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              {cms.audiences.subheading}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-2 border-b border-rule">
            {(["tab1", "tab2", "tab3"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative rounded-t-xl px-5 py-3 text-sm font-semibold transition-colors ${
                  activeTab === key ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {audienceTabs[key].label}
                {activeTab === key && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-brand animate-gradient" />
                )}
              </button>
            ))}
          </div>

          <div
            key={activeTab}
            className="mt-12 grid animate-[fade-in_0.4s_ease-out] gap-12 md:grid-cols-12"
          >
            <div className="md:col-span-7">
              <h3 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl text-ink">
                {currentAudience.title}
              </h3>
              <p className="mt-6 text-lg text-ink-soft">{currentAudience.body}</p>
            </div>
            <div className="md:col-span-5">
              <ul className="space-y-4">
                {currentAudience.bullets.map((b) => (
                  <li
                    key={b}
                    className="custom-theme-card-static flex items-start gap-3 rounded-2xl p-5"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-base font-medium text-ink">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative overflow-hidden bg-canvas py-16 md:py-24">
        <div className="container-edit relative">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <Compass className="h-3.5 w-3.5" /> {cms.process.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tighter md:text-6xl text-ink">
              <RichHeading text={cms.process.heading} />
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              {cms.process.subheading}
            </p>
          </Reveal>

          <ProcessTimeline steps={processStepsList} />
        </div>
      </section>

      {/* TRAINING CROSSLINK */}
      <section className="relative isolate overflow-hidden bg-canvas bg-premium-side-gradient py-14">
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
          <Reveal>
            <div className="grid gap-8 rounded-3xl custom-theme-card-static p-8 md:grid-cols-12 md:items-center md:gap-12 md:p-12">
              <div className="md:col-span-7">
                <p className="eyebrow flex items-center gap-2">
                  <GraduationCap className="h-3 w-3" /> {cms.trainingCrosslink.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl text-ink">
                  {cms.trainingCrosslink.heading}
                </h2>
                <p className="mt-4 text-base text-ink-soft">
                  {cms.trainingCrosslink.body}
                </p>
              </div>
              <div className="md:col-span-5 md:text-right">
                <Link
                  to="/training"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-ink bg-canvas px-6 text-sm font-semibold text-ink hover:bg-ink hover:text-canvas transition-colors"
                >
                  {cms.trainingCrosslink.btn_text} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-canvas py-16">
        <div className="container-edit relative grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow flex items-center gap-2">
              <MessageCircle className="h-3.5 w-3.5" /> {cms.faqs.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tighter md:text-5xl text-ink">
              <RichHeading text={cms.faqs.heading} />
            </h2>
          </Reveal>
          <div className="md:col-span-8">
            <ul className="divide-y divide-rule border-y border-rule">
              {faqsList.map((f, i) => (
                <li key={`${f.q}-${i}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-lg font-semibold md:text-xl text-ink">{f.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand">
                      {openFaq === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="animate-[fade-in_0.3s_ease-out] pb-6 pr-12">
                      <p className="text-base text-ink-muted">{f.a}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta-dark relative overflow-hidden text-center">
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
        <div className="container-edit relative py-12 md:py-20">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> {cms.cta.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tighter text-white md:text-6xl">
              <RichHeading text={cms.cta.heading} />
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/70">
              {cms.cta.subheading}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                to="/contact"
                search={{ service: "diagnostic" }}
                className="btn-premium inline-flex h-12 items-center gap-1 min-[375px]:gap-1.5 whitespace-nowrap rounded-full px-3.5 min-[375px]:px-5 text-[11px] min-[360px]:text-xs min-[400px]:text-sm font-semibold text-white sm:h-14 sm:gap-2 sm:px-8 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  {cms.cta.button_text}{" "}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </span>
              </Link>
              <p className="text-xs text-white/50">
                {cms.cta.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
