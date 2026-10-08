import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Edit3,
  Eye,
  Loader2,
  RotateCcw,
  Sparkles,
  Layers,
  Wrench,
  Users,
  Compass,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/services")({
  component: ServicesPageEditor,
});

// ─── EXACT 1:1 Default content matching the live services.tsx ─────────────────
const EXACT_DEFAULT_SERVICES_CONTENT = {
  hero: {
    eyebrow: "Business OS",
    heading: "Build the operating system your business needs to *scale without you.*",
    subheading:
      "A structured, hands-on partnership for founder-led companies. We design your workflow strategy, document functional SOPs, and install practical AI tools directly into your team so operations run smoothly.",
    primary_btn_text: "Book a strategy call",
    secondary_btn_text: "See AI Training",
    stat1_val: "8 to 12",
    stat1_label: "Week engagements",
    stat2_val: "50+",
    stat2_label: "Organisations served",
    stat3_val: "5000+",
    stat3_label: "Team members trained",
    stat4_val: "9.5",
    stat4_label: "Average NPS rating",
  },
  pillars: {
    eyebrow: "What gets built",
    heading: "Three layers. *One Operating System.*",
    subheading:
      "Every engagement follows the same three layers, sized to the business. Some companies need the full OS. Others need one layer deeply installed. The diagnosis decides.",
    p1_name: "Business Diagnosis",
    p1_tagline: "See the business the way an outside operator would.",
    p1_body:
      "A structured diagnosis of where the business is stuck, where the founder is trapped, and which systems are missing across sales, delivery, operations and hiring.",
    p1_point1: "Founder and leadership interviews",
    p1_point2: "Systems and workflow audit",
    p1_point3: "Team dependency mapping",
    p1_point4: "Prioritised list of what to fix first",
    p1_cta: "Book a Business Systems Diagnostic",

    p2_name: "Business OS Install",
    p2_tagline: "Design and install the operating system the business actually needs.",
    p2_body:
      "A custom Operating System across the core functions of the business. Simple enough for the team to actually run, structured enough to scale beyond the founder.",
    p2_point1: "Sales, delivery, ops and hiring systems",
    p2_point2: "Documented workflows and SOPs",
    p2_point3: "AI leverage inside daily workflows",
    p2_point4: "Tooling stays lean and vendor-neutral",
    p2_cta: "Talk about the OS",

    p3_name: "Team Adoption",
    p3_tagline: "The Operating System is worthless if the team does not run it.",
    p3_body:
      "AI training and adoption support built into the engagement, so the OS becomes how the team actually works, not another document on a shared drive.",
    p3_point1: "AI training for the team on real workflows",
    p3_point2: "Leadership adoption support",
    p3_point3: "30 and 60 day check-ins",
    p3_point4: "Handover so the business owns everything",
    p3_cta: "Plan the adoption",
  },
  audiences: {
    eyebrow: "Who this is for",
    heading: "Built for founder-led *businesses.*",
    subheading:
      "The Business OS is not for early-stage startups looking for product-market fit, and not for large corporates with layers of structure. It is for founder-led businesses that have grown past what one person can hold together.",

    tab1_label: "Founders",
    tab1_title: "Get out of the daily fires. Get back to building the business.",
    tab1_body:
      "For founders whose businesses have grown past what one person can hold together. The Business OS gives you back your calendar and your focus.",
    tab1_bullet1: "Clarity on where you are the ceiling",
    tab1_bullet2: "Systems that do not depend on you being in every meeting",
    tab1_bullet3: "Leverage from AI without becoming a tech company",

    tab2_label: "Leadership",
    tab2_title: "Give your leadership team an operating system, not more initiatives.",
    tab2_body:
      "For leadership teams inside founder-led businesses. Align on how the business actually runs, before adding another tool or hire.",
    tab2_bullet1: "Shared language for how the business operates",
    tab2_bullet2: "Fewer overlapping initiatives",
    tab2_bullet3: "AI adoption aligned to real business goals",

    tab3_label: "Operators",
    tab3_title: "Turn a busy operations team into a compounding one.",
    tab3_body:
      "For heads of operations, COOs and integrators who need to install real systems, not just fix fires. The OS gives you a spine to hang everything else on.",
    tab3_bullet1: "Workflow-first operating cadence",
    tab3_bullet2: "Documented systems the team owns",
    tab3_bullet3: "AI installed where it earns its keep",
  },
  process: {
    eyebrow: "The process",
    heading: "How an OS engagement *actually runs.*",
    subheading:
      "Every engagement follows the same four steps, sized to the business. Typical duration is 8 to 12 weeks.",
    s1_num: "01",
    s1_title: "Audit",
    s1_body:
      "A structured 2-week diagnosis of the business. Founder interviews, team interviews, workflow audit. You get an honest picture of where the business is stuck.",
    s2_num: "02",
    s2_title: "Design",
    s2_body:
      "The Operating System is designed for your business. Sales, delivery, operations and hiring workflows, with AI leverage installed where it earns its keep. Nothing generic.",
    s3_num: "03",
    s3_title: "Build",
    s3_body:
      "The OS is built and customized for your business. Documented, trained and running. Leadership is aligned. Existing tools are used where they work, replaced only when they do not.",
    s4_num: "04",
    s4_title: "Adopt",
    s4_body:
      "30 and 60 day adoption check-ins. The team is trained on the OS. The business is handed over to run and improve without ongoing dependency on Ambesh.",
  },
  trainingCrosslink: {
    eyebrow: "AI Training",
    heading: "Need AI training without the full OS build?",
    body: "AI Training is a standalone offer. Leadership workshops, department workshops, and multi-day team bootcamps. Many companies start here and later bring in the full Business OS engagement.",
    btn_text: "Explore AI Training",
  },
  faqs: {
    eyebrow: "Common questions",
    heading: "Before you *ask.*",
    q1: "Who is the Business OS built for?",
    a1: "Founder-led businesses, usually between INR 5 crore and INR 100 crore, where the founder is still the ceiling on growth and systems live mostly in the founder's head.",
    q2: "How long does an engagement take?",
    a2: "A typical Business OS engagement runs across 8 to 12 weeks, with the initial OS installed in the first 4 to 6 weeks and adoption support layered on top.",
    q3: "Do you replace our tools?",
    a3: "Rarely. Most companies already have the tools they need. What is missing is the Operating System that connects them and the workflows that make them useful.",
    q4: "How is AI used inside the Business OS?",
    a4: "AI is installed as leverage inside the workflows your team already runs. It is never a separate track. If AI cannot make a workflow measurably better, we do not force it in.",
    q5: "Do you also do standalone AI training?",
    a5: "Yes. AI Training is a core standalone offer. Many companies start with training and later bring in the full Business OS engagement.",
    q6: "Do you sign NDAs?",
    a6: "Yes. NDAs are standard for any engagement that touches internal systems, workflows or data.",
    q7: "Do you travel internationally?",
    a7: "Yes. Ambesh works with teams across India, UAE and Africa.",
  },
  cta: {
    eyebrow: "Start with a diagnosis",
    heading: "The strongest engagements begin with an honest audit, *not a proposal.*",
    subheading:
      "A 30-minute Business Systems Diagnostic is usually enough to know whether we should work together, and where the leverage is.",
    button_text: "Book a Business Systems Diagnostic",
    note: "Responds within 24 hours · No sales script · Just a real conversation.",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_SERVICES_CONTENT;
type ContentMap = Record<string, Record<string, string>>;

interface ContentRow {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
}

function AutoTextarea({
  value,
  onChange,
  rows = 2,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { rows?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, (rows || 2) * 24 + 16)}px`;
    }
  }, [value, rows]);

  return (
    <textarea
      ref={textareaRef}
      {...props}
      value={value}
      onChange={(e) => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, (rows || 2) * 24 + 16)}px`;
        }
        onChange?.(e);
      }}
      rows={rows}
      className={`w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder-white/20 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-white/8 overflow-hidden leading-relaxed ${className}`}
    />
  );
}

function FormattingTips() {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-xs text-blue-300/90">
      <Sparkles className="h-4 w-4 shrink-0 text-blue-400" />
      <span>
        <strong>Styling Tips:</strong> Wrap words in <code className="rounded bg-blue-500/20 px-1.5 py-0.5 text-blue-200 font-mono">*word*</code> for glowing gradient text or <code className="rounded bg-blue-500/20 px-1.5 py-0.5 text-blue-200 font-mono">[word]</code> for an underlined serif accent.
      </span>
    </div>
  );
}

function ServicesPageEditor() {
  const [content, setContent] = useState<ContentMap>(() => {
    const init: ContentMap = {};
    for (const [sec, keys] of Object.entries(EXACT_DEFAULT_SERVICES_CONTENT)) {
      init[sec] = { ...keys };
    }
    return init;
  });

  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<Record<string, "saved" | "error" | null>>({});
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleCollapse = (sec: string) => {
    setCollapsedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "services");

      if (error) throw error;

      if (data && data.length > 0) {
        setContent((prev) => {
          const next = { ...prev };
          (data as ContentRow[]).forEach((row) => {
            if (!next[row.section]) next[row.section] = {};
            next[row.section][row.key] = row.value;
          });
          return next;
        });
      }
    } catch (err) {
      console.error("Failed to load services page content:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const updateField = (section: string, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [key]: value,
      },
    }));
  };

  const saveSection = async (section: SectionKey) => {
    setSavingSection(section);
    setSavedStatus((prev) => ({ ...prev, [section]: null }));

    try {
      const sectionData = content[section] || {};
      const rows = Object.entries(sectionData).map(([key, value]) => ({
        page: "services",
        section,
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from("site_content").upsert(rows, {
        onConflict: "page,section,key",
      });

      if (error) throw error;

      // Broadcast instant live update to all tabs & update local cache
      if (typeof window !== "undefined") {
        try {
          const cached = localStorage.getItem("cms-cache-services");
          const parsed = cached ? JSON.parse(cached) : {};
          parsed[section] = sectionData;
          localStorage.setItem("cms-cache-services", JSON.stringify(parsed));
        } catch (_) {}

        localStorage.setItem(
          "ambesh_services_sync",
          JSON.stringify({ section, timestamp: Date.now() })
        );
        try {
          const channel = new BroadcastChannel("ambesh-cms-sync");
          channel.postMessage({ page: "services", section, data: sectionData, timestamp: Date.now() });
          channel.close();
        } catch {
          // ignore BroadcastChannel fallback
        }
      }

      setSavedStatus((prev) => ({ ...prev, [section]: "saved" }));
      setTimeout(() => {
        setSavedStatus((prev) => ({ ...prev, [section]: null }));
      }, 3000);
    } catch (err) {
      console.error(`Error saving ${section}:`, err);
      setSavedStatus((prev) => ({ ...prev, [section]: "error" }));
    } finally {
      setSavingSection(null);
    }
  };

  const resetSection = (section: SectionKey) => {
    const defaults = EXACT_DEFAULT_SERVICES_CONTENT[section];
    if (!defaults) return;
    setContent((prev) => ({
      ...prev,
      [section]: { ...defaults },
    }));
  };

  const sectionMeta: Record<
    SectionKey,
    { title: string; badge: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    hero: { title: "Hero Section & Stats", badge: "01", icon: Layers },
    pillars: { title: "What Gets Built (3 Layers)", badge: "02", icon: Wrench },
    audiences: { title: "Who This Is For (Audience Tabs)", badge: "03", icon: Users },
    process: { title: "The Process (4 Timeline Steps)", badge: "04", icon: Compass },
    trainingCrosslink: { title: "AI Training Crosslink Banner", badge: "05", icon: GraduationCap },
    faqs: { title: "Common Questions (FAQ Accordion)", badge: "06", icon: MessageCircle },
    cta: { title: "Final Word / Diagnostic CTA", badge: "07", icon: Sparkles },
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3 text-white/50 text-sm">
          <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
          Loading Services page content...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
              <Layers className="h-3.5 w-3.5" />
              Work & Services CMS
            </span>
            <span className="text-xs text-white/40">7 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Work / Services Page Editor (/work)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit all copy, pillars, audience tabs, process steps, FAQs, and CTAs for the Work (/work) page with zero-delay live synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadContent}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            Reload
          </button>
          <a
            href="/work"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
            View Live Page (/work)
          </a>
        </div>
      </div>

      <FormattingTips />

      {/* Sections Container */}
      <div className="space-y-6">
        {(Object.keys(EXACT_DEFAULT_SERVICES_CONTENT) as SectionKey[]).map((section) => {
          const meta = sectionMeta[section];
          const isCollapsed = collapsedSections[section];
          const isSaving = savingSection === section;
          const status = savedStatus[section];
          const secContent = content[section] || {};

          return (
            <div
              key={section}
              className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-200 hover:border-white/15"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-4">
                <button
                  type="button"
                  onClick={() => toggleCollapse(section)}
                  className="flex flex-1 items-center gap-3 text-left group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                    <meta.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400/80">
                        {meta.badge}
                      </span>
                      <h2 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {meta.title}
                      </h2>
                    </div>
                  </div>
                  <ChevronDown
                    className={`ml-auto h-5 w-5 text-white/40 transition-transform duration-200 ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </button>

                <div className="ml-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => resetSection(section)}
                    title="Reset to original default copy"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={() => saveSection(section)}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-blue-500 disabled:opacity-50 transition-all"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Saving...
                      </>
                    ) : status === "saved" ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                        Saved!
                      </>
                    ) : status === "error" ? (
                      <>
                        <AlertCircle className="h-3.5 w-3.5 text-rose-300" />
                        Error
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-6">
                      {/* SECTION 1: HERO */}
                      {section === "hero" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow Text
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("hero", "eyebrow", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none focus:border-blue-500/50"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Primary Button Text
                              </label>
                              <input
                                type="text"
                                value={secContent.primary_btn_text || ""}
                                onChange={(e) =>
                                  updateField("hero", "primary_btn_text", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none focus:border-blue-500/50"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Hero Heading (Use *text* for gradient accent)
                            </label>
                            <AutoTextarea
                              value={secContent.heading || ""}
                              onChange={(e) => updateField("hero", "heading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Hero Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("hero", "subheading", e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Secondary Button Text
                            </label>
                            <input
                              type="text"
                              value={secContent.secondary_btn_text || ""}
                              onChange={(e) =>
                                updateField("hero", "secondary_btn_text", e.target.value)
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none focus:border-blue-500/50"
                            />
                          </div>

                          {/* Hero 4 Stats Grid */}
                          <div className="pt-2">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
                              Hero 4 Stats Cards
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                                <label className="block text-[11px] text-white/50 font-mono">Stat 1 Value</label>
                                <input
                                  type="text"
                                  value={secContent.stat1_val || ""}
                                  onChange={(e) => updateField("hero", "stat1_val", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                                <label className="block text-[11px] text-white/50 font-mono">Stat 1 Label</label>
                                <input
                                  type="text"
                                  value={secContent.stat1_label || ""}
                                  onChange={(e) => updateField("hero", "stat1_label", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>

                              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                                <label className="block text-[11px] text-white/50 font-mono">Stat 2 Value</label>
                                <input
                                  type="text"
                                  value={secContent.stat2_val || ""}
                                  onChange={(e) => updateField("hero", "stat2_val", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                                <label className="block text-[11px] text-white/50 font-mono">Stat 2 Label</label>
                                <input
                                  type="text"
                                  value={secContent.stat2_label || ""}
                                  onChange={(e) => updateField("hero", "stat2_label", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>

                              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                                <label className="block text-[11px] text-white/50 font-mono">Stat 3 Value</label>
                                <input
                                  type="text"
                                  value={secContent.stat3_val || ""}
                                  onChange={(e) => updateField("hero", "stat3_val", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                                <label className="block text-[11px] text-white/50 font-mono">Stat 3 Label</label>
                                <input
                                  type="text"
                                  value={secContent.stat3_label || ""}
                                  onChange={(e) => updateField("hero", "stat3_label", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>

                              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                                <label className="block text-[11px] text-white/50 font-mono">Stat 4 Value</label>
                                <input
                                  type="text"
                                  value={secContent.stat4_val || ""}
                                  onChange={(e) => updateField("hero", "stat4_val", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                                <label className="block text-[11px] text-white/50 font-mono">Stat 4 Label</label>
                                <input
                                  type="text"
                                  value={secContent.stat4_label || ""}
                                  onChange={(e) => updateField("hero", "stat4_label", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 2: PILLARS */}
                      {section === "pillars" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("pillars", "eyebrow", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Section Heading (*text* for gradient)
                              </label>
                              <input
                                type="text"
                                value={secContent.heading || ""}
                                onChange={(e) => updateField("pillars", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Section Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("pillars", "subheading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          {/* 3 Pillars Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                            {/* Pillar 1 */}
                            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                              <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
                                Layer 01
                              </span>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Title</label>
                                <input
                                  type="text"
                                  value={secContent.p1_name || ""}
                                  onChange={(e) => updateField("pillars", "p1_name", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Tagline</label>
                                <input
                                  type="text"
                                  value={secContent.p1_tagline || ""}
                                  onChange={(e) => updateField("pillars", "p1_tagline", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Body</label>
                                <AutoTextarea
                                  value={secContent.p1_body || ""}
                                  onChange={(e) => updateField("pillars", "p1_body", e.target.value)}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="block text-[11px] text-white/50 font-mono">4 Bullet Points</label>
                                <input
                                  type="text"
                                  value={secContent.p1_point1 || ""}
                                  onChange={(e) => updateField("pillars", "p1_point1", e.target.value)}
                                  placeholder="Point 1"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p1_point2 || ""}
                                  onChange={(e) => updateField("pillars", "p1_point2", e.target.value)}
                                  placeholder="Point 2"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p1_point3 || ""}
                                  onChange={(e) => updateField("pillars", "p1_point3", e.target.value)}
                                  placeholder="Point 3"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p1_point4 || ""}
                                  onChange={(e) => updateField("pillars", "p1_point4", e.target.value)}
                                  placeholder="Point 4"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Button CTA Text</label>
                                <input
                                  type="text"
                                  value={secContent.p1_cta || ""}
                                  onChange={(e) => updateField("pillars", "p1_cta", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                            </div>

                            {/* Pillar 2 */}
                            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                              <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
                                Layer 02
                              </span>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Title</label>
                                <input
                                  type="text"
                                  value={secContent.p2_name || ""}
                                  onChange={(e) => updateField("pillars", "p2_name", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Tagline</label>
                                <input
                                  type="text"
                                  value={secContent.p2_tagline || ""}
                                  onChange={(e) => updateField("pillars", "p2_tagline", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Body</label>
                                <AutoTextarea
                                  value={secContent.p2_body || ""}
                                  onChange={(e) => updateField("pillars", "p2_body", e.target.value)}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="block text-[11px] text-white/50 font-mono">4 Bullet Points</label>
                                <input
                                  type="text"
                                  value={secContent.p2_point1 || ""}
                                  onChange={(e) => updateField("pillars", "p2_point1", e.target.value)}
                                  placeholder="Point 1"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p2_point2 || ""}
                                  onChange={(e) => updateField("pillars", "p2_point2", e.target.value)}
                                  placeholder="Point 2"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p2_point3 || ""}
                                  onChange={(e) => updateField("pillars", "p2_point3", e.target.value)}
                                  placeholder="Point 3"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p2_point4 || ""}
                                  onChange={(e) => updateField("pillars", "p2_point4", e.target.value)}
                                  placeholder="Point 4"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Button CTA Text</label>
                                <input
                                  type="text"
                                  value={secContent.p2_cta || ""}
                                  onChange={(e) => updateField("pillars", "p2_cta", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                            </div>

                            {/* Pillar 3 */}
                            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                              <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
                                Layer 03
                              </span>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Title</label>
                                <input
                                  type="text"
                                  value={secContent.p3_name || ""}
                                  onChange={(e) => updateField("pillars", "p3_name", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Tagline</label>
                                <input
                                  type="text"
                                  value={secContent.p3_tagline || ""}
                                  onChange={(e) => updateField("pillars", "p3_tagline", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Body</label>
                                <AutoTextarea
                                  value={secContent.p3_body || ""}
                                  onChange={(e) => updateField("pillars", "p3_body", e.target.value)}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="block text-[11px] text-white/50 font-mono">4 Bullet Points</label>
                                <input
                                  type="text"
                                  value={secContent.p3_point1 || ""}
                                  onChange={(e) => updateField("pillars", "p3_point1", e.target.value)}
                                  placeholder="Point 1"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p3_point2 || ""}
                                  onChange={(e) => updateField("pillars", "p3_point2", e.target.value)}
                                  placeholder="Point 2"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p3_point3 || ""}
                                  onChange={(e) => updateField("pillars", "p3_point3", e.target.value)}
                                  placeholder="Point 3"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.p3_point4 || ""}
                                  onChange={(e) => updateField("pillars", "p3_point4", e.target.value)}
                                  placeholder="Point 4"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Button CTA Text</label>
                                <input
                                  type="text"
                                  value={secContent.p3_cta || ""}
                                  onChange={(e) => updateField("pillars", "p3_cta", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 3: AUDIENCES */}
                      {section === "audiences" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("audiences", "eyebrow", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Section Heading (*text* for gradient)
                              </label>
                              <input
                                type="text"
                                value={secContent.heading || ""}
                                onChange={(e) => updateField("audiences", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Section Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("audiences", "subheading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          {/* 3 Audience Tabs */}
                          <div className="space-y-4 pt-2">
                            {/* Tab 1: Founders */}
                            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-blue-400">
                                  Tab 1: {secContent.tab1_label || "Founders"}
                                </span>
                                <input
                                  type="text"
                                  value={secContent.tab1_label || ""}
                                  onChange={(e) => updateField("audiences", "tab1_label", e.target.value)}
                                  placeholder="Tab Label"
                                  className="w-36 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Title</label>
                                <input
                                  type="text"
                                  value={secContent.tab1_title || ""}
                                  onChange={(e) => updateField("audiences", "tab1_title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Body</label>
                                <AutoTextarea
                                  value={secContent.tab1_body || ""}
                                  onChange={(e) => updateField("audiences", "tab1_body", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="block text-[11px] text-white/50 font-mono">3 Key Bullets</label>
                                <input
                                  type="text"
                                  value={secContent.tab1_bullet1 || ""}
                                  onChange={(e) => updateField("audiences", "tab1_bullet1", e.target.value)}
                                  placeholder="Bullet 1"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.tab1_bullet2 || ""}
                                  onChange={(e) => updateField("audiences", "tab1_bullet2", e.target.value)}
                                  placeholder="Bullet 2"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.tab1_bullet3 || ""}
                                  onChange={(e) => updateField("audiences", "tab1_bullet3", e.target.value)}
                                  placeholder="Bullet 3"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                              </div>
                            </div>

                            {/* Tab 2: Leadership */}
                            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-blue-400">
                                  Tab 2: {secContent.tab2_label || "Leadership"}
                                </span>
                                <input
                                  type="text"
                                  value={secContent.tab2_label || ""}
                                  onChange={(e) => updateField("audiences", "tab2_label", e.target.value)}
                                  placeholder="Tab Label"
                                  className="w-36 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Title</label>
                                <input
                                  type="text"
                                  value={secContent.tab2_title || ""}
                                  onChange={(e) => updateField("audiences", "tab2_title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Body</label>
                                <AutoTextarea
                                  value={secContent.tab2_body || ""}
                                  onChange={(e) => updateField("audiences", "tab2_body", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="block text-[11px] text-white/50 font-mono">3 Key Bullets</label>
                                <input
                                  type="text"
                                  value={secContent.tab2_bullet1 || ""}
                                  onChange={(e) => updateField("audiences", "tab2_bullet1", e.target.value)}
                                  placeholder="Bullet 1"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.tab2_bullet2 || ""}
                                  onChange={(e) => updateField("audiences", "tab2_bullet2", e.target.value)}
                                  placeholder="Bullet 2"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.tab2_bullet3 || ""}
                                  onChange={(e) => updateField("audiences", "tab2_bullet3", e.target.value)}
                                  placeholder="Bullet 3"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                              </div>
                            </div>

                            {/* Tab 3: Operators */}
                            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-blue-400">
                                  Tab 3: {secContent.tab3_label || "Operators"}
                                </span>
                                <input
                                  type="text"
                                  value={secContent.tab3_label || ""}
                                  onChange={(e) => updateField("audiences", "tab3_label", e.target.value)}
                                  placeholder="Tab Label"
                                  className="w-36 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Title</label>
                                <input
                                  type="text"
                                  value={secContent.tab3_title || ""}
                                  onChange={(e) => updateField("audiences", "tab3_title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono">Body</label>
                                <AutoTextarea
                                  value={secContent.tab3_body || ""}
                                  onChange={(e) => updateField("audiences", "tab3_body", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="block text-[11px] text-white/50 font-mono">3 Key Bullets</label>
                                <input
                                  type="text"
                                  value={secContent.tab3_bullet1 || ""}
                                  onChange={(e) => updateField("audiences", "tab3_bullet1", e.target.value)}
                                  placeholder="Bullet 1"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.tab3_bullet2 || ""}
                                  onChange={(e) => updateField("audiences", "tab3_bullet2", e.target.value)}
                                  placeholder="Bullet 2"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.tab3_bullet3 || ""}
                                  onChange={(e) => updateField("audiences", "tab3_bullet3", e.target.value)}
                                  placeholder="Bullet 3"
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 4: PROCESS */}
                      {section === "process" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("process", "eyebrow", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Section Heading (*text* for gradient)
                              </label>
                              <input
                                type="text"
                                value={secContent.heading || ""}
                                onChange={(e) => updateField("process", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Section Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("process", "subheading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          {/* 4 Steps */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {[1, 2, 3, 4].map((num) => {
                              const stepNumKey = `s${num}_num`;
                              const stepTitleKey = `s${num}_title`;
                              const stepBodyKey = `s${num}_body`;

                              return (
                                <div key={num} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono font-bold text-blue-400">
                                      Step 0{num}
                                    </span>
                                    <input
                                      type="text"
                                      value={secContent[stepNumKey] || `0${num}`}
                                      onChange={(e) => updateField("process", stepNumKey, e.target.value)}
                                      className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-xs text-white font-mono text-center outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Title</label>
                                    <input
                                      type="text"
                                      value={secContent[stepTitleKey] || ""}
                                      onChange={(e) => updateField("process", stepTitleKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Body</label>
                                    <AutoTextarea
                                      value={secContent[stepBodyKey] || ""}
                                      onChange={(e) => updateField("process", stepBodyKey, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 5: TRAINING CROSSLINK */}
                      {section === "trainingCrosslink" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow Text
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) =>
                                  updateField("trainingCrosslink", "eyebrow", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Button Text
                              </label>
                              <input
                                type="text"
                                value={secContent.btn_text || ""}
                                onChange={(e) =>
                                  updateField("trainingCrosslink", "btn_text", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Heading
                            </label>
                            <input
                              type="text"
                              value={secContent.heading || ""}
                              onChange={(e) =>
                                updateField("trainingCrosslink", "heading", e.target.value)
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Body Paragraph
                            </label>
                            <AutoTextarea
                              value={secContent.body || ""}
                              onChange={(e) =>
                                updateField("trainingCrosslink", "body", e.target.value)
                              }
                              rows={3}
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 6: FAQS */}
                      {section === "faqs" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("faqs", "eyebrow", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Heading (*text* for gradient)
                              </label>
                              <input
                                type="text"
                                value={secContent.heading || ""}
                                onChange={(e) => updateField("faqs", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          {/* 7 FAQs */}
                          <div className="space-y-3 pt-2">
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                              const qKey = `q${num}`;
                              const aKey = `a${num}`;

                              return (
                                <div
                                  key={num}
                                  className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs text-blue-400 font-bold">
                                      FAQ #{num}
                                    </span>
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Question</label>
                                    <input
                                      type="text"
                                      value={secContent[qKey] || ""}
                                      onChange={(e) => updateField("faqs", qKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Answer</label>
                                    <AutoTextarea
                                      value={secContent[aKey] || ""}
                                      onChange={(e) => updateField("faqs", aKey, e.target.value)}
                                      rows={2}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 7: CLOSING CTA */}
                      {section === "cta" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow Text
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("cta", "eyebrow", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Button Text
                              </label>
                              <input
                                type="text"
                                value={secContent.button_text || ""}
                                onChange={(e) => updateField("cta", "button_text", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Heading (*text* for gradient)
                            </label>
                            <AutoTextarea
                              value={secContent.heading || ""}
                              onChange={(e) => updateField("cta", "heading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("cta", "subheading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Bottom Note
                            </label>
                            <input
                              type="text"
                              value={secContent.note || ""}
                              onChange={(e) => updateField("cta", "note", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
