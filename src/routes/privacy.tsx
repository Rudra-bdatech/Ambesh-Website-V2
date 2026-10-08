import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buildMeta, jsonLd, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { usePageContent } from "@/hooks/use-page-content";
import { getPageContent } from "@/lib/supabase";
import { EXACT_DEFAULT_PRIVACY_CONTENT } from "@/lib/cms-defaults";

export const Route = createFileRoute("/privacy")({
  loader: async () => {
    return await getPageContent("privacy");
  },
  head: () => {
    const m = buildMeta({
      path: "/privacy",
      title: "Privacy Policy - Ambesh Tiwari",
      description:
        "Privacy Policy for ambeshtiwari.com explaining what data is collected, how it is used, stored and protected under Indian law (DPDP Act, 2023).",
      keywords: "privacy policy, data protection, DPDP Act India, Ambesh Tiwari privacy",
    });
    return {
      ...m,
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ),
      ],
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  const loaderData = Route.useLoaderData();
  const content = usePageContent("privacy", EXACT_DEFAULT_PRIVACY_CONTENT, loaderData);

  const header = content.header || EXACT_DEFAULT_PRIVACY_CONTENT.header;
  const intro = content.intro || EXACT_DEFAULT_PRIVACY_CONTENT.intro;
  const clauses = content.clauses || EXACT_DEFAULT_PRIVACY_CONTENT.clauses;
  const officer = content.officer || EXACT_DEFAULT_PRIVACY_CONTENT.officer;

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
        <article className="prose-legal mx-auto max-w-3xl space-y-8 text-[15px] leading-[1.75] text-ink-soft">
          <LegalIntro>
            {intro.intro_text}
          </LegalIntro>

          <Section title={clauses.sec1_title || "1. Information we collect"}>
            <p>{clauses.sec1_body}</p>
          </Section>

          <Section title={clauses.sec2_title || "2. How we use your information"}>
            <p>{clauses.sec2_body}</p>
          </Section>

          <Section title={clauses.sec3_title || "3. Legal basis (DPDP Act, 2023)"}>
            <p>{clauses.sec3_body}</p>
          </Section>

          <Section title={clauses.sec4_title || "4. Sharing and disclosure"}>
            <p>{clauses.sec4_body}</p>
          </Section>

          <Section title={clauses.sec5_title || "5. Data storage and security"}>
            <p>{clauses.sec5_body}</p>
          </Section>

          <Section title={clauses.sec6_title || "6. Data retention"}>
            <p>{clauses.sec6_body}</p>
          </Section>

          <Section title={clauses.sec7_title || "7. Your rights under the DPDP Act"}>
            <p>{clauses.sec7_body}</p>
          </Section>

          <Section title={clauses.sec8_title || "8. Third-party links"}>
            <p>{clauses.sec8_body}</p>
          </Section>

          <Section title={clauses.sec9_title || "9. Children"}>
            <p>{clauses.sec9_body}</p>
          </Section>

          <Section title={officer.sec10_title || "10. Grievance officer"}>
            <p>{officer.sec10_intro || "In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, the Grievance Officer for this website is:"}</p>
            <p className="rounded-lg custom-theme-card-static p-4">
              <strong>{officer.name}</strong>
              <br />
              {officer.company}
              <br />
              Email:{" "}
              <a href={`mailto:${officer.email}`} className="underline">
                {officer.email}
              </a>
            </p>
            <p>{officer.sla}</p>
          </Section>

          <Section title={clauses.sec11_title || "11. Changes to this policy"}>
            <p>{clauses.sec11_body}</p>
          </Section>

          <Section title={clauses.sec12_title || "12. Governing law and jurisdiction"}>
            <p>{clauses.sec12_body}</p>
          </Section>
        </article>
      </section>
    </div>
  );
}

function LegalIntro({ children }: { children: React.ReactNode }) {
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
