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
  GraduationCap,
  Users,
  Star,
  CheckSquare,
  MapPin,
  MessageSquareQuote,
  Building2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/training")({
  component: TrainingPageEditor,
});

// ─── EXACT 1:1 Default content matching the live training.tsx ──────────────────
export const EXACT_DEFAULT_TRAINING_CONTENT = {
  hero: {
    eyebrow: "Training",
    heading: "Corporate AI training that turns *confusion into daily use.*",
    subheading:
      "Hands-on AI workshops for leadership teams, departments and professionals who need to use AI inside real work, not just hear about it.",
    primary_btn_text: "Book a Strategy Call",
    secondary_btn_text: "View Training Formats",
    stat1_val: "5000+",
    stat1_label: "Professionals trained",
    stat2_val: "50+",
    stat2_label: "Organisations served",
    stat3_val: "150+",
    stat3_label: "Sessions and engagements",
    stat4_val: "11+",
    stat4_label: "Industries delivered in",
    stat5_val: "9.5",
    stat5_label: "Average NPS rating",
  },
  formats: {
    eyebrow: "Formats",
    heading: "Three training formats. *One practical method.*",
    subheading:
      "Every engagement is shaped to the team in the room, but all of them follow the same principle: people must leave using AI, not just hearing about it.",
    f1_title: "Leadership AI Workshop",
    f1_tagline: "For CXOs, founders and senior teams.",
    f1_body:
      "A focused session that gives leadership direction, risk clarity, and a 90-day view of where AI fits in the business.",
    f1_point1: "Half-day or full-day format",
    f1_point2: "Leadership only, decision-focused",
    f1_point3: "AI opportunity and risk framing",
    f1_point4: "Leaves with a 90-day adoption view",

    f2_title: "Department AI Workshop",
    f2_tagline: "For sales, marketing, HR, operations, finance and support teams.",
    f2_body:
      "Practical workshops that put AI inside the daily work of a specific department. Participants practise on their own tasks.",
    f2_point1: "Built around the department's real workflows",
    f2_point2: "Live practice on actual tools and tasks",
    f2_point3: "Department-specific use cases",
    f2_point4: "Post-session resource kit",

    f3_title: "AI Workflow Bootcamp",
    f3_tagline: "For teams that need deeper hands-on practice.",
    f3_body:
      "A longer engagement covering prompts, workflows, automation and internal use cases your team will keep using.",
    f3_point1: "Multi-day, hands-on format",
    f3_point2: "Prompts, workflows and automation depth",
    f3_point3: "Internal use cases built during the session",
    f3_point4: "Optional roadmap for next steps",
  },
  engagements: {
    eyebrow: "Named engagements",
    heading: "Recognisable rooms. *Real teams.*",
    e1_tag: "Retail",
    e1_name: "Landmark Group",
    e1_location: "Dubai",
    e1_format: "Corporate AI and automation training",

    e2_tag: "Professional body",
    e2_name: "ICSI",
    e2_location: "Delhi",
    e2_format: "AI session for CS professionals",

    e3_tag: "Government",
    e3_name: "Ministry of Finance",
    e3_location: "Dar es Salaam, Tanzania",
    e3_format: "Government AI adoption program",
  },
  outcomes: {
    eyebrow: "After the training",
    heading: "Your team should leave with *things they can use.*",
    outcome_1: "AI workflows for their actual work",
    outcome_2: "Better prompts for research, writing, analysis and decision-making",
    outcome_3: "Clarity on where AI helps and where it does not",
    outcome_4: "Practical use cases for their department",
    outcome_5: "Resource kit for continued practice",
    outcome_6: "Optional roadmap for deeper automation",
  },
  themes: {
    eyebrow: "Feedback",
    heading: "The feedback teams share, *session after session.*",
    t1_quote: "It was practical, not theoretical.",
    t1_body:
      "Participants repeatedly note that the session focused on their real work rather than generic demos. The strongest sessions are the ones where people leave having already used AI on something they care about.",

    t2_quote: "Everyone in the room could follow along.",
    t2_body:
      "Sponsors often comment on the range of participants, from nervous first-time users to confident early adopters, and how both groups leave engaged. The training is designed for mixed-skill rooms.",

    t3_quote: "We left with things we could use immediately.",
    t3_body:
      "The most common pattern after a session is teams applying specific prompts, workflows or tools within the first week. Whether that adoption sticks depends on leadership follow through, which is why a strategy sprint exists alongside training.",

    footer_nps:
      "Average NPS rating 9.5 across 150+ sessions and engagements.",
  },
  industries: {
    eyebrow: "Industries served",
    heading: "11 industries. *One playbook.*",
    list: "Fintech, SaaS, Manufacturing, Retail, FMCG, Edtech, Logistics, Real estate, Legal, Consulting, Media",
  },
  cta: {
    eyebrow: "Bring training to your team",
    heading: "Bring practical AI training *to your team.*",
    subheading:
      "Share your team size, department and goal. We will suggest the right format after a short discovery call.",
    btn_text: "Request a Training",
    wa_btn_text: "WhatsApp Ambesh",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_TRAINING_CONTENT;
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

export function TrainingPageEditor() {
  const [content, setContent] = useState<ContentMap>(() => {
    const init: ContentMap = {};
    for (const [sec, keys] of Object.entries(EXACT_DEFAULT_TRAINING_CONTENT)) {
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
        .eq("page", "training");

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
      console.error("Failed to load training page content:", err);
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
        page: "training",
        section,
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from("site_content").upsert(rows, {
        onConflict: "page,section,key",
      });

      if (error) throw error;

      // Broadcast instant live update to all tabs
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "ambesh_training_sync",
          JSON.stringify({ section, timestamp: Date.now() })
        );
        try {
          const channel = new BroadcastChannel("ambesh-cms-sync");
          channel.postMessage({ page: "training", section, data: sectionData });
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
    const defaults = EXACT_DEFAULT_TRAINING_CONTENT[section];
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
    hero: { title: "Hero Section & Stats", badge: "01", icon: GraduationCap },
    formats: { title: "Three Training Formats", badge: "02", icon: Users },
    engagements: { title: "Named Engagements (Client Rooms)", badge: "03", icon: Star },
    outcomes: { title: "After The Training / Outcomes", badge: "04", icon: CheckSquare },
    themes: { title: "Feedback & Themes", badge: "05", icon: MessageSquareQuote },
    industries: { title: "Industries Served", badge: "06", icon: MapPin },
    cta: { title: "Closing Call to Action", badge: "07", icon: Sparkles },
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3 text-white/50 text-sm">
          <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
          Loading Training page content...
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
              <GraduationCap className="h-3.5 w-3.5" />
              Training Page CMS
            </span>
            <span className="text-xs text-white/40">7 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Training Page Editor (/training)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit all hero stats, workshop formats, client engagements, outcomes, feedback quotes, and CTAs.
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
            href="/training"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
            View Live Page
          </a>
        </div>
      </div>

      <FormattingTips />

      {/* Sections Container */}
      <div className="space-y-6">
        {(Object.keys(EXACT_DEFAULT_TRAINING_CONTENT) as SectionKey[]).map((section) => {
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
                              Hero Heading (*text* for gradient)
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

                          {/* 5 Stats Grid */}
                          <div className="pt-2">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
                              5 Hero Stats
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                              {[1, 2, 3, 4, 5].map((num) => {
                                const valKey = `stat${num}_val`;
                                const labelKey = `stat${num}_label`;
                                return (
                                  <div key={num} className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-2">
                                    <label className="block text-[11px] text-white/50 font-mono">
                                      Stat {num} Value
                                    </label>
                                    <input
                                      type="text"
                                      value={secContent[valKey] || ""}
                                      onChange={(e) => updateField("hero", valKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                                    />
                                    <label className="block text-[11px] text-white/50 font-mono">
                                      Stat {num} Label
                                    </label>
                                    <input
                                      type="text"
                                      value={secContent[labelKey] || ""}
                                      onChange={(e) => updateField("hero", labelKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 2: FORMATS */}
                      {section === "formats" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("formats", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("formats", "heading", e.target.value)}
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
                              onChange={(e) => updateField("formats", "subheading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          {/* 3 Formats */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                            {[1, 2, 3].map((num) => {
                              const tKey = `f${num}_title`;
                              const tagKey = `f${num}_tagline`;
                              const bKey = `f${num}_body`;
                              const p1Key = `f${num}_point1`;
                              const p2Key = `f${num}_point2`;
                              const p3Key = `f${num}_point3`;
                              const p4Key = `f${num}_point4`;

                              return (
                                <div key={num} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                                  <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
                                    Format 0{num}
                                  </span>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Title</label>
                                    <input
                                      type="text"
                                      value={secContent[tKey] || ""}
                                      onChange={(e) => updateField("formats", tKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Tagline</label>
                                    <input
                                      type="text"
                                      value={secContent[tagKey] || ""}
                                      onChange={(e) => updateField("formats", tagKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Body</label>
                                    <AutoTextarea
                                      value={secContent[bKey] || ""}
                                      onChange={(e) => updateField("formats", bKey, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="block text-[11px] text-white/50 font-mono">4 Bullet Points</label>
                                    <input
                                      type="text"
                                      value={secContent[p1Key] || ""}
                                      onChange={(e) => updateField("formats", p1Key, e.target.value)}
                                      placeholder="Bullet 1"
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                    />
                                    <input
                                      type="text"
                                      value={secContent[p2Key] || ""}
                                      onChange={(e) => updateField("formats", p2Key, e.target.value)}
                                      placeholder="Bullet 2"
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                    />
                                    <input
                                      type="text"
                                      value={secContent[p3Key] || ""}
                                      onChange={(e) => updateField("formats", p3Key, e.target.value)}
                                      placeholder="Bullet 3"
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                    />
                                    <input
                                      type="text"
                                      value={secContent[p4Key] || ""}
                                      onChange={(e) => updateField("formats", p4Key, e.target.value)}
                                      placeholder="Bullet 4"
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 3: NAMED ENGAGEMENTS */}
                      {section === "engagements" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("engagements", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("engagements", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            {[1, 2, 3].map((num) => {
                              const tagKey = `e${num}_tag`;
                              const nameKey = `e${num}_name`;
                              const locKey = `e${num}_location`;
                              const fmtKey = `e${num}_format`;

                              return (
                                <div key={num} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2.5">
                                  <span className="text-xs font-mono font-bold text-blue-400">
                                    Client Room 0{num}
                                  </span>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Tag/Category</label>
                                    <input
                                      type="text"
                                      value={secContent[tagKey] || ""}
                                      onChange={(e) => updateField("engagements", tagKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Organisation Name</label>
                                    <input
                                      type="text"
                                      value={secContent[nameKey] || ""}
                                      onChange={(e) => updateField("engagements", nameKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Location</label>
                                    <input
                                      type="text"
                                      value={secContent[locKey] || ""}
                                      onChange={(e) => updateField("engagements", locKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Program Details</label>
                                    <input
                                      type="text"
                                      value={secContent[fmtKey] || ""}
                                      onChange={(e) => updateField("engagements", fmtKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 4: OUTCOMES */}
                      {section === "outcomes" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("outcomes", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("outcomes", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          {/* 6 Outcomes */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {[1, 2, 3, 4, 5, 6].map((num) => {
                              const oKey = `outcome_${num}`;
                              return (
                                <div key={num} className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1">
                                  <label className="block text-[11px] text-white/50 font-mono">
                                    Outcome 0{num}
                                  </label>
                                  <input
                                    type="text"
                                    value={secContent[oKey] || ""}
                                    onChange={(e) => updateField("outcomes", oKey, e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 5: THEMES & FEEDBACK */}
                      {section === "themes" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("themes", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("themes", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          {/* 3 Themes */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                            {[1, 2, 3].map((num) => {
                              const qKey = `t${num}_quote`;
                              const bKey = `t${num}_body`;

                              return (
                                <div key={num} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2.5">
                                  <span className="text-xs font-mono font-bold text-blue-400">
                                    Quote Theme 0{num}
                                  </span>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Quote</label>
                                    <input
                                      type="text"
                                      value={secContent[qKey] || ""}
                                      onChange={(e) => updateField("themes", qKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Observation Details</label>
                                    <AutoTextarea
                                      value={secContent[bKey] || ""}
                                      onChange={(e) => updateField("themes", bKey, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Bottom NPS Summary Line
                            </label>
                            <input
                              type="text"
                              value={secContent.footer_nps || ""}
                              onChange={(e) => updateField("themes", "footer_nps", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 6: INDUSTRIES */}
                      {section === "industries" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("industries", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("industries", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Comma-Separated Industries List
                            </label>
                            <AutoTextarea
                              value={secContent.list || ""}
                              onChange={(e) => updateField("industries", "list", e.target.value)}
                              rows={2}
                            />
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
                                Request Button Text
                              </label>
                              <input
                                type="text"
                                value={secContent.btn_text || ""}
                                onChange={(e) => updateField("cta", "btn_text", e.target.value)}
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
                              WhatsApp Button Text
                            </label>
                            <input
                              type="text"
                              value={secContent.wa_btn_text || ""}
                              onChange={(e) => updateField("cta", "wa_btn_text", e.target.value)}
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
