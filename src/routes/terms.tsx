import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buildMeta, jsonLd, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { usePageContent } from "@/hooks/use-page-content";
import { EXACT_DEFAULT_TERMS_CONTENT } from "./admin/pages/terms";

export const Route = createFileRoute("/terms")({
  head: () => {
    const m = buildMeta({
      path: "/terms",
      title: "Terms of Use - Ambesh Tiwari",
      description:
        "Terms of Use for ambeshtiwari.com covering website use, intellectual property, services, payments and limitation of liability under Indian law.",
      keywords: "terms of use, terms and conditions, website terms India, Ambesh Tiwari terms",
    });
    return {
      ...m,
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms of Use", path: "/terms" },
          ]),
        ),
      ],
    };
  },
  component: TermsPage,
});

function TermsPage() {
  const content = usePageContent("terms", EXACT_DEFAULT_TERMS_CONTENT);

  const header = content.header || EXACT_DEFAULT_TERMS_CONTENT.header;
  const intro = content.intro || EXACT_DEFAULT_TERMS_CONTENT.intro;
  const clauses = content.clauses || EXACT_DEFAULT_TERMS_CONTENT.clauses;
  const contact = content.contact || EXACT_DEFAULT_TERMS_CONTENT.contact;

  return (
    <div className="bg-canvas">
      <section className="relative isolate overflow-hidden bg-premium-side-gradient pt-24 pb-12 md:pt-32">
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-edit relative">
          <Reveal eager>
            <p className="eyebrow flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" /> {header.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tighter text-ink md:text-6xl">
              {header.title}
            </h1>
            <p className="mt-4 text-sm text-ink-muted">Last updated: {header.last_updated}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-edit pb-24">
        <article className="mx-auto max-w-3xl space-y-8 text-[15px] leading-[1.75] text-ink-soft">
          <Intro>
            {intro.intro_text}
          </Intro>

          <Section title={clauses.sec1_title || "1. Eligibility"}>
            <p>{clauses.sec1_body}</p>
          </Section>

          <Section title={clauses.sec2_title || "2. Use of the website"}>
            <p>{clauses.sec2_body}</p>
          </Section>

          <Section title={clauses.sec3_title || "3. Intellectual property"}>
            <p>{clauses.sec3_body}</p>
          </Section>

          <Section title={clauses.sec4_title || "4. Services and engagements"}>
            <p>{clauses.sec4_body}</p>
          </Section>

          <Section title={clauses.sec5_title || "5. Fees and payments"}>
            <p>{clauses.sec5_body}</p>
          </Section>

          <Section title={clauses.sec6_title || "6. Cancellations and refunds"}>
            <p>{clauses.sec6_body}</p>
          </Section>

          <Section title={clauses.sec7_title || "7. Disclaimer of warranties"}>
            <p>{clauses.sec7_body}</p>
          </Section>

          <Section title={clauses.sec8_title || "8. Limitation of liability"}>
            <p>{clauses.sec8_body}</p>
          </Section>

          <Section title={clauses.sec9_title || "9. Indemnity"}>
            <p>{clauses.sec9_body}</p>
          </Section>

          <Section title={clauses.sec10_title || "10. Third-party links and tools"}>
            <p>{clauses.sec10_body}</p>
          </Section>

          <Section title={clauses.sec11_title || "11. Termination"}>
            <p>{clauses.sec11_body}</p>
          </Section>

          <Section title={clauses.sec12_title || "12. Modifications"}>
            <p>{clauses.sec12_body}</p>
          </Section>

          <Section title={clauses.sec13_title || "13. Governing law and dispute resolution"}>
            <p>{clauses.sec13_body}</p>
          </Section>

          <Section title={contact.sec14_title || "14. Contact"}>
            <p>
              {contact.sec14_intro || "Questions about these Terms can be sent to "}
              <a href={`mailto:${contact.email || "hello@ambesh.com"}`} className="underline">
                {contact.email || "hello@ambesh.com"}
              </a>
              .
            </p>
          </Section>
        </article>
      </section>
    </div>
  );
}

function Intro({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl custom-theme-card-static p-6 text-[15px] leading-[1.7]">
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
