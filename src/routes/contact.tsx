import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo, type FormEvent } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  Mail,
  MessageCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buildMeta, jsonLd, breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";
import { whatsappUrl, WA_MESSAGES } from "@/lib/wa";
import { submitLeadToGHL } from "@/lib/ghl";
import { usePageContent } from "@/hooks/use-page-content";
import { getPageContent } from "@/lib/supabase";
import { EXACT_DEFAULT_CONTACT_CONTENT } from "@/lib/cms-defaults";
import { RichHeading } from "@/components/RichHeading";

export const faqs = [
  {
    q: EXACT_DEFAULT_CONTACT_CONTENT.faqs.q1,
    a: EXACT_DEFAULT_CONTACT_CONTENT.faqs.a1,
  },
  {
    q: EXACT_DEFAULT_CONTACT_CONTENT.faqs.q2,
    a: EXACT_DEFAULT_CONTACT_CONTENT.faqs.a2,
  },
  {
    q: EXACT_DEFAULT_CONTACT_CONTENT.faqs.q3,
    a: EXACT_DEFAULT_CONTACT_CONTENT.faqs.a3,
  },
  {
    q: EXACT_DEFAULT_CONTACT_CONTENT.faqs.q4,
    a: EXACT_DEFAULT_CONTACT_CONTENT.faqs.a4,
  },
];

export const Route = createFileRoute("/contact")({
  loader: async () => {
    return await getPageContent("contact");
  },
  head: () => {
    const m = buildMeta({
      path: "/contact",
      title: "Book a Practical AI Workshop - Contact Ambesh Tiwari",
      description:
        "Free 30-minute discovery. No pitch deck. Just a practical diagnosis of where AI fits in your team's workflow and what should happen next. 24-hour response.",
      keywords:
        "book AI training workshop, hire AI trainer India, contact Ambesh Tiwari, corporate AI training booking, AI workflow strategy",
    });
    return {
      ...m,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Ambesh Tiwari",
          url: `${SITE_URL}/contact`,
          mainEntity: {
            "@type": "Person",
            name: "Ambesh Tiwari",
            email: "hello@ambesh.com",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Booking and enquiries",
              email: "hello@ambesh.com",
              telephone: "+91-8929465115",
              areaServed: ["IN", "AE", "TZ"],
              availableLanguage: ["English", "Hindi"],
            },
          },
        }),
        jsonLd(faqSchema(faqs)),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ),
      ],
    };
  },
  component: ContactPage,
});

type ServiceKey = "diagnostic" | "training" | "strategy" | "automation";
const SERVICE_LABELS: Record<ServiceKey, string> = {
  diagnostic: "Business Systems Diagnostic",
  training: "AI Training",
  strategy: "Business OS Strategy",
  automation: "AI Implementation",
};

function readQuery() {
  if (typeof window === "undefined") return { service: "", type: "" };
  const params = new URLSearchParams(window.location.search);
  return {
    service: params.get("service") || "",
    type: params.get("type") || "",
  };
}

function ContactPage() {
  const loaderData = Route.useLoaderData();
  const cms = usePageContent("contact", EXACT_DEFAULT_CONTACT_CONTENT, loaderData);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [service, setService] = useState("");
  const [type, setType] = useState("");
  const [format, setFormat] = useState("");

  useEffect(() => {
    const q = readQuery();
    setService(q.service);
    setType(q.type);
    if (q.service === "training") {
      setFormat("Workshop (half-day to multi-day)");
    } else if (q.service === "strategy") {
      setFormat("Strategy sprint");
    } else if (q.service === "automation") {
      setFormat("Implementation build");
    }
  }, []);

  const serviceLabel =
    (service as ServiceKey) in SERVICE_LABELS ? SERVICE_LABELS[service as ServiceKey] : "";
  const isPodcast = type === "podcast";

  const waMessage = isPodcast
    ? WA_MESSAGES.podcast
    : service === "diagnostic"
      ? WA_MESSAGES.diagnostic
      : service === "training"
        ? WA_MESSAGES.training
        : service === "strategy"
          ? WA_MESSAGES.strategy
          : service === "automation"
            ? WA_MESSAGES.automation
            : WA_MESSAGES.contact;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const designation = String(data.get("designation") || "");
    const teamSize = String(data.get("teamSize") || "");
    const selectedFormat = String(data.get("format") || "");
    const timeline = String(data.get("timeline") || "");
    const challenge = String(data.get("challenge") || "");

    try {
      if (typeof submitLeadToGHL === "function") {
        await submitLeadToGHL({
          data: {
            name,
            email,
            company,
            designation,
            teamSize,
            format: selectedFormat,
            timeline,
            challenge,
            serviceLabel: isPodcast ? "Podcast guest pitch" : serviceLabel,
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
          },
        });
      }
    } catch (error) {
      console.warn("GHL sync notice:", error);
    }

    form.reset();
    setShowSuccessModal(true);
    setSubmitting(false);
  }

  const heroHeadingText = isPodcast
    ? cms.hero.heading_podcast
    : service === "diagnostic"
      ? cms.hero.heading_diagnostic
      : cms.hero.heading;

  const heroSub = isPodcast ? cms.hero.subheading_podcast : cms.hero.subheading;

  const statsList = useMemo(() => {
    return [
      { v: cms.sidebar.stat1_val, l: cms.sidebar.stat1_label },
      { v: cms.sidebar.stat2_val, l: cms.sidebar.stat2_label },
      { v: cms.sidebar.stat3_val, l: cms.sidebar.stat3_label },
    ];
  }, [cms.sidebar]);

  const faqsList = useMemo(() => {
    return [
      { q: cms.faqs.q1, a: cms.faqs.a1 },
      { q: cms.faqs.q2, a: cms.faqs.a2 },
      { q: cms.faqs.q3, a: cms.faqs.a3 },
      { q: cms.faqs.q4, a: cms.faqs.a4 },
    ].filter((f) => f.q && f.a);
  }, [cms.faqs]);

  return (
    <>
      {/* HERO */}
      <section className="premium-canvas bg-premium-side-gradient relative isolate overflow-hidden">
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-edit relative pt-12 pb-16 md:pt-16 md:pb-20">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" /> {cms.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 max-w-5xl font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              <RichHeading text={heroHeadingText} />
            </h1>
          </Reveal>
          {serviceLabel && (
            <Reveal delay={150}>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-rule bg-canvas px-4 py-1.5 text-xs font-semibold text-ink">
                Inquiry for {serviceLabel}
              </p>
            </Reveal>
          )}
          <Reveal delay={250}>
            <p className="mt-8 max-w-2xl text-lg text-ink-soft md:text-xl">{heroSub}</p>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" /> {cms.hero.badge_1}
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" /> {cms.hero.badge_2}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" /> {cms.hero.badge_3}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="relative bg-canvas">
        <div className="container-edit relative pb-28 -mt-6 md:-mt-12">
          <div className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <form
                onSubmit={onSubmit}
                className="rounded-3xl border border-rule bg-canvas p-6 shadow-lift md:p-10"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="icon-box flex h-10 w-10 items-center justify-center rounded-full border border-rule">
                    <Mail className="h-4 w-4 text-accent" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-ink">
                      {isPodcast ? cms.form.form_title_podcast : cms.form.form_title}
                    </h2>
                    <p className="text-sm text-ink-muted">
                      {isPodcast
                        ? cms.form.form_subtitle_podcast
                        : cms.form.form_subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={cms.form.label_name} name="name" required />
                  <Field label={cms.form.label_email} name="email" type="email" required />
                  <Field label={cms.form.label_company} name="company" required />
                  <Field label={cms.form.label_designation} name="designation" required />
                  <SelectField
                    label={cms.form.label_teamsize}
                    name="teamSize"
                    options={["1 to 10", "10 to 50", "50 to 200", "200 to 1,000", "1,000+"]}
                  />
                  <SelectField
                    label={cms.form.label_format}
                    name="format"
                    value={format}
                    onChange={setFormat}
                    options={[
                      "Keynote",
                      "Workshop (half-day to multi-day)",
                      "Strategy sprint",
                      "Implementation build",
                      "Not sure yet",
                    ]}
                  />
                  <SelectField
                    label={cms.form.label_timeline}
                    name="timeline"
                    options={["This month", "Next 60 days", "Next quarter", "Exploring"]}
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted font-mono-label">
                    {isPodcast
                      ? cms.form.label_challenge_podcast
                      : cms.form.label_challenge}
                  </label>
                  <textarea
                    name="challenge"
                    rows={5}
                    required
                    placeholder={
                      isPodcast
                        ? cms.form.placeholder_challenge_podcast
                        : cms.form.placeholder_challenge
                    }
                    className="w-full rounded-xl border border-rule bg-canvas px-4 py-3 text-base text-ink transition-all focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-premium group mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-semibold disabled:opacity-60 text-white"
                >
                  {submitting ? "Sending..." : cms.form.submit_btn_text}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="mt-4 text-center text-xs text-ink-muted">
                  {cms.form.bottom_note}
                </p>
              </form>
            </Reveal>

            <Reveal delay={150} className="md:col-span-5">
              <div className="sticky top-28 space-y-5">
                <div className="relative overflow-hidden rounded-3xl bg-ink p-7 text-canvas shadow-lift">
                  <div className="absolute inset-0 opacity-30 bg-gradient-brand" aria-hidden />
                  <div className="relative">
                    <Sparkles className="h-6 w-6 text-canvas/90" />
                    <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
                      {cms.sidebar.sidebar_stat_heading}
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {statsList.map((x) => (
                        <li
                          key={x.l}
                          className="flex items-baseline justify-between border-b border-canvas/10 pb-3 last:border-0"
                        >
                          <span className="text-sm text-canvas/70">{x.l}</span>
                          <span className="text-2xl font-extrabold tracking-tighter text-canvas">
                            {x.v}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-3xl border border-rule bg-canvas p-7 shadow-soft">
                  <p className="eyebrow flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5" /> {cms.sidebar.trust_eyebrow}
                  </p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-ink">
                    {cms.sidebar.trust_title}
                  </h3>
                  <ul className="mt-5 space-y-4 text-sm text-ink-soft">
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <span className="font-semibold text-ink">{cms.sidebar.trust1_title}</span>
                        {cms.sidebar.trust1_desc}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <span className="font-semibold text-ink">{cms.sidebar.trust2_title}</span>
                        {cms.sidebar.trust2_desc}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <span className="font-semibold text-ink">{cms.sidebar.trust3_title}</span>
                        {cms.sidebar.trust3_desc}
                      </span>
                    </li>
                  </ul>
                  <a
                    href={whatsappUrl(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {cms.sidebar.whatsapp_btn_text}
                  </a>
                  <a
                    href={`mailto:${cms.sidebar.email_address || "hello@ambesh.com"}`}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-rule bg-sand px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/40 hover:bg-sand-deep"
                  >
                    <Mail className="h-4 w-4" />
                    {cms.sidebar.email_btn_text}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative isolate overflow-hidden bg-canvas bg-premium-side-gradient py-16">
        <div className="home-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-edit relative grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow flex items-center gap-2">
              <MessageCircle className="h-3.5 w-3.5" /> {cms.faqs.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tighter md:text-5xl text-ink">
              <RichHeading text={cms.faqs.heading} />
            </h2>
            <p className="mt-5 text-base text-ink-muted">
              {cms.faqs.subheading}
            </p>
          </Reveal>
          <div className="md:col-span-8">
            <ul className="divide-y divide-rule border-y border-rule">
              {faqsList.map((f, i) => (
                <li key={`${f.q}-${i}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-accent"
                  >
                    <span className="text-lg font-semibold md:text-xl text-ink">{f.q}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule bg-canvas">
                      {openFaq === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="pb-6 pr-12">
                      <p className="text-base text-ink-muted">{f.a}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link to="/" className="text-sm text-ink-muted hover:text-ink">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-rule bg-canvas p-8 text-center shadow-lift"
          >
            <button
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition hover:bg-sand hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="icon-box mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-rule">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">
              {cms.modal.modal_title}
            </h3>
            <p className="mt-3 text-base text-ink-muted">
              {cms.modal.modal_desc}
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={whatsappUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                {cms.modal.modal_wa_btn}
              </a>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-sm font-semibold text-ink-muted transition hover:text-ink"
              >
                {cms.modal.modal_close_btn}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted font-mono-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="h-12 w-full rounded-xl border border-rule bg-canvas px-4 text-base text-ink transition-all focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted font-mono-label">
        {label}
      </label>
      <select
        name={name}
        required
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="h-12 w-full rounded-xl border border-rule bg-canvas px-4 text-base text-ink transition-all focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
