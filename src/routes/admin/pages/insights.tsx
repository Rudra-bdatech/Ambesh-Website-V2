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
  BookOpen,
  FileText,
  Mail,
  Search,
  Tag,
  Calendar,
  Clock,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/insights")({
  component: InsightsPageEditor,
});

// ─── EXACT 1:1 Default content matching the live insights.tsx ───────────────────
export const EXACT_DEFAULT_INSIGHTS_CONTENT = {
  hero: {
    eyebrow: "Insights",
    heading: "Systems, scaling, and *practical AI leverage.*",
    description:
      "Essays, frameworks, and guides on how to simplify operations, reduce founder dependence, and install automated leverage.",
    search_placeholder: "Search articles...",
  },
  articles: {
    art1_title: "Why Your Business is Stuck: The Founder Dependency Trap",
    art1_excerpt:
      "If every decision, client issue, and operational query flows through you, you haven't built a company - you've built a high-paying job. Here is how to step out of the loop.",
    art1_date: "July 12, 2026",
    art1_read_time: "6 min read",
    art1_category: "Systems",
    art1_slug: "founder-dependency-trap",
    art1_url: "#",

    art2_title: "Pragmatic AI: When to Use LLMs (And When to Avoid Them)",
    art2_excerpt:
      "Most corporate AI implementations fail because leaders attempt to automate complex reasoning before stabilizing basic workflows. Let's look at the real opportunity.",
    art2_date: "June 28, 2026",
    art2_read_time: "8 min read",
    art2_category: "AI & Tech",
    art2_slug: "pragmatic-ai-use-cases",
    art2_url: "#",

    art3_title: "The 90-Day Strategy Sprint: Aligning Team Workflows",
    art3_excerpt:
      "How to translate long-term goals into clear, department-level weekly actions that teams can execute autonomously without constant leadership check-ins.",
    art3_date: "May 15, 2026",
    art3_read_time: "5 min read",
    art3_category: "Strategy",
    art3_slug: "90-day-strategy-sprint",
    art3_url: "#",

    art4_title: "SOPs That Sell: Writing Workflows Your Team Will Actually Use",
    art4_excerpt:
      "SOPs languish in shared drives because they are written like compliance manuals. Here is a framework for creating action-oriented guides that drive consistency.",
    art4_date: "April 02, 2026",
    art4_read_time: "7 min read",
    art4_category: "Systems",
    art4_slug: "writing-useful-sops",
    art4_url: "#",
  },
  newsletter: {
    eyebrow: "Newsletter",
    heading: "Get systems advice directly in your *inbox.*",
    description:
      "Every fortnight, I share practical SOP templates, automation ideas, and AI prompts that founders are using to scale operations and reclaim their time.",
    email_placeholder: "Enter your email address",
    btn_text: "Join Private Letter",
    disclaimer: "Zero spam. Unsubscribe in a single click.",
    recipient_email: "hello@ambesh.com",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_INSIGHTS_CONTENT;
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
      className={`w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-blue-500/20 overflow-hidden resize-none ${className}`}
    />
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  helperText?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-white/70">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
      {helperText && <p className="text-[11px] text-white/40">{helperText}</p>}
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  helperText?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-white/70">{label}</label>
      <AutoTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
      {helperText && <p className="text-[11px] text-white/40">{helperText}</p>}
    </div>
  );
}

const sectionMeta: Record<
  SectionKey,
  { title: string; description: string; icon: React.ElementType }
> = {
  hero: {
    title: "Header & Search",
    description: "Insights page title, subtitle description, and search field copy.",
    icon: BookOpen,
  },
  articles: {
    title: "Published Articles & Essays (4 Cards)",
    description: "Edit article titles, excerpts, categories, publication dates, and read times.",
    icon: FileText,
  },
  newsletter: {
    title: "Newsletter Signup Banner",
    description: "Private letter subscription form heading, description, and recipient email.",
    icon: Mail,
  },
};

export function InsightsPageEditor() {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<Record<string, "saved" | "error" | null>>({});
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "insights");

      if (error) {
        console.error("Failed to load insights content:", error);
        setContent(EXACT_DEFAULT_INSIGHTS_CONTENT);
        return;
      }

      const map: ContentMap = {};
      (Object.keys(EXACT_DEFAULT_INSIGHTS_CONTENT) as SectionKey[]).forEach((section) => {
        map[section] = { ...EXACT_DEFAULT_INSIGHTS_CONTENT[section] };
      });

      if (data && data.length > 0) {
        (data as ContentRow[]).forEach((row) => {
          if (!map[row.section]) {
            map[row.section] = {};
          }
          map[row.section][row.key] = row.value;
        });
      }

      setContent(map);
    } catch (err) {
      console.error("Failed to load insights content:", err);
      setContent(EXACT_DEFAULT_INSIGHTS_CONTENT);
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
      const upsertRows = Object.entries(sectionData).map(([key, value]) => ({
        page: "insights",
        section,
        key,
        value: String(value ?? ""),
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from("site_content")
        .upsert(upsertRows, { onConflict: "page,section,key" });

      if (error) throw error;

      // Realtime cross-tab sync
      try {
        const channel = new BroadcastChannel("ambesh-cms-sync");
        channel.postMessage({ page: "insights", section, timestamp: Date.now() });
        channel.close();
      } catch (bcErr) {
        console.warn("BroadcastChannel error:", bcErr);
      }
      localStorage.setItem("ambesh-cms-last-update", `insights-${section}-${Date.now()}`);

      setSavedStatus((prev) => ({ ...prev, [section]: "saved" }));
      setTimeout(() => {
        setSavedStatus((prev) => ({ ...prev, [section]: null }));
      }, 3000);
    } catch (err) {
      console.error(`Error saving section ${section}:`, err);
      setSavedStatus((prev) => ({ ...prev, [section]: "error" }));
    } finally {
      setSavingSection(null);
    }
  };

  const resetSectionToDefault = (section: SectionKey) => {
    if (
      window.confirm(
        `Are you sure you want to reset the "${sectionMeta[section]?.title || section}" section to default content? You will need to click Save to apply changes.`,
      )
    ) {
      setContent((prev) => ({
        ...prev,
        [section]: { ...EXACT_DEFAULT_INSIGHTS_CONTENT[section] },
      }));
    }
  };

  const toggleCollapse = (section: string) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          Loading Insights page content...
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
              <BookOpen className="h-3.5 w-3.5" />
              Insights Page CMS
            </span>
            <span className="text-xs text-white/40">3 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Insights Page Editor (/insights)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit articles, categories, essays, and newsletter capture with zero-delay live synchronization.
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
            href="/insights"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
            View Live Page (/insights)
          </a>
        </div>
      </div>

      {/* Formatting Tips */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-blue-300">Rich Typography & Glowing Gradient Styling</h4>
            <p className="text-xs text-blue-200/70 leading-relaxed">
              Wrap words in <code className="bg-white/10 px-1 py-0.5 rounded text-blue-200">*asterisks*</code> to turn them into vibrant gradient glowing text (e.g. <code className="bg-white/10 px-1 py-0.5 rounded text-blue-200">Systems, scaling, and *practical AI leverage.*</code>).
            </p>
          </div>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-6">
        {(Object.keys(EXACT_DEFAULT_INSIGHTS_CONTENT) as SectionKey[]).map((section) => {
          const meta = sectionMeta[section];
          const isCollapsed = collapsedSections[section];
          const isSaving = savingSection === section;
          const status = savedStatus[section];
          const secContent = content[section] || {};
          const Icon = meta.icon;

          return (
            <div
              key={section}
              className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-200"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/5">
                <button
                  onClick={() => toggleCollapse(section)}
                  className="flex items-center gap-3 text-left flex-1 hover:opacity-80 transition-opacity"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-blue-400 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      {meta.title}
                      <ChevronDown
                        className={`h-4 w-4 text-white/40 transition-transform duration-200 ${
                          isCollapsed ? "-rotate-90" : ""
                        }`}
                      />
                    </h3>
                    <p className="text-xs text-white/50">{meta.description}</p>
                  </div>
                </button>

                <div className="flex items-center gap-2.5 shrink-0 ml-4">
                  <button
                    onClick={() => resetSectionToDefault(section)}
                    title="Reset section to default"
                    className="p-2 rounded-xl border border-white/10 bg-white/5 text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => saveSection(section)}
                    disabled={isSaving}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all duration-200 ${
                      status === "saved"
                        ? "bg-emerald-600 text-white shadow-emerald-600/20"
                        : status === "error"
                          ? "bg-red-600 text-white shadow-red-600/20"
                          : "bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-500"
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Saving...
                      </>
                    ) : status === "saved" ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Saved!
                      </>
                    ) : status === "error" ? (
                      <>
                        <AlertCircle className="h-3.5 w-3.5" />
                        Error!
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        Save Section
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Section Body */}
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-5 sm:p-6 space-y-6">
                      {/* SECTION 1: HERO */}
                      {section === "hero" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Eyebrow Badge"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("hero", "eyebrow", v)}
                              placeholder="Insights"
                            />
                            <InputField
                              label="Main Heading (Supports *gradient glow*)"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("hero", "heading", v)}
                              placeholder="Systems, scaling, and *practical AI leverage.*"
                            />
                          </div>

                          <TextareaField
                            label="Description"
                            value={secContent.description || ""}
                            onChange={(v) => updateField("hero", "description", v)}
                            rows={3}
                            placeholder="Essays, frameworks, and guides on how to simplify operations..."
                          />

                          <InputField
                            label="Search Bar Placeholder"
                            value={secContent.search_placeholder || ""}
                            onChange={(v) => updateField("hero", "search_placeholder", v)}
                            placeholder="Search articles..."
                          />
                        </div>
                      )}

                      {/* SECTION 2: ARTICLES */}
                      {section === "articles" && (
                        <div className="space-y-6">
                          <div className="grid gap-6 sm:grid-cols-2">
                            {[
                              { num: 1, defaultCat: "Systems" },
                              { num: 2, defaultCat: "AI & Tech" },
                              { num: 3, defaultCat: "Strategy" },
                              { num: 4, defaultCat: "Systems" },
                            ].map((art) => {
                              const tKey = `art${art.num}_title`;
                              const eKey = `art${art.num}_excerpt`;
                              const dKey = `art${art.num}_date`;
                              const rKey = `art${art.num}_read_time`;
                              const cKey = `art${art.num}_category`;
                              const sKey = `art${art.num}_slug`;

                              return (
                                <div
                                  key={art.num}
                                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 uppercase tracking-wider">
                                      <FileText className="h-3.5 w-3.5" />
                                      Article #{art.num}
                                    </span>
                                    <div className="w-36">
                                      <select
                                        value={secContent[cKey] || art.defaultCat}
                                        onChange={(e) => updateField("articles", cKey, e.target.value)}
                                        className="w-full rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                      >
                                        <option value="Systems">Systems</option>
                                        <option value="AI & Tech">AI & Tech</option>
                                        <option value="Strategy">Strategy</option>
                                      </select>
                                    </div>
                                  </div>

                                  <InputField
                                    label="Article Title"
                                    value={secContent[tKey] || ""}
                                    onChange={(v) => updateField("articles", tKey, v)}
                                    placeholder="Why Your Business is Stuck..."
                                  />

                                  <TextareaField
                                    label="Excerpt / Summary"
                                    value={secContent[eKey] || ""}
                                    onChange={(v) => updateField("articles", eKey, v)}
                                    rows={3}
                                    placeholder="If every decision, client issue..."
                                  />

                                  <div className="grid gap-3 sm:grid-cols-2">
                                    <InputField
                                      label="Date"
                                      value={secContent[dKey] || ""}
                                      onChange={(v) => updateField("articles", dKey, v)}
                                      placeholder="July 12, 2026"
                                    />
                                    <InputField
                                      label="Read Time"
                                      value={secContent[rKey] || ""}
                                      onChange={(v) => updateField("articles", rKey, v)}
                                      placeholder="6 min read"
                                    />
                                  </div>

                                  <InputField
                                    label="Article Slug / ID"
                                    value={secContent[sKey] || ""}
                                    onChange={(v) => updateField("articles", sKey, v)}
                                    placeholder="founder-dependency-trap"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 3: NEWSLETTER */}
                      {section === "newsletter" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Eyebrow Badge"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("newsletter", "eyebrow", v)}
                              placeholder="Newsletter"
                            />
                            <InputField
                              label="Heading (Supports *gradient*)"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("newsletter", "heading", v)}
                              placeholder="Get systems advice directly in your *inbox.*"
                            />
                          </div>

                          <TextareaField
                            label="Description"
                            value={secContent.description || ""}
                            onChange={(v) => updateField("newsletter", "description", v)}
                            rows={3}
                            placeholder="Every fortnight, I share practical SOP templates..."
                          />

                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Email Field Placeholder"
                              value={secContent.email_placeholder || ""}
                              onChange={(v) => updateField("newsletter", "email_placeholder", v)}
                              placeholder="Enter your email address"
                            />
                            <InputField
                              label="Submit Button Text"
                              value={secContent.btn_text || ""}
                              onChange={(v) => updateField("newsletter", "btn_text", v)}
                              placeholder="Join Private Letter"
                            />
                            <InputField
                              label="Target Recipient Email"
                              value={secContent.recipient_email || ""}
                              onChange={(v) => updateField("newsletter", "recipient_email", v)}
                              placeholder="hello@ambesh.com"
                            />
                          </div>

                          <InputField
                            label="Disclaimer Under Form"
                            value={secContent.disclaimer || ""}
                            onChange={(v) => updateField("newsletter", "disclaimer", v)}
                            placeholder="Zero spam. Unsubscribe in a single click."
                          />
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
