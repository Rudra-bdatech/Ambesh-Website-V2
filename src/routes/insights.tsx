import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { buildMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";
import { BookOpen, Search, Calendar, Clock, ArrowRight, Mail } from "lucide-react";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { usePageContent } from "@/hooks/use-page-content";
import { getPageContent } from "@/lib/supabase";
import { EXACT_DEFAULT_INSIGHTS_CONTENT } from "@/lib/cms-defaults";
import { RichHeading } from "@/components/RichHeading";
import { submitLeadToGHL } from "@/lib/ghl";

export const Route = createFileRoute("/insights")({
  loader: async () => {
    return await getPageContent("insights");
  },
  head: () => {
    const m = buildMeta({
      path: "/insights",
      title: "Insights & Articles | Ambesh Tiwari",
      description:
        "Essays and case guides on delegation, operational design, workflow automation, and practical AI adoption for founder-led businesses.",
      keywords:
        "business systems blog, business scaling articles, founder dependency, SOP workflows, corporate AI adoption",
    });
    return {
      ...m,
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
        ),
      ],
    };
  },
  component: InsightsPage,
});

const categories = ["All", "Systems", "AI & Tech", "Strategy"] as const;
type Category = (typeof categories)[number];

interface Article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: Exclude<Category, "All">;
  slug: string;
}

function InsightsPage() {
  const loaderData = Route.useLoaderData();
  const content = usePageContent("insights", EXACT_DEFAULT_INSIGHTS_CONTENT, loaderData);

  const hero = content.hero || EXACT_DEFAULT_INSIGHTS_CONTENT.hero;
  const articlesSec = content.articles || EXACT_DEFAULT_INSIGHTS_CONTENT.articles;
  const newsletter = content.newsletter || EXACT_DEFAULT_INSIGHTS_CONTENT.newsletter;

  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const articleList = useMemo<Article[]>(() => {
    return [
      {
        title: articlesSec.art1_title || "Why Your Business is Stuck: The Founder Dependency Trap",
        excerpt:
          articlesSec.art1_excerpt ||
          "If every decision, client issue, and operational query flows through you, you haven't built a company - you've built a high-paying job. Here is how to step out of the loop.",
        date: articlesSec.art1_date || "July 12, 2026",
        readTime: articlesSec.art1_read_time || "6 min read",
        category: (articlesSec.art1_category as Exclude<Category, "All">) || "Systems",
        slug: articlesSec.art1_slug || "founder-dependency-trap",
      },
      {
        title:
          articlesSec.art2_title ||
          "Pragmatic AI: When to Use LLMs (And When to Avoid Them)",
        excerpt:
          articlesSec.art2_excerpt ||
          "Most corporate AI implementations fail because leaders attempt to automate complex reasoning before stabilizing basic workflows. Let's look at the real opportunity.",
        date: articlesSec.art2_date || "June 28, 2026",
        readTime: articlesSec.art2_read_time || "8 min read",
        category: (articlesSec.art2_category as Exclude<Category, "All">) || "AI & Tech",
        slug: articlesSec.art2_slug || "pragmatic-ai-use-cases",
      },
      {
        title:
          articlesSec.art3_title ||
          "The 90-Day Strategy Sprint: Aligning Team Workflows",
        excerpt:
          articlesSec.art3_excerpt ||
          "How to translate long-term goals into clear, department-level weekly actions that teams can execute autonomously without constant leadership check-ins.",
        date: articlesSec.art3_date || "May 15, 2026",
        readTime: articlesSec.art3_read_time || "5 min read",
        category: (articlesSec.art3_category as Exclude<Category, "All">) || "Strategy",
        slug: articlesSec.art3_slug || "90-day-strategy-sprint",
      },
      {
        title:
          articlesSec.art4_title ||
          "SOPs That Sell: Writing Workflows Your Team Will Actually Use",
        excerpt:
          articlesSec.art4_excerpt ||
          "SOPs languish in shared drives because they are written like compliance manuals. Here is a framework for creating action-oriented guides that drive consistency.",
        date: articlesSec.art4_date || "April 02, 2026",
        readTime: articlesSec.art4_read_time || "7 min read",
        category: (articlesSec.art4_category as Exclude<Category, "All">) || "Systems",
        slug: articlesSec.art4_slug || "writing-useful-sops",
      },
    ];
  }, [articlesSec]);

  const filteredArticles = useMemo(() => {
    return articleList.filter((article) => {
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articleList, selectedCategory, searchQuery]);

  async function onNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (new FormData(e.currentTarget).get("email") as string) || "";

    try {
      if (typeof submitLeadToGHL === "function") {
        await submitLeadToGHL({
          data: {
            name: email.split("@")[0] || "Insights Reader",
            email,
            serviceLabel: "Newsletter - Private Letter Signup",
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
          },
        });
      }
    } catch (error) {
      console.warn("GHL sync notice:", error);
    }

    setSubscribed(true);
    const recipient = newsletter.recipient_email || "hello@ambesh.com";
    window.location.href = `mailto:${recipient}?subject=Subscribe%20to%20Private%20Letter&body=Please%20add%20${encodeURIComponent(email)}%20to%20the%20newsletter%20list.`;
  }

  return (
    <>
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
              <BookOpen className="h-3.5 w-3.5" /> {hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
              <RichHeading
                text={hero.heading}
                defaultContent={
                  <>
                    Systems, scaling, and{" "}
                    <span className="font-serif italic font-medium text-gradient-brand animate-gradient">
                      practical AI leverage.
                    </span>
                  </>
                }
              />
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-ink-soft">
              {hero.description}
            </p>
          </Reveal>

          {/* Search and Filters */}
          <Reveal delay={150}>
            <div className="mt-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between border-b border-rule pb-8">
              {/* Category Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                      selectedCategory === cat
                        ? "bg-gradient-brand text-canvas shadow-lift"
                        : "border border-rule bg-canvas text-ink-soft hover:bg-sand"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full max-w-sm">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <input
                  type="text"
                  placeholder={hero.search_placeholder || "Search articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-rule bg-canvas py-2 pl-9 pr-4 text-xs text-ink outline-none focus:border-ink/30 focus:bg-canvas transition-colors"
                />
              </div>
            </div>
          </Reveal>

          <div className="insights-card-grid mt-12 grid gap-6 md:grid-cols-2">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Reveal key={article.slug} delay={100}>
                  <article className="custom-theme-card group flex h-full flex-col justify-between rounded-2xl p-7">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full border border-rule bg-sand px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-soft">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-ink-muted">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                      <h2 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.025em] text-ink leading-[1.2] group-hover:text-accent transition-colors">
                        {article.title}
                      </h2>
                      <p className="mt-4 text-[15px] leading-[1.65] text-ink-soft">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-rule pt-5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                        Read essay{" "}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))
            ) : (
              <Reveal>
                <div className="col-span-full rounded-2xl border border-dashed border-rule custom-theme-card-static py-16 text-center">
                  <p className="text-sm text-ink-muted">
                    No articles found matching your criteria.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter signup banner */}
      <section className="relative overflow-hidden bg-canvas py-16 md:py-20 border-t border-rule">
        <div className="container-edit relative max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" /> {newsletter.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              <RichHeading
                text={newsletter.heading}
                defaultContent={<>Get systems advice directly in your inbox.</>}
              />
            </h2>
            <p className="mt-4 text-base text-ink-soft">
              {newsletter.description}
            </p>
            {subscribed ? (
              <div className="mt-8 rounded-full border border-emerald-500/20 bg-emerald-500/10 py-3 px-6 text-sm font-semibold text-emerald-400">
                🎉 Thank you for subscribing! Check your inbox soon.
              </div>
            ) : (
              <form
                onSubmit={onNewsletterSubmit}
                className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={newsletter.email_placeholder || "Enter your email address"}
                  className="rounded-full border border-rule bg-canvas px-5 py-3 text-xs text-ink outline-none focus:border-ink/30 w-full sm:max-w-xs transition-colors"
                />
                <button
                  type="submit"
                  className="btn-premium rounded-full px-6 py-3 text-xs font-semibold text-canvas shadow-lift transition-all hover:-translate-y-0.5"
                >
                  {newsletter.btn_text}
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-ink-muted">{newsletter.disclaimer}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
