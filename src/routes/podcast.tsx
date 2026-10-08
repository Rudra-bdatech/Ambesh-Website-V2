import { useEffect, useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, Play, Mail, Mic, Star, MessageCircle, User } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buildMeta, jsonLd, breadcrumbSchema, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { usePageContent } from "@/hooks/use-page-content";
import { getPageContent } from "@/lib/supabase";
import { EXACT_DEFAULT_PODCAST_CONTENT } from "@/lib/cms-defaults";
import { RichHeading } from "@/components/RichHeading";

export const Route = createFileRoute("/podcast")({
  loader: async () => {
    return await getPageContent("podcast");
  },
  head: () => {
    const m = buildMeta({
      path: "/podcast",
      title: "Inspire with Ambesh - The Ambesh Tiwari Show Podcast",
      description:
        "Conversations with founders, operators and builders about ambition, decisions, setbacks, and what it takes to build something real. Hosted by Ambesh Tiwari.",
      keywords:
        "Ambesh Tiwari Show podcast, Inspire with Ambesh, AI podcast India, founder podcast India, business podcast India",
    });
    return {
      ...m,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "PodcastSeries",
          name: "Inspire with Ambesh",
          alternateName: "The Ambesh Tiwari Show",
          url: `${SITE_URL}/podcast`,
          image: DEFAULT_OG_IMAGE,
          inLanguage: "en",
          description:
            "Conversations with founders, operators and builders. No predictions. No hot takes. Just field notes from people doing the work.",
          author: { "@type": "Person", name: "Ambesh Tiwari", url: SITE_URL },
        }),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Podcast", path: "/podcast" },
          ]),
        ),
      ],
    };
  },
  component: PodcastPage,
});

function useResponsiveBarCount() {
  const [count, setCount] = useState(60);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCount(w < 480 ? 30 : w < 768 ? 42 : w < 1024 ? 50 : 60);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

function Waveform() {
  const barCount = useResponsiveBarCount();
  const bars = Array.from({ length: barCount }, (_, i) => {
    const h = 30 + Math.sin(i * 0.45) * 25 + Math.random() * 30;
    const dur = 0.9 + Math.sin(i * 0.7) * 0.35 + Math.random() * 0.3;
    return { h, dur };
  });
  return (
    <div className="flex h-14 w-full items-center justify-between overflow-hidden sm:h-20 md:h-32">
      {bars.map((b, i) => (
        <div
          key={i}
          className="eq-bar w-1 flex-none rounded-full bg-gradient-brand sm:w-1.5"
          style={{
            height: `${b.h}%`,
            animationDelay: `${i * 45}ms`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function PodcastPage() {
  const loaderData = Route.useLoaderData();
  const cms = usePageContent("podcast", EXACT_DEFAULT_PODCAST_CONTENT, loaderData);

  // Dynamic Platforms
  const platformLinks = useMemo(() => {
    return [
      { name: "Spotify", color: "bg-[#1DB954]", href: cms.platforms.spotify_url || "#" },
      { name: "Apple Podcasts", color: "bg-[#A855F7]", href: cms.platforms.apple_url || "#" },
      { name: "YouTube", color: "bg-[#FF0000]", href: cms.platforms.youtube_url || "#" },
      { name: "JioSaavn", color: "bg-[#1DB954]", href: cms.platforms.jiosaavn_url || "#" },
    ];
  }, [cms.platforms]);

  // Dynamic Featured Episodes
  const episodesList = useMemo(() => {
    return [
      {
        title: cms.featured.ep1_title,
        guest: cms.featured.ep1_guest,
        blurb: cms.featured.ep1_blurb,
        link: cms.featured.ep1_link || "#",
        color: "from-violet to-pink",
      },
      {
        title: cms.featured.ep2_title,
        guest: cms.featured.ep2_guest,
        blurb: cms.featured.ep2_blurb,
        link: cms.featured.ep2_link || "#",
        color: "from-pink to-amber",
      },
      {
        title: cms.featured.ep3_title,
        guest: cms.featured.ep3_guest,
        blurb: cms.featured.ep3_blurb,
        link: cms.featured.ep3_link || "#",
        color: "from-amber to-cyan",
      },
    ];
  }, [cms.featured]);

  // Dynamic Topics List
  const topicsList = useMemo(() => {
    return cms.topics.list
      ? cms.topics.list.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
  }, [cms.topics.list]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden premium-canvas bg-premium-side-gradient">
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <GridVignetteBackground
          className="hidden dark:block opacity-40"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="container-edit relative grid gap-8 pt-10 pb-8 md:grid-cols-12 md:gap-16 md:pt-16 md:pb-16">
          <div className="md:col-span-8">
            <Reveal eager>
              <p className="eyebrow flex items-center gap-2">
                <Headphones className="h-3.5 w-3.5" /> {cms.hero.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={100} eager>
              <h1 className="mt-4 text-[2.2rem] font-extrabold leading-[0.95] tracking-tighter sm:mt-6 sm:text-5xl md:text-7xl lg:text-[7rem] text-ink">
                <RichHeading text={cms.hero.heading} />
              </h1>
            </Reveal>
            <Reveal delay={250} eager>
              <p className="mt-3 text-base text-ink-muted sm:mt-6 sm:max-w-xl sm:text-lg">
                {cms.hero.subheading}
              </p>
            </Reveal>
            <Reveal delay={350} eager>
              <p className="mt-3 max-w-xl font-serif italic text-ink-muted sm:mt-4">
                {cms.hero.pull_quote}
              </p>
            </Reveal>
            <Reveal delay={450} eager className="mt-5 md:mt-10">
              <Waveform />
            </Reveal>
          </div>
          <Reveal delay={200} eager className="md:col-span-4">
            <div className="relative flex w-full flex-col items-center justify-center rounded-3xl bg-gradient-brand px-6 py-5 md:py-6 lg:py-8 text-white shadow-glow animate-gradient lg:aspect-square">
              <div
                className="absolute inset-0 rounded-3xl opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <Headphones className="relative h-10 w-10 sm:h-12 sm:w-12" />
              <p className="relative mt-4 text-5xl font-extrabold tracking-tighter sm:text-6xl">
                {cms.hero.card_number}
              </p>
              <p className="relative mt-1 px-6 text-center text-xs text-white/80">
                {cms.hero.card_label}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="relative isolate overflow-hidden border-y border-rule py-12">
        <div className="container-edit relative flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="eyebrow flex items-center gap-2 w-full md:w-auto">
            <Play className="h-3.5 w-3.5" /> {cms.platforms.eyebrow}
          </p>
          {platformLinks.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target={p.href !== "#" ? "_blank" : undefined}
              rel={p.href !== "#" ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2 rounded-full border border-rule px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-ink hover:text-canvas"
            >
              <span className={`h-2 w-2 rounded-full ${p.color}`} />
              {p.name}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED EPISODES */}
      <section className="relative isolate overflow-hidden">
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <GridVignetteBackground
          className="hidden dark:block opacity-40"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="container-edit relative py-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <Star className="h-3.5 w-3.5" /> {cms.featured.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tighter sm:text-4xl md:text-6xl text-ink">
              <RichHeading text={cms.featured.heading} />
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              {cms.featured.subheading}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
            {episodesList.map((e) => (
              <Reveal key={e.title} delay={80}>
                <a
                  href={e.link}
                  target={e.link !== "#" ? "_blank" : undefined}
                  rel={e.link !== "#" ? "noopener noreferrer" : undefined}
                  className="custom-theme-card group flex h-full flex-col rounded-3xl p-6"
                >
                  <div
                    className={`relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${e.color} text-white shadow-glow`}
                  >
                    <Play className="relative h-9 w-9 fill-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-violet text-ink">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-ink">with {e.guest}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{e.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet">
                    Listen
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={250} className="mt-12">
            <a
              href={cms.featured.all_episodes_url || "#"}
              target={cms.featured.all_episodes_url !== "#" ? "_blank" : undefined}
              rel={cms.featured.all_episodes_url !== "#" ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2 text-base font-semibold text-ink hover:text-violet transition-colors"
            >
              {cms.featured.all_episodes_text}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE TALK ABOUT */}
      <section className="relative isolate overflow-hidden">
        <div className="container-edit relative py-16">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="eyebrow flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5" /> {cms.topics.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-tighter sm:text-4xl md:text-5xl text-ink">
                <RichHeading text={cms.topics.heading} />
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-7">
              <p className="text-lg text-ink-muted leading-relaxed">
                {cms.topics.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {topicsList.map((t) => (
                  <Reveal key={t} delay={40}>
                    <span className="inline-flex items-center rounded-full border border-rule bg-canvas px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-violet/40 hover:text-violet">
                      {t}
                    </span>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT THE HOST */}
      <section className="relative isolate overflow-hidden">
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <GridVignetteBackground
          className="hidden dark:block opacity-40"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="container-edit relative py-16">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            <Reveal className="md:col-span-5">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-brand animate-gradient shadow-glow">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative flex h-full w-full flex-col items-center justify-center text-white">
                  <Mic className="h-12 w-12" />
                  <p className="mt-6 text-[6rem] font-black leading-none tracking-tighter sm:text-[8rem]">
                    AT
                  </p>
                  <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/80">
                    Your Host
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className="md:col-span-7">
              <p className="eyebrow flex items-center gap-2">
                <User className="h-3.5 w-3.5" /> {cms.host.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-tighter sm:text-4xl md:text-5xl text-ink">
                <RichHeading text={cms.host.heading} />
              </h2>
              <p className="mt-6 text-lg text-ink-muted leading-relaxed">
                {cms.host.body}
              </p>
              <Link
                to="/about"
                className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-ink hover:text-violet transition-colors"
              >
                {cms.host.btn_text}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative isolate overflow-hidden py-16">
        <div className="container-edit relative">
          <Reveal className="relative overflow-hidden rounded-3xl border border-rule bg-canvas p-8 md:p-16">
            <div className="absolute inset-0 tex-dots-soft opacity-60" aria-hidden />
            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" /> {cms.newsletter.eyebrow}
                </p>
                <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl text-ink">
                  <RichHeading text={cms.newsletter.heading} />
                </h3>
                <p className="mt-4 text-ink-muted leading-relaxed">
                  {cms.newsletter.body}
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (new FormData(e.currentTarget).get("email") as string) || "";
                  window.location.href = `mailto:hello@ambesh.com?subject=Subscribe%20to%20podcast%20updates&body=Subscribe%20${encodeURIComponent(email)}`;
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={cms.newsletter.email_placeholder}
                  className="h-14 flex-1 rounded-full border border-rule bg-canvas px-6 text-ink placeholder:text-ink-muted/60 focus:border-violet focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-premium inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold text-white"
                >
                  <Mail className="h-4 w-4" /> {cms.newsletter.btn_text}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING - GUEST PITCH */}
      <section className="relative isolate overflow-hidden">
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <GridVignetteBackground
          className="hidden dark:block opacity-40"
          x={50}
          y={50}
          intensity={100}
          size={48}
          horizontalVignetteSize={80}
          verticalVignetteSize={60}
        />
        <div className="container-edit relative py-16 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tighter sm:text-4xl md:text-6xl text-ink">
              <RichHeading text={cms.pitch.heading} />
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed">
              {cms.pitch.subheading}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <Link
              to="/contact"
              search={{ type: "podcast" }}
              className="btn-premium mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold text-white"
            >
              <Mic className="h-4 w-4" /> {cms.pitch.btn_text}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
