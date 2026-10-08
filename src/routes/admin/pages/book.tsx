import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
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
  Award,
  Users,
  List,
  Quote,
  User,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/book")({
  component: BookPageEditor,
});

// ─── EXACT 1:1 Default content matching the live book.tsx ───────────────────
export const EXACT_DEFAULT_BOOK_CONTENT = {
  hero: {
    eyebrow: "The book",
    heading: "Accelerate *With AI.*",
    subheading_italic: "A simple book for a complicated world.",
    description:
      "A must-read for those who not only want to understand AI but also apply it to scale their business.",
    badge_text: "Amazon Bestseller",
    badge_meta: "Kindle + Physical · English · 2023",
    kindle_btn_text: "Read on Kindle",
    kindle_btn_url:
      "https://www.amazon.in/dp/B0CLKZK6JS?ref_=cm_sw_r_cp_ud_dp_YJBSASGYYGPGJ42PBTK2&asin=B0CLKZK6JS&revisionId=7bc12fe7&format=3&depth=1",
    physical_btn_text: "Get a Physical Copy",
    physical_btn_url:
      "https://www.amazon.in/dp/B0CLKZK6JS?ref_=cm_sw_r_cp_ud_dp_YJBSASGYYGPGJ42PBTK2",
  },
  press: {
    heading: "Featured In",
  },
  audiences: {
    eyebrow: "Who it is for",
    heading: "Written for people who *do real work.*",
    aud1_title: "Business owners and founders",
    aud1_desc:
      "Who know AI matters but do not know where to start. A framework for thinking about AI as a business decision, not a technology decision.",
    aud2_title: "Team leads and managers",
    aud2_desc:
      "Who need to help their teams adopt AI without disrupting what already works. Practical chapters on implementation, not theory.",
    aud3_title: "Professionals building their career",
    aud3_desc:
      "Who want to be the person on their team who actually understands AI - not the one who is still thinking about it.",
  },
  takeaways: {
    eyebrow: "Inside the book",
    heading: "10 things this book will *teach you.*",
    subheading: "10 clear takeaways.",
    item_1: "How AI is transforming industries and what it means for your business",
    item_2: "How to navigate the AI tool landscape and pick what actually matters",
    item_3: "How to use AI to personalise customer experiences",
    item_4: "Common adoption challenges and how to work through them",
    item_5: "Where AI is heading and what to watch",
    item_6: "Real-world applications from automation to customer insights",
    item_7: "How to build an AI strategy that aligns with your business goals",
    item_8: "Using AI for better data-driven decisions",
    item_9: "Ethical considerations that actually matter in practice",
    item_10: "How to build a scalable, AI-powered business model",
  },
  endorsements: {
    eyebrow: "What experts say",
    heading: "The people who *read it first.*",
    featured_label: "Featured endorsement",
    featured_quote:
      "In his timely new book, Accelerate with AI, growth consultant and entrepreneur Ambesh Tiwari has provided something the business world sorely needs: a strategically focused, practical, and accessible guide to the myriad ways in which firms of all sizes can harness artificial intelligence to be more efficient and effective.",
    featured_name: "William Koehler, Ph.D.",
    featured_role:
      "Dean, Sloane School of Business & Communication, Regis College, Massachusetts, USA",
    featured_initials: "WK",
    end1_quote:
      "If businesses want to leverage AI to get ahead, Ambesh Tiwari's insights and takeaways are certainly a fundamental stepping stone in this field.",
    end1_name: "Madhu C Dutta-Koehler, PhD, MIT",
    end1_role: "Founder and President, The Greener Health Corp.",
    end2_quote:
      "Ambesh has done an excellent job in making everyone aware of the fact that AI is not for the corporate houses only but of every businessperson.",
    end2_name: "Aditya Lohia",
    end2_role: "Executive Director, Lohia Industries (P) Ltd.",
    end3_quote:
      "The academic world often dwells on theory, but Ambesh's book is a refreshing pivot to action. It translates high-level concepts into actionable strategies that can be implemented from day one.",
    end3_name: "Shyam Sunder",
    end3_role: "AI Researcher, CSIR-CEERI, Pilani",
    end4_quote:
      "In the book Accelerate with AI, Ambesh has tried to accumulate some highly effective AI tools, tips and tricks at one place for business owners.",
    end4_name: "Prabhat Sinha",
    end4_role: "IT Expert, Entrepreneur & Best-selling Author",
  },
  author: {
    eyebrow: "About the author",
    bio_text:
      "Ambesh Tiwari is the founder of BDA Technologies, host of the _Inspire with Ambesh_ podcast, and an AI trainer who has worked with *5,000+ professionals* across 50+ organisations in India, UAE and Africa. He blends an engineering background with an MBA in International Marketing, a decade of business building, and a practical, no-hype approach to AI that comes from using it in his own work every day.",
    link_text: "Read the full story",
    link_url: "/about",
  },
  chapter_cta: {
    tag: "Free",
    heading: "Get *Chapter 1* on us.",
    description:
      "Drop your email. We'll send the first chapter as a PDF - and an invite to the next AI training cohort.",
    training_link_text: "Or explore AI Knowledge programs",
    training_link_url: "/training",
    btn_text: "Send it",
    email_placeholder: "you@company.com",
    recipient_email: "hello@ambesh.com",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_BOOK_CONTENT;
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
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { rows?: number }) {
  return (
    <textarea
      {...props}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${props.className || ""}`}
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
    title: "Hero & Book Purchase Links",
    description: "Main book title, subtitle, description, bestseller badge, and Amazon Kindle / Physical purchase buttons.",
    icon: BookOpen,
  },
  press: {
    title: "Featured In Press Bar",
    description: "Press logos section title.",
    icon: Award,
  },
  audiences: {
    title: "Who It Is For (3 Audience Cards)",
    description: "Target reader segments (Founders, Managers, Career Builders).",
    icon: Users,
  },
  takeaways: {
    title: "Inside The Book (10 Key Takeaways)",
    description: "The 10 major learnings and actionable takeaways taught in the book.",
    icon: List,
  },
  endorsements: {
    title: "What Experts Say (Testimonials & Endorsements)",
    description: "Dean William Koehler's featured endorsement and 4 expert reviews.",
    icon: Quote,
  },
  author: {
    title: "About The Author",
    description: "Ambesh Tiwari's author biography and link to the full story.",
    icon: User,
  },
  chapter_cta: {
    title: "Free Chapter 1 Lead Capture",
    description: "Lead capture banner offering Chapter 1 via email with cohort invitation.",
    icon: Mail,
  },
};

export function BookPageEditor() {
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
        .eq("page", "book");

      if (error) {
        console.error("Failed to load book content:", error);
        setContent(EXACT_DEFAULT_BOOK_CONTENT);
        return;
      }

      const map: ContentMap = {};
      (Object.keys(EXACT_DEFAULT_BOOK_CONTENT) as SectionKey[]).forEach((section) => {
        map[section] = { ...EXACT_DEFAULT_BOOK_CONTENT[section] };
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
      console.error("Failed to load book content:", err);
      setContent(EXACT_DEFAULT_BOOK_CONTENT);
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
        page: "book",
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
        channel.postMessage({ page: "book", section, timestamp: Date.now() });
        channel.close();
      } catch (bcErr) {
        console.warn("BroadcastChannel error:", bcErr);
      }
      localStorage.setItem("ambesh-cms-last-update", `book-${section}-${Date.now()}`);

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
        [section]: { ...EXACT_DEFAULT_BOOK_CONTENT[section] },
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
          Loading Book page content...
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
              Book Page CMS
            </span>
            <span className="text-xs text-white/40">7 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Book Page Editor (/book)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit book overview, buy links, audience targets, 10 takeaways, expert quotes, author bio, and free chapter lead capture with 0ms live sync.
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
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
            View Live Page (/book)
          </a>
        </div>
      </div>

      {/* Formatting Tips Card */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-blue-300">Rich Typography & Glowing Gradient Styling</h4>
            <p className="text-xs text-blue-200/70 leading-relaxed">
              Wrap any words in <code className="bg-white/10 px-1 py-0.5 rounded text-blue-200">*asterisks*</code> to turn them into vibrant gradient glowing text (e.g. <code className="bg-white/10 px-1 py-0.5 rounded text-blue-200">Accelerate *With AI.*</code>). Wrap in <code className="bg-white/10 px-1 py-0.5 rounded text-blue-200">[brackets]</code> for underlined serif accents.
            </p>
          </div>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-6">
        {(Object.keys(EXACT_DEFAULT_BOOK_CONTENT) as SectionKey[]).map((section) => {
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
                              placeholder="The book"
                            />
                            <InputField
                              label="Main Heading (Supports *gradient glow*)"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("hero", "heading", v)}
                              placeholder="Accelerate *With AI.*"
                              helperText="Wrap words in *asterisks* to highlight with gradient"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Subheading Italic"
                              value={secContent.subheading_italic || ""}
                              onChange={(v) => updateField("hero", "subheading_italic", v)}
                              placeholder="A simple book for a complicated world."
                            />
                            <InputField
                              label="Bestseller Badge Text"
                              value={secContent.badge_text || ""}
                              onChange={(v) => updateField("hero", "badge_text", v)}
                              placeholder="Amazon Bestseller"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Badge Meta Details"
                              value={secContent.badge_meta || ""}
                              onChange={(v) => updateField("hero", "badge_meta", v)}
                              placeholder="Kindle + Physical · English · 2023"
                            />
                            <TextareaField
                              label="Hero Description"
                              value={secContent.description || ""}
                              onChange={(v) => updateField("hero", "description", v)}
                              placeholder="A must-read for those who not only want to understand AI..."
                              rows={2}
                            />
                          </div>

                          <div className="pt-2 border-t border-white/5 space-y-4">
                            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Purchase Links</h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <InputField
                                label="Kindle Button Text"
                                value={secContent.kindle_btn_text || ""}
                                onChange={(v) => updateField("hero", "kindle_btn_text", v)}
                                placeholder="Read on Kindle"
                              />
                              <InputField
                                label="Kindle Amazon URL"
                                value={secContent.kindle_btn_url || ""}
                                onChange={(v) => updateField("hero", "kindle_btn_url", v)}
                                placeholder="https://www.amazon.in/dp/..."
                              />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <InputField
                                label="Physical Copy Button Text"
                                value={secContent.physical_btn_text || ""}
                                onChange={(v) => updateField("hero", "physical_btn_text", v)}
                                placeholder="Get a Physical Copy"
                              />
                              <InputField
                                label="Physical Amazon URL"
                                value={secContent.physical_btn_url || ""}
                                onChange={(v) => updateField("hero", "physical_btn_url", v)}
                                placeholder="https://www.amazon.in/dp/..."
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 2: PRESS */}
                      {section === "press" && (
                        <div className="space-y-4">
                          <InputField
                            label="Press Section Eyebrow Title"
                            value={secContent.heading || ""}
                            onChange={(v) => updateField("press", "heading", v)}
                            placeholder="Featured In"
                          />
                        </div>
                      )}

                      {/* SECTION 3: AUDIENCES */}
                      {section === "audiences" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("audiences", "eyebrow", v)}
                              placeholder="Who it is for"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("audiences", "heading", v)}
                              placeholder="Written for people who *do real work.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                              <div className="text-xs font-semibold text-violet-400">Audience 1 (Founders)</div>
                              <InputField
                                label="Title"
                                value={secContent.aud1_title || ""}
                                onChange={(v) => updateField("audiences", "aud1_title", v)}
                                placeholder="Business owners and founders"
                              />
                              <TextareaField
                                label="Description"
                                value={secContent.aud1_desc || ""}
                                onChange={(v) => updateField("audiences", "aud1_desc", v)}
                                rows={3}
                              />
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                              <div className="text-xs font-semibold text-pink-400">Audience 2 (Managers)</div>
                              <InputField
                                label="Title"
                                value={secContent.aud2_title || ""}
                                onChange={(v) => updateField("audiences", "aud2_title", v)}
                                placeholder="Team leads and managers"
                              />
                              <TextareaField
                                label="Description"
                                value={secContent.aud2_desc || ""}
                                onChange={(v) => updateField("audiences", "aud2_desc", v)}
                                rows={3}
                              />
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                              <div className="text-xs font-semibold text-amber-400">Audience 3 (Professionals)</div>
                              <InputField
                                label="Title"
                                value={secContent.aud3_title || ""}
                                onChange={(v) => updateField("audiences", "aud3_title", v)}
                                placeholder="Professionals building their career"
                              />
                              <TextareaField
                                label="Description"
                                value={secContent.aud3_desc || ""}
                                onChange={(v) => updateField("audiences", "aud3_desc", v)}
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 4: TAKEAWAYS */}
                      {section === "takeaways" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("takeaways", "eyebrow", v)}
                              placeholder="Inside the book"
                            />
                            <InputField
                              label="Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("takeaways", "heading", v)}
                              placeholder="10 things this book will *teach you.*"
                            />
                            <InputField
                              label="Subtitle"
                              value={secContent.subheading || ""}
                              onChange={(v) => updateField("takeaways", "subheading", v)}
                              placeholder="10 clear takeaways."
                            />
                          </div>

                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                              10 Book Takeaway Items
                            </h4>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                                const key = `item_${num}`;
                                return (
                                  <div key={key} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                    <span className="font-mono text-xs text-white/40 mt-3">{String(num).padStart(2, "0")}</span>
                                    <div className="flex-1">
                                      <AutoTextarea
                                        value={secContent[key] || ""}
                                        onChange={(e) => updateField("takeaways", key, e.target.value)}
                                        rows={2}
                                        placeholder={`Takeaway item #${num}`}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 5: ENDORSEMENTS */}
                      {section === "endorsements" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("endorsements", "eyebrow", v)}
                              placeholder="What experts say"
                            />
                            <InputField
                              label="Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("endorsements", "heading", v)}
                              placeholder="The people who *read it first.*"
                            />
                          </div>

                          {/* Featured Endorsement */}
                          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                              <Award className="h-4 w-4" />
                              Featured Endorsement (Dean Koehler)
                            </div>
                            <TextareaField
                              label="Quote"
                              value={secContent.featured_quote || ""}
                              onChange={(v) => updateField("endorsements", "featured_quote", v)}
                              rows={3}
                            />
                            <div className="grid gap-4 sm:grid-cols-3">
                              <InputField
                                label="Author Name"
                                value={secContent.featured_name || ""}
                                onChange={(v) => updateField("endorsements", "featured_name", v)}
                                placeholder="William Koehler, Ph.D."
                              />
                              <InputField
                                label="Author Role / Title"
                                value={secContent.featured_role || ""}
                                onChange={(v) => updateField("endorsements", "featured_role", v)}
                                placeholder="Dean, Sloane School of Business..."
                              />
                              <InputField
                                label="Initials (Avatar)"
                                value={secContent.featured_initials || ""}
                                onChange={(v) => updateField("endorsements", "featured_initials", v)}
                                placeholder="WK"
                              />
                            </div>
                          </div>

                          {/* 4 Other Endorsements */}
                          <div className="space-y-4 pt-2 border-t border-white/5">
                            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                              Additional Expert Reviews
                            </h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {[
                                { num: 1, title: "Review 1 (Dr. Madhu Dutta-Koehler)" },
                                { num: 2, title: "Review 2 (Aditya Lohia)" },
                                { num: 3, title: "Review 3 (Shyam Sunder)" },
                                { num: 4, title: "Review 4 (Prabhat Sinha)" },
                              ].map((item) => {
                                const qKey = `end${item.num}_quote`;
                                const nKey = `end${item.num}_name`;
                                const rKey = `end${item.num}_role`;
                                return (
                                  <div key={item.num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                    <div className="text-xs font-semibold text-white/70">{item.title}</div>
                                    <TextareaField
                                      label="Quote"
                                      value={secContent[qKey] || ""}
                                      onChange={(v) => updateField("endorsements", qKey, v)}
                                      rows={2}
                                    />
                                    <div className="grid gap-3 sm:grid-cols-2">
                                      <InputField
                                        label="Name"
                                        value={secContent[nKey] || ""}
                                        onChange={(v) => updateField("endorsements", nKey, v)}
                                      />
                                      <InputField
                                        label="Role"
                                        value={secContent[rKey] || ""}
                                        onChange={(v) => updateField("endorsements", rKey, v)}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 6: AUTHOR */}
                      {section === "author" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("author", "eyebrow", v)}
                              placeholder="About the author"
                            />
                            <InputField
                              label="Link Button Text"
                              value={secContent.link_text || ""}
                              onChange={(v) => updateField("author", "link_text", v)}
                              placeholder="Read the full story"
                            />
                            <InputField
                              label="Link URL"
                              value={secContent.link_url || ""}
                              onChange={(v) => updateField("author", "link_url", v)}
                              placeholder="/about"
                            />
                          </div>

                          <TextareaField
                            label="Author Bio Paragraph (Supports *gradient* and _italics_)"
                            value={secContent.bio_text || ""}
                            onChange={(v) => updateField("author", "bio_text", v)}
                            rows={4}
                            placeholder="Ambesh Tiwari is the founder of BDA Technologies..."
                            helperText="Use *text* for glowing gradient highlights and _text_ for elegant serif italics."
                          />
                        </div>
                      )}

                      {/* SECTION 7: CHAPTER CTA */}
                      {section === "chapter_cta" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Badge Tag"
                              value={secContent.tag || ""}
                              onChange={(v) => updateField("chapter_cta", "tag", v)}
                              placeholder="Free"
                            />
                            <InputField
                              label="Main Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("chapter_cta", "heading", v)}
                              placeholder="Get *Chapter 1* on us."
                            />
                            <InputField
                              label="Submit Button Text"
                              value={secContent.btn_text || ""}
                              onChange={(v) => updateField("chapter_cta", "btn_text", v)}
                              placeholder="Send it"
                            />
                          </div>

                          <TextareaField
                            label="CTA Description"
                            value={secContent.description || ""}
                            onChange={(v) => updateField("chapter_cta", "description", v)}
                            rows={2}
                            placeholder="Drop your email. We'll send the first chapter as a PDF..."
                          />

                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Email Field Placeholder"
                              value={secContent.email_placeholder || ""}
                              onChange={(v) => updateField("chapter_cta", "email_placeholder", v)}
                              placeholder="you@company.com"
                            />
                            <InputField
                              label="Recipient Target Email"
                              value={secContent.recipient_email || ""}
                              onChange={(v) => updateField("chapter_cta", "recipient_email", v)}
                              placeholder="hello@ambesh.com"
                            />
                            <InputField
                              label="Training Sub-Link Text"
                              value={secContent.training_link_text || ""}
                              onChange={(v) => updateField("chapter_cta", "training_link_text", v)}
                              placeholder="Or explore AI Knowledge programs"
                            />
                          </div>
                          <InputField
                            label="Training Sub-Link URL"
                            value={secContent.training_link_url || ""}
                            onChange={(v) => updateField("chapter_cta", "training_link_url", v)}
                            placeholder="/training"
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
