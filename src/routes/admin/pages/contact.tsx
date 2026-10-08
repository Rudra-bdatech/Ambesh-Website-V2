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
  Mail,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  CheckSquare,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/contact")({
  component: ContactPageEditor,
});

// ─── EXACT 1:1 Default content matching the live contact.tsx ───────────────────
export const EXACT_DEFAULT_CONTACT_CONTENT = {
  hero: {
    eyebrow: "Contact",
    heading: "Let's build the system *your business needs.*",
    heading_diagnostic: "Let's diagnose *your business.*",
    heading_podcast: "Pitch a conversation *for the podcast.*",
    subheading:
      "Free 30-minute Business Systems Diagnostic. No pitch deck. A practical diagnosis of where the business is stuck and what the next 90 days should focus on.",
    subheading_podcast:
      "Tell us about you, the story, and why now. If it is a fit, we will set up a recording.",
    badge_1: "24-hour response",
    badge_2: "NDA on request",
    badge_3: "Custom proposal in 72 hours",
  },
  form: {
    form_title: "Tell us about your team",
    form_title_podcast: "Pitch your episode",
    form_subtitle: "The more honest, the more useful the call.",
    form_subtitle_podcast: "What should we talk about?",
    label_name: "Your name",
    label_email: "Email",
    label_company: "Company",
    label_designation: "Designation",
    label_teamsize: "Team size",
    label_format: "Preferred format",
    label_timeline: "Timeline",
    label_challenge: "Where is your team losing the most time right now?",
    label_challenge_podcast: "What is the core topic, story, or lesson you want to share?",
    placeholder_challenge:
      "Reporting, follow-ups, research, documentation, content, internal coordination, decision-making, or something else.",
    placeholder_challenge_podcast:
      "Please share a brief summary of what you would like to talk about and any background context.",
    submit_btn_text: "Send inquiry",
    bottom_note: "We respond within 24 hours. NDA available on request.",
  },
  sidebar: {
    sidebar_stat_heading: "Why teams pick Ambesh",
    stat1_label: "Professionals trained",
    stat1_val: "5,000+",
    stat2_label: "Sessions and engagements",
    stat2_val: "150+",
    stat3_label: "Average NPS score",
    stat3_val: "9.5",
    trust_eyebrow: "Trust signals",
    trust_title: "What you can expect",
    trust1_title: "24-hour response",
    trust1_desc: ", including weekends.",
    trust2_title: "NDA available",
    trust2_desc: " on request, before the first call.",
    trust3_title: "Custom proposal",
    trust3_desc: " in 72 hours after discovery.",
    whatsapp_btn_text: "Prefer WhatsApp? Message Ambesh",
    email_btn_text: "Or email hello@ambesh.com",
    email_address: "hello@ambesh.com",
  },
  faqs: {
    eyebrow: "FAQ",
    heading: "Quick *answers.*",
    subheading: "Still have questions? Email hello@ambesh.com.",
    q1: "What happens after submitting the form?",
    a1: "You will get a reply within 24 hours, usually with 2 to 3 calendar slots for a 30-minute discovery call.",
    q2: "Is the discovery call really free?",
    a2: "Yes. The call is free. It is designed to understand your team, not to force a sale.",
    q3: "Do you sign NDAs before the call?",
    a3: "Yes, if your team requires it.",
    q4: "Can we get a custom proposal?",
    a4: "Yes. After the discovery call, a custom proposal can usually be shared within 72 hours.",
  },
  modal: {
    modal_title: "Inquiry sent!",
    modal_desc:
      "✅ Thank you! Your inquiry has been submitted successfully. We'll get in touch with you shortly.",
    modal_wa_btn: "Message on WhatsApp",
    modal_close_btn: "Close",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_CONTACT_CONTENT;
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

export function ContactPageEditor() {
  const [content, setContent] = useState<ContentMap>(() => {
    const init: ContentMap = {};
    for (const [sec, keys] of Object.entries(EXACT_DEFAULT_CONTACT_CONTENT)) {
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
        .eq("page", "contact");

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
      console.error("Failed to load contact page content:", err);
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
        page: "contact",
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
          "ambesh_contact_sync",
          JSON.stringify({ section, timestamp: Date.now() })
        );
        try {
          const channel = new BroadcastChannel("ambesh-cms-sync");
          channel.postMessage({ page: "contact", section, data: sectionData });
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
    const defaults = EXACT_DEFAULT_CONTACT_CONTENT[section];
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
    hero: { title: "Hero Section & Trust Badges", badge: "01", icon: Mail },
    form: { title: "Inquiry Form Copy & Labels", badge: "02", icon: Edit3 },
    sidebar: { title: "Sidebar Stats & Trust Signals", badge: "03", icon: ShieldCheck },
    faqs: { title: "Common Questions (FAQ)", badge: "04", icon: HelpCircle },
    modal: { title: "Success Modal Confirmation", badge: "05", icon: CheckSquare },
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3 text-white/50 text-sm">
          <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
          Loading Contact page content...
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
              <Mail className="h-3.5 w-3.5" />
              Contact Page CMS
            </span>
            <span className="text-xs text-white/40">5 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Contact Page Editor (/contact)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Customize all headings, form placeholders, sidebar stats, WhatsApp/email links, and FAQs with 0ms live sync.
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
            href="/contact"
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
        {(Object.keys(EXACT_DEFAULT_CONTACT_CONTENT) as SectionKey[]).map((section) => {
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
                                Default Heading (*text* for gradient)
                              </label>
                              <input
                                type="text"
                                value={secContent.heading || ""}
                                onChange={(e) => updateField("hero", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none focus:border-blue-500/50"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Diagnostic Variant Heading
                              </label>
                              <input
                                type="text"
                                value={secContent.heading_diagnostic || ""}
                                onChange={(e) =>
                                  updateField("hero", "heading_diagnostic", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none focus:border-blue-500/50"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Podcast Variant Heading
                              </label>
                              <input
                                type="text"
                                value={secContent.heading_podcast || ""}
                                onChange={(e) =>
                                  updateField("hero", "heading_podcast", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none focus:border-blue-500/50"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Default Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("hero", "subheading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Podcast Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading_podcast || ""}
                              onChange={(e) =>
                                updateField("hero", "subheading_podcast", e.target.value)
                              }
                              rows={2}
                            />
                          </div>

                          {/* 3 Badges */}
                          <div className="pt-2">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
                              3 Trust Badges Under Hero
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Badge 1
                                </label>
                                <input
                                  type="text"
                                  value={secContent.badge_1 || ""}
                                  onChange={(e) => updateField("hero", "badge_1", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Badge 2
                                </label>
                                <input
                                  type="text"
                                  value={secContent.badge_2 || ""}
                                  onChange={(e) => updateField("hero", "badge_2", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Badge 3
                                </label>
                                <input
                                  type="text"
                                  value={secContent.badge_3 || ""}
                                  onChange={(e) => updateField("hero", "badge_3", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 2: FORM */}
                      {section === "form" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Form Header Title
                              </label>
                              <input
                                type="text"
                                value={secContent.form_title || ""}
                                onChange={(e) => updateField("form", "form_title", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Podcast Form Header Title
                              </label>
                              <input
                                type="text"
                                value={secContent.form_title_podcast || ""}
                                onChange={(e) =>
                                  updateField("form", "form_title_podcast", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Form Subtitle
                              </label>
                              <input
                                type="text"
                                value={secContent.form_subtitle || ""}
                                onChange={(e) =>
                                  updateField("form", "form_subtitle", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Podcast Form Subtitle
                              </label>
                              <input
                                type="text"
                                value={secContent.form_subtitle_podcast || ""}
                                onChange={(e) =>
                                  updateField("form", "form_subtitle_podcast", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          {/* Field Labels */}
                          <div className="pt-2">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
                              Input Field Labels
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Name Label
                                </label>
                                <input
                                  type="text"
                                  value={secContent.label_name || ""}
                                  onChange={(e) => updateField("form", "label_name", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Email Label
                                </label>
                                <input
                                  type="text"
                                  value={secContent.label_email || ""}
                                  onChange={(e) => updateField("form", "label_email", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Company Label
                                </label>
                                <input
                                  type="text"
                                  value={secContent.label_company || ""}
                                  onChange={(e) => updateField("form", "label_company", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Designation Label
                                </label>
                                <input
                                  type="text"
                                  value={secContent.label_designation || ""}
                                  onChange={(e) => updateField("form", "label_designation", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Team Size Label
                                </label>
                                <input
                                  type="text"
                                  value={secContent.label_teamsize || ""}
                                  onChange={(e) => updateField("form", "label_teamsize", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Format Label
                                </label>
                                <input
                                  type="text"
                                  value={secContent.label_format || ""}
                                  onChange={(e) => updateField("form", "label_format", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Timeline Label
                                </label>
                                <input
                                  type="text"
                                  value={secContent.label_timeline || ""}
                                  onChange={(e) => updateField("form", "label_timeline", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Submit Button Text
                                </label>
                                <input
                                  type="text"
                                  value={secContent.submit_btn_text || ""}
                                  onChange={(e) => updateField("form", "submit_btn_text", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Challenge Textarea Field */}
                          <div className="space-y-3 pt-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Challenge Textarea Label (Default)
                              </label>
                              <input
                                type="text"
                                value={secContent.label_challenge || ""}
                                onChange={(e) =>
                                  updateField("form", "label_challenge", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Challenge Textarea Placeholder (Default)
                              </label>
                              <AutoTextarea
                                value={secContent.placeholder_challenge || ""}
                                onChange={(e) =>
                                  updateField("form", "placeholder_challenge", e.target.value)
                                }
                                rows={2}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Challenge Textarea Label (Podcast Variant)
                              </label>
                              <input
                                type="text"
                                value={secContent.label_challenge_podcast || ""}
                                onChange={(e) =>
                                  updateField("form", "label_challenge_podcast", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Challenge Textarea Placeholder (Podcast Variant)
                              </label>
                              <AutoTextarea
                                value={secContent.placeholder_challenge_podcast || ""}
                                onChange={(e) =>
                                  updateField("form", "placeholder_challenge_podcast", e.target.value)
                                }
                                rows={2}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Form Bottom Note
                              </label>
                              <input
                                type="text"
                                value={secContent.bottom_note || ""}
                                onChange={(e) => updateField("form", "bottom_note", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 3: SIDEBAR & TRUST SIGNALS */}
                      {section === "sidebar" && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Sidebar Dark Card Heading
                            </label>
                            <input
                              type="text"
                              value={secContent.sidebar_stat_heading || ""}
                              onChange={(e) =>
                                updateField("sidebar", "sidebar_stat_heading", e.target.value)
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>

                          {/* 3 Sidebar Stats */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-2">
                              <label className="block text-[11px] text-white/50 font-mono">Stat 1 Value</label>
                              <input
                                type="text"
                                value={secContent.stat1_val || ""}
                                onChange={(e) => updateField("sidebar", "stat1_val", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                              />
                              <label className="block text-[11px] text-white/50 font-mono">Stat 1 Label</label>
                              <input
                                type="text"
                                value={secContent.stat1_label || ""}
                                onChange={(e) => updateField("sidebar", "stat1_label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                              />
                            </div>
                            <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-2">
                              <label className="block text-[11px] text-white/50 font-mono">Stat 2 Value</label>
                              <input
                                type="text"
                                value={secContent.stat2_val || ""}
                                onChange={(e) => updateField("sidebar", "stat2_val", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                              />
                              <label className="block text-[11px] text-white/50 font-mono">Stat 2 Label</label>
                              <input
                                type="text"
                                value={secContent.stat2_label || ""}
                                onChange={(e) => updateField("sidebar", "stat2_label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                              />
                            </div>
                            <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-2">
                              <label className="block text-[11px] text-white/50 font-mono">Stat 3 Value</label>
                              <input
                                type="text"
                                value={secContent.stat3_val || ""}
                                onChange={(e) => updateField("sidebar", "stat3_val", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                              />
                              <label className="block text-[11px] text-white/50 font-mono">Stat 3 Label</label>
                              <input
                                type="text"
                                value={secContent.stat3_label || ""}
                                onChange={(e) => updateField("sidebar", "stat3_label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                              />
                            </div>
                          </div>

                          {/* Trust Signals Card */}
                          <div className="space-y-3 pt-2">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400">
                              Trust Signals & Direct Channels
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Trust Eyebrow
                                </label>
                                <input
                                  type="text"
                                  value={secContent.trust_eyebrow || ""}
                                  onChange={(e) => updateField("sidebar", "trust_eyebrow", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Trust Header Title
                                </label>
                                <input
                                  type="text"
                                  value={secContent.trust_title || ""}
                                  onChange={(e) => updateField("sidebar", "trust_title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="p-3 rounded-lg border border-white/10 bg-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={secContent.trust1_title || ""}
                                  onChange={(e) => updateField("sidebar", "trust1_title", e.target.value)}
                                  placeholder="Trust 1 Title (bold)"
                                  className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.trust1_desc || ""}
                                  onChange={(e) => updateField("sidebar", "trust1_desc", e.target.value)}
                                  placeholder="Trust 1 Description"
                                  className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-xs text-white outline-none"
                                />
                              </div>
                              <div className="p-3 rounded-lg border border-white/10 bg-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={secContent.trust2_title || ""}
                                  onChange={(e) => updateField("sidebar", "trust2_title", e.target.value)}
                                  placeholder="Trust 2 Title (bold)"
                                  className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.trust2_desc || ""}
                                  onChange={(e) => updateField("sidebar", "trust2_desc", e.target.value)}
                                  placeholder="Trust 2 Description"
                                  className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-xs text-white outline-none"
                                />
                              </div>
                              <div className="p-3 rounded-lg border border-white/10 bg-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={secContent.trust3_title || ""}
                                  onChange={(e) => updateField("sidebar", "trust3_title", e.target.value)}
                                  placeholder="Trust 3 Title (bold)"
                                  className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-xs text-white outline-none"
                                />
                                <input
                                  type="text"
                                  value={secContent.trust3_desc || ""}
                                  onChange={(e) => updateField("sidebar", "trust3_desc", e.target.value)}
                                  placeholder="Trust 3 Description"
                                  className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-xs text-white outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  WhatsApp Button Text
                                </label>
                                <input
                                  type="text"
                                  value={secContent.whatsapp_btn_text || ""}
                                  onChange={(e) =>
                                    updateField("sidebar", "whatsapp_btn_text", e.target.value)
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Email Button Text
                                </label>
                                <input
                                  type="text"
                                  value={secContent.email_btn_text || ""}
                                  onChange={(e) =>
                                    updateField("sidebar", "email_btn_text", e.target.value)
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-white/50 font-mono mb-1">
                                  Email Address
                                </label>
                                <input
                                  type="text"
                                  value={secContent.email_address || ""}
                                  onChange={(e) =>
                                    updateField("sidebar", "email_address", e.target.value)
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 4: FAQS */}
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

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              FAQ Subheading Note
                            </label>
                            <input
                              type="text"
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("faqs", "subheading", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>

                          {/* 4 FAQs */}
                          <div className="space-y-3 pt-2">
                            {[1, 2, 3, 4].map((num) => {
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

                      {/* SECTION 5: MODAL */}
                      {section === "modal" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Modal Title
                              </label>
                              <input
                                type="text"
                                value={secContent.modal_title || ""}
                                onChange={(e) => updateField("modal", "modal_title", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Close Button Text
                              </label>
                              <input
                                type="text"
                                value={secContent.modal_close_btn || ""}
                                onChange={(e) =>
                                  updateField("modal", "modal_close_btn", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Modal Message
                            </label>
                            <AutoTextarea
                              value={secContent.modal_desc || ""}
                              onChange={(e) => updateField("modal", "modal_desc", e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              WhatsApp Button Text
                            </label>
                            <input
                              type="text"
                              value={secContent.modal_wa_btn || ""}
                              onChange={(e) => updateField("modal", "modal_wa_btn", e.target.value)}
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
