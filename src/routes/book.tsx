import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, type FormEvent } from "react";
import { ArrowRight, BookOpen, Mail, Award, ShoppingBag, Users, List, User } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { Book3D } from "@/components/Book3D";
import { buildMeta, jsonLd, breadcrumbSchema, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { submitLeadToGHL } from "@/lib/ghl";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { usePageContent } from "@/hooks/use-page-content";
import { getPageContent } from "@/lib/supabase";
import { EXACT_DEFAULT_BOOK_CONTENT } from "@/lib/cms-defaults";
import { RichHeading } from "@/components/RichHeading";

export const Route = createFileRoute("/book")({
  loader: async () => {
    return await getPageContent("book");
  },
  head: () => {
    const m = buildMeta({
      path: "/book",
      title: "Accelerate with AI - Book by Ambesh Tiwari",
      description:
        "Accelerate with AI: a simple book for a complicated world. By Ambesh Tiwari. Amazon bestseller. Available on Kindle and in print.",
      keywords:
        "Accelerate with AI book, Ambesh Tiwari book, AI book for professionals, AI book India, AI for business owners book",
      ogType: "book",
    });
    return {
      ...m,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Book",
          name: "Accelerate with AI",
          alternateName: "Accelerate with AI: A Simple Book for a Complicated World",
          author: { "@type": "Person", name: "Ambesh Tiwari", url: SITE_URL },
          inLanguage: "en",
          datePublished: "2023-11-12",
          bookFormat: ["https://schema.org/EBook", "https://schema.org/Paperback"],
          image: DEFAULT_OG_IMAGE,
          url: `${SITE_URL}/book`,
          description:
            "A practical guide for business owners, founders and professionals on using AI to scale their work.",
          offers: {
            "@type": "Offer",
            url: "https://www.amazon.in/dp/B0CN8L7ZWP",
            availability: "https://schema.org/InStock",
            priceCurrency: "INR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.6",
            reviewCount: "120",
            bestRating: "5",
            worstRating: "1",
          },
        }),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book", path: "/book" },
          ]),
        ),
      ],
    };
  },
  component: BookPage,
});

const pressLogos = [
  { name: "Forbes India", src: "/logos/forbes-india.svg", className: "h-5 sm:h-8" },
  { name: "Mid-day", src: "/logos/mid-day.png", className: "h-5 sm:h-8" },
  { name: "Disrupt", src: "/logos/disrupt.png", className: "h-10 sm:h-14" },
  { name: "Navbharat Times", src: "/logos/navbharat-times.png", className: "h-5 sm:h-8" },
  { name: "Dailyhunt", src: "/logos/dailyhunt-full.png", className: "h-8 sm:h-16" },
  { name: "Thrive Global", src: "/logos/thrive-global.svg", className: "h-4 sm:h-6" },
  { name: "NewsTrack", src: "/logos/newstrack.jpg", className: "h-5 sm:h-8", solid: true },
];

function BookPage() {
  const loaderData = Route.useLoaderData();
  const content = usePageContent("book", EXACT_DEFAULT_BOOK_CONTENT, loaderData);

  const hero = content.hero || EXACT_DEFAULT_BOOK_CONTENT.hero;
  const press = content.press || EXACT_DEFAULT_BOOK_CONTENT.press;
  const audiencesSec = content.audiences || EXACT_DEFAULT_BOOK_CONTENT.audiences;
  const takeawaysSec = content.takeaways || EXACT_DEFAULT_BOOK_CONTENT.takeaways;
  const endorsementsSec = content.endorsements || EXACT_DEFAULT_BOOK_CONTENT.endorsements;
  const authorSec = content.author || EXACT_DEFAULT_BOOK_CONTENT.author;
  const chapterCta = content.chapter_cta || EXACT_DEFAULT_BOOK_CONTENT.chapter_cta;

  const audienceList = useMemo(
    () => [
      {
        t: audiencesSec.aud1_title || "Business owners and founders",
        b: audiencesSec.aud1_desc || "Who know AI matters but do not know where to start...",
        c: "from-violet to-pink",
      },
      {
        t: audiencesSec.aud2_title || "Team leads and managers",
        b: audiencesSec.aud2_desc || "Who need to help their teams adopt AI without disrupting...",
        c: "from-pink to-amber",
      },
      {
        t: audiencesSec.aud3_title || "Professionals building their career",
        b: audiencesSec.aud3_desc || "Who want to be the person on their team who actually understands AI...",
        c: "from-amber to-cyan",
      },
    ],
    [audiencesSec],
  );

  const takeawayList = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      .map((num) => takeawaysSec[`item_${num}` as keyof typeof takeawaysSec])
      .filter(Boolean) as string[];
  }, [takeawaysSec]);

  const featuredEndorsement = useMemo(
    () => ({
      name: endorsementsSec.featured_name || "William Koehler, Ph.D.",
      role:
        endorsementsSec.featured_role ||
        "Dean, Sloane School of Business & Communication, Regis College, Massachusetts, USA",
      q: endorsementsSec.featured_quote || "",
      initials: endorsementsSec.featured_initials || "WK",
    }),
    [endorsementsSec],
  );

  const endorsementList = useMemo(
    () => [
      {
        name: endorsementsSec.end1_name || "Madhu C Dutta-Koehler, PhD, MIT",
        role: endorsementsSec.end1_role || "Founder and President, The Greener Health Corp.",
        q: endorsementsSec.end1_quote || "",
      },
      {
        name: endorsementsSec.end2_name || "Aditya Lohia",
        role: endorsementsSec.end2_role || "Executive Director, Lohia Industries (P) Ltd.",
        q: endorsementsSec.end2_quote || "",
      },
      {
        name: endorsementsSec.end3_name || "Shyam Sunder",
        role: endorsementsSec.end3_role || "AI Researcher, CSIR-CEERI, Pilani",
        q: endorsementsSec.end3_quote || "",
      },
      {
        name: endorsementsSec.end4_name || "Prabhat Sinha",
        role: endorsementsSec.end4_role || "IT Expert, Entrepreneur & Best-selling Author",
        q: endorsementsSec.end4_quote || "",
      },
    ],
    [endorsementsSec],
  );

  async function onChapterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (new FormData(e.currentTarget).get("email") as string) || "";

    try {
      if (typeof submitLeadToGHL === "function") {
        await submitLeadToGHL({
          data: {
            name: email.split("@")[0] || "Book reader",
            email,
            serviceLabel: "Book - Chapter 1 request",
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
          },
        });
      }
    } catch (error) {
      console.warn("GHL sync notice:", error);
    }

    const recipient = chapterCta.recipient_email || "hello@ambesh.com";
    window.location.href = `mailto:${recipient}?subject=Send%20me%20Chapter%201&body=Please%20send%20Chapter%201%20to%20${encodeURIComponent(email)}`;
  }

  return (
    <div className="book-page">
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
        <div className="container-edit relative grid items-center gap-16 pt-10 pb-16 md:grid-cols-12 md:gap-16 md:pt-14 md:pb-20">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" /> {hero.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 font-display text-[2.4rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl lg:text-[4rem]">
                <RichHeading
                  text={hero.heading}
                  defaultContent={
                    <>
                      Accelerate <span className="text-gradient-brand">With AI.</span>
                    </>
                  }
                />
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 font-serif text-2xl italic leading-snug text-ink-soft md:text-3xl">
                {hero.subheading_italic}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
                {hero.description}
              </p>
            </Reveal>
            <Reveal delay={400} className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-rule px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider sm:px-4 sm:text-xs"
                style={{ color: "var(--accent)" }}
              >
                <Award className="h-3.5 w-3.5" /> {hero.badge_text}
              </span>
              <span className="text-xs text-ink-muted sm:text-sm">
                {hero.badge_meta}
              </span>
            </Reveal>
            <Reveal delay={500} className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <a
                href={hero.kindle_btn_url}
                target="_blank"
                rel="noreferrer"
                className="btn-premium inline-flex h-12 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold sm:h-14 sm:px-8 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {hero.kindle_btn_text} <ArrowRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href={hero.physical_btn_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-canvas px-4 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/40 sm:h-14 sm:px-8 sm:text-base"
              >
                <ShoppingBag className="h-4 w-4" /> {hero.physical_btn_text}
              </a>
            </Reveal>
          </div>
          <Reveal delay={300} className="md:col-span-5 md:mt-20">
            <div className="origin-center md:mb-12 md:scale-[1.15] lg:scale-125">
              <Book3D progress={0} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOGO BAR */}
      <section className="relative bg-canvas py-6 featured-bar">
        <div className="container-edit">
          <Reveal eager>
            <p className="text-center text-xs uppercase tracking-widest text-ink-muted">
              {press.heading}
            </p>
          </Reveal>
          <div className="mt-4">
            <Marquee
              fade={32}
              speed={60}
              items={pressLogos.map((l) => (
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

      {/* WHO IT'S FOR */}
      <section className="relative isolate overflow-hidden bg-premium-side-gradient py-16">
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
              <Users className="h-3.5 w-3.5" /> {audiencesSec.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tighter md:text-6xl">
              <RichHeading
                text={audiencesSec.heading}
                defaultContent={
                  <>
                    Written for people who{" "}
                    <span className="text-gradient-brand animate-gradient">do real work.</span>
                  </>
                }
              />
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {audienceList.map((x) => (
              <Reveal key={x.t} delay={100}>
                <div className="custom-theme-card group h-full rounded-3xl p-8">
                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${x.c}`} />
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight">{x.t}</h3>
                  <p className="mt-4 text-base text-ink-muted">{x.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THE BOOK COVERS */}
      <section className="relative bg-canvas py-16">
        <div className="container-edit relative">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <List className="h-3.5 w-3.5" /> {takeawaysSec.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tighter md:text-6xl">
              <RichHeading
                text={takeawaysSec.heading}
                defaultContent={
                  <>
                    10 things this book will{" "}
                    <span className="text-gradient-brand animate-gradient">teach you.</span>
                  </>
                }
              />
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-muted">{takeawaysSec.subheading}</p>
          </Reveal>
          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {takeawayList.map((t, i) => (
              <Reveal key={t + i} delay={60}>
                <div className="custom-theme-card group flex items-start gap-5 rounded-2xl p-5">
                  <span className="font-mono text-sm text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-semibold tracking-tight transition-colors group-hover:text-violet">
                    {t}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT EXPERTS SAY */}
      <section className="relative isolate overflow-hidden bg-premium-side-gradient py-16">
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
              <Award className="h-3.5 w-3.5" /> {endorsementsSec.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tighter md:text-6xl">
              <RichHeading
                text={endorsementsSec.heading}
                defaultContent={
                  <>
                    The people who{" "}
                    <span className="text-gradient-brand animate-gradient">read it first.</span>
                  </>
                }
              />
            </h2>
          </Reveal>

          {/* Featured endorsement */}
          <Reveal delay={150} className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-rule bg-canvas p-10 shadow-lift md:p-14">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-muted">
                {endorsementsSec.featured_label || "Featured endorsement"}
              </p>
              <p className="mt-6 font-serif text-2xl italic leading-snug text-ink md:text-3xl">
                "{featuredEndorsement.q}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand font-mono text-sm font-bold text-white shrink-0">
                  {featuredEndorsement.initials}
                </div>
                <div>
                  <p className="text-lg font-bold tracking-tight">{featuredEndorsement.name}</p>
                  <p className="text-sm text-ink-muted">{featuredEndorsement.role}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Other endorsements */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {endorsementList.map((e) => (
              <Reveal key={e.name} delay={80}>
                <div className="custom-theme-card h-full rounded-3xl p-8">
                  <p className="font-serif text-lg italic leading-snug text-ink">"{e.q}"</p>
                  <div className="mt-6">
                    <p className="text-base font-bold tracking-tight">{e.name}</p>
                    <p className="text-sm text-ink-muted">{e.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE AUTHOR */}
      <section className="relative bg-canvas py-16">
        <div className="container-edit relative">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <Reveal className="md:col-span-4">
              <p className="eyebrow flex items-center gap-2">
                <User className="h-3.5 w-3.5" /> {authorSec.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={150} className="md:col-span-8">
              <div className="text-2xl font-medium leading-relaxed tracking-tight text-ink md:text-3xl">
                <RichHeading
                  text={authorSec.bio_text}
                  defaultContent={
                    <>
                      Ambesh Tiwari is the founder of BDA Technologies, host of the{" "}
                      <em className="font-serif italic">Inspire with Ambesh</em> podcast, and an AI
                      trainer who has worked with{" "}
                      <span className="text-gradient-brand animate-gradient">5,000+ professionals</span>{" "}
                      across 50+ organisations in India, UAE and Africa. He blends an engineering
                      background with an MBA in International Marketing, a decade of business building,
                      and a practical, no-hype approach to AI that comes from using it in his own work
                      every day.
                    </>
                  }
                />
              </div>
              <Link
                to={authorSec.link_url || "/about"}
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-violet hover:text-pink"
              >
                {authorSec.link_text} <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative isolate overflow-hidden bg-premium-side-gradient pb-24 pt-16">
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
            <div className="cta-dark overflow-hidden rounded-3xl p-12 md:p-16">
              <div className="grid gap-10 md:grid-cols-2 md:items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
                    {chapterCta.tag}
                  </p>
                  <h3 className="mt-4 text-4xl font-extrabold leading-tight tracking-tighter text-white md:text-5xl">
                    <RichHeading
                      text={chapterCta.heading}
                      defaultContent={
                        <>
                          Get <span className="text-gradient-brand animate-gradient">Chapter 1</span> on
                          us.
                        </>
                      }
                    />
                  </h3>
                  <p className="mt-4 text-white/70">
                    {chapterCta.description}
                  </p>
                  <Link
                    to={chapterCta.training_link_url || "/training"}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
                  >
                    <BookOpen className="h-4 w-4" /> {chapterCta.training_link_text}
                  </Link>
                </div>
                <form onSubmit={onChapterSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={chapterCta.email_placeholder || "you@company.com"}
                    className="h-14 flex-1 rounded-full border border-white/15 bg-white/5 px-6 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="btn-premium inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {chapterCta.btn_text}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
