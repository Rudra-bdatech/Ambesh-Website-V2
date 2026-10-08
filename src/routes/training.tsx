import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  GraduationCap,
  Layers,
  MapPin,
  Rocket,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { TypeLine } from "@/components/TypeLine";
import { TrainingLogo } from "@/components/TrainingLogos";
import { buildMeta, jsonLd, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { whatsappUrl, WA_MESSAGES } from "@/lib/wa";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { ParticleField } from "@/components/ParticleField";
import { usePageContent } from "@/hooks/use-page-content";
import { EXACT_DEFAULT_TRAINING_CONTENT } from "./admin/pages/training";
import { RichHeading } from "@/components/RichHeading";

export const Route = createFileRoute("/training")({
  head: () => {
    const m = buildMeta({
      path: "/training",
      title: "Corporate AI Training | India, UAE, Africa | Ambesh",
      description:
        "Hands-on corporate AI training for leadership, departments and professionals. Three formats. 5,000+ trained across 50+ organisations.",
      keywords:
        "corporate AI training India, leadership AI workshop, department AI training, AI workflow bootcamp, Ambesh Tiwari training",
    });
    return {
      ...m,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Corporate AI Training",
          provider: { "@type": "Person", name: "Ambesh Tiwari", url: SITE_URL },
          description:
            "Hands-on AI workshops for leadership, departments and professionals. Built around real work, not generic demos.",
          url: `${SITE_URL}/training`,
        }),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Training", path: "/training" },
          ]),
        ),
      ],
    };
  },
  component: TrainingPage,
});

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

function TrainingPage() {
  const cms = usePageContent("training", EXACT_DEFAULT_TRAINING_CONTENT);

  // Dynamic Hero Stats
  const heroStatsList = useMemo(() => {
    const s1 = parseStat(cms.hero.stat1_val, 5000, "", "+", 0);
    const s2 = parseStat(cms.hero.stat2_val, 50, "", "+", 0);
    const s3 = parseStat(cms.hero.stat3_val, 150, "", "+", 0);
    const s4 = parseStat(cms.hero.stat4_val, 11, "", "+", 0);
    const s5 = parseStat(cms.hero.stat5_val, 9.5, "", "", 1);

    return [
      { ...s1, l: cms.hero.stat1_label, icon: Users },
      { ...s2, l: cms.hero.stat2_label, icon: Building2 },
      { ...s3, l: cms.hero.stat3_label, icon: Rocket },
      { ...s4, l: cms.hero.stat4_label, icon: Layers },
      { ...s5, l: cms.hero.stat5_label, icon: Star },
    ];
  }, [cms.hero]);

  // Dynamic Formats
  const formatsList = useMemo(() => {
    return [
      {
        title: cms.formats.f1_title,
        tagline: cms.formats.f1_tagline,
        body: cms.formats.f1_body,
        bullets: [
          cms.formats.f1_point1,
          cms.formats.f1_point2,
          cms.formats.f1_point3,
          cms.formats.f1_point4,
        ].filter(Boolean),
      },
      {
        title: cms.formats.f2_title,
        tagline: cms.formats.f2_tagline,
        body: cms.formats.f2_body,
        bullets: [
          cms.formats.f2_point1,
          cms.formats.f2_point2,
          cms.formats.f2_point3,
          cms.formats.f2_point4,
        ].filter(Boolean),
      },
      {
        title: cms.formats.f3_title,
        tagline: cms.formats.f3_tagline,
        body: cms.formats.f3_body,
        bullets: [
          cms.formats.f3_point1,
          cms.formats.f3_point2,
          cms.formats.f3_point3,
          cms.formats.f3_point4,
        ].filter(Boolean),
      },
    ];
  }, [cms.formats]);

  // Dynamic Engagements
  const engagementsList = useMemo(() => {
    return [
      {
        name: cms.engagements.e1_name,
        location: cms.engagements.e1_location,
        format: cms.engagements.e1_format,
        tag: cms.engagements.e1_tag,
      },
      {
        name: cms.engagements.e2_name,
        location: cms.engagements.e2_location,
        format: cms.engagements.e2_format,
        tag: cms.engagements.e2_tag,
      },
      {
        name: cms.engagements.e3_name,
        location: cms.engagements.e3_location,
        format: cms.engagements.e3_format,
        tag: cms.engagements.e3_tag,
      },
    ];
  }, [cms.engagements]);

  // Dynamic Outcomes
  const outcomesList = useMemo(() => {
    return [
      cms.outcomes.outcome_1,
      cms.outcomes.outcome_2,
      cms.outcomes.outcome_3,
      cms.outcomes.outcome_4,
      cms.outcomes.outcome_5,
      cms.outcomes.outcome_6,
    ].filter(Boolean);
  }, [cms.outcomes]);

  // Dynamic Themes
  const themesList = useMemo(() => {
    return [
      { quote: cms.themes.t1_quote, body: cms.themes.t1_body },
      { quote: cms.themes.t2_quote, body: cms.themes.t2_body },
      { quote: cms.themes.t3_quote, body: cms.themes.t3_body },
    ];
  }, [cms.themes]);

  // Dynamic Industries
  const industriesList = useMemo(() => {
    return cms.industries.list
      ? cms.industries.list.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
  }, [cms.industries.list]);

  return (
    <div className="relative w-full bg-canvas min-h-screen" style={{ backgroundImage: "none" }}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-premium-side-gradient">
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
            <p className="eyebrow eyebrow-orange flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5" /> {cms.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80} eager>
            <h1 className="mt-5 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink dark:text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
              <RichHeading text={cms.hero.heading} />
            </h1>
          </Reveal>
          <Reveal delay={150} eager>
            <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-ink-soft md:text-xl">
              {cms.hero.subheading}
            </p>
          </Reveal>
          <Reveal delay={220} eager>
            <div className="mt-10 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
              <Link
                to="/contact"
                search={{ service: "training" }}
                className="btn-premium inline-flex h-12 items-center justify-center rounded-full px-2 min-[360px]:px-4 md:px-6 text-[9.5px] min-[340px]:text-[10px] min-[360px]:text-[11px] min-[390px]:text-xs sm:text-sm md:text-[15px] font-semibold whitespace-nowrap w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-1 min-[360px]:gap-2">
                  {cms.hero.primary_btn_text}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </span>
              </Link>
              <a
                href="#formats"
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-canvas/80 px-2 min-[360px]:px-4 md:px-6 text-[9.5px] min-[340px]:text-[10px] min-[360px]:text-[11px] min-[390px]:text-xs sm:text-sm md:text-[15px] font-semibold text-ink backdrop-blur transition-all hover:border-ink/40 hover:bg-canvas whitespace-nowrap w-full sm:w-auto"
              >
                {cms.hero.secondary_btn_text}
              </a>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-5">
            {heroStatsList.map((s, i) => (
              <Reveal key={`${s.l}-${i}`} delay={60 + i * 60} eager>
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
                      {s.isCustomText ? (
                        s.rawText
                      ) : (
                        <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
                      )}
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
      </section>

      {/* FORMATS */}
      <section id="formats" className="relative overflow-hidden bg-canvas py-14 md:py-20">
        <div className="container-edit relative">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <p className="eyebrow flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> {cms.formats.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] md:text-5xl text-ink">
                <RichHeading text={cms.formats.heading} />
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-5">
              <p className="text-lg text-ink-soft">
                {cms.formats.subheading}
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {formatsList.map((p, i) => {
              return (
                <Reveal key={p.title} delay={100}>
                  <div className="custom-theme-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-8">
                    <div
                      className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                      style={{ background: "var(--accent-soft)" }}
                      aria-hidden
                    />
                    <div className="icon-box flex h-12 w-12 items-center justify-center rounded-xl border border-rule">
                      <TrainingLogo variant={i} className="h-8 w-8 md:h-9 md:w-9" />
                    </div>
                    <h3 className="mt-7 font-display text-[1.65rem] font-extrabold tracking-[-0.025em] leading-[1.15] text-ink md:text-[1.85rem]">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-serif text-base italic text-ink-soft">{p.tagline}</p>
                    <p className="mt-4 text-[15px] leading-[1.65] text-ink-soft">{p.body}</p>
                    <ul className="mt-6 space-y-2.5">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <span className="problem-tick mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* NAMED ENGAGEMENTS */}
      <section className="relative isolate overflow-hidden bg-premium-side-gradient py-14 md:py-20">
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
              <Star className="h-3.5 w-3.5" /> {cms.engagements.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.03em] md:text-5xl text-ink">
              <RichHeading text={cms.engagements.heading} />
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {engagementsList.map((e) => (
              <Reveal key={e.name}>
                <article className="custom-theme-card group flex h-full flex-col rounded-2xl p-7">
                  <span className="inline-flex w-fit items-center rounded-full border border-rule bg-sand px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-soft">
                    {e.tag}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.02em] text-ink">
                    {e.name}
                  </h3>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    {e.location}
                  </p>
                  <div className="mt-auto border-t border-rule pt-5">
                    <p className="text-sm text-ink-soft">{e.format}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section id="outcomes" className="relative overflow-hidden bg-canvas py-14 md:py-20">
        <div className="container-edit relative">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5" /> {cms.outcomes.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.03em] md:text-5xl text-ink">
              <RichHeading text={cms.outcomes.heading} />
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {outcomesList.map((o) => (
              <Reveal key={o} delay={60}>
                <div className="custom-theme-card-static flex items-start gap-4 rounded-2xl p-5">
                  <span className="problem-tick mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-base text-ink">{o}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THEMES */}
      <section className="relative isolate overflow-hidden bg-premium-side-gradient py-14 md:py-20">
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
              <Sparkles className="h-3.5 w-3.5" /> {cms.themes.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.03em] md:text-5xl text-ink">
              <RichHeading text={cms.themes.heading} />
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {themesList.map((t) => (
              <Reveal key={t.quote}>
                <figure className="custom-theme-card-static flex h-full flex-col rounded-2xl p-7">
                  <blockquote className="font-serif text-xl italic leading-snug text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-rule pt-5 text-[15px] leading-[1.65] text-ink-soft">
                    {t.body}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-ink-muted">
              <Star className="h-4 w-4" style={{ fill: "var(--accent)", color: "var(--accent)" }} />
              <span>
                {cms.themes.footer_nps}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="relative overflow-hidden bg-canvas py-14 md:py-20">
        <div className="container-edit relative">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> {cms.industries.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.03em] md:text-5xl text-ink">
              <RichHeading text={cms.industries.heading} />
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-12 flex flex-wrap gap-2.5">
              {industriesList.map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-rule bg-canvas px-5 py-2.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-sm"
                >
                  {i}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
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
        <div className="container-edit relative py-14 md:py-20">
          <Reveal>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/50">
              <Sparkles className="mr-2 inline h-3 w-3" />
              {cms.cta.eyebrow}
            </p>
            <h2 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white md:text-7xl">
              <RichHeading text={cms.cta.heading} />
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-[1.6] text-white/70 md:text-xl">
              {cms.cta.subheading}
            </p>
            <div className="mt-10 flex flex-row items-center gap-1.5 sm:gap-3">
              <Link
                to="/contact"
                search={{ service: "training" }}
                className="btn-premium group inline-flex h-11 flex-1 items-center justify-center gap-1 min-[375px]:gap-1.5 whitespace-nowrap rounded-full px-2 min-[375px]:px-3 text-[11px] min-[360px]:text-xs min-[400px]:text-sm font-semibold text-white transition-all duration-300 sm:h-14 sm:flex-none sm:gap-2 sm:justify-start sm:px-8 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  {cms.cta.btn_text}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </span>
              </Link>
              <a
                href={whatsappUrl(WA_MESSAGES.training)}
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
                <span className="sm:hidden">{cms.cta.wa_btn_text}</span>
                <TypeLine
                  text={cms.cta.wa_btn_text}
                  loop
                  className="hidden whitespace-nowrap sm:block sm:min-w-[16ch]"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
