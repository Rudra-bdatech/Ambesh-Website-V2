import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Eye,
  Loader2,
  RotateCcw,
  Sparkles,
  Home,
  Flame,
  Layers,
  HelpCircle,
  Quote,
  Briefcase,
  BarChart3,
  User,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/home")({
  component: HomePageEditor,
});

// ─── EXACT 1:1 Default content matching the live index.tsx ───────────────────
export const EXACT_DEFAULT_HOME_CONTENT = {
  hero: {
    eyebrow: "AI Strategist  |  Author  |  Entrepreneur",
    heading: "I Help Founders Scale Their [Service Business] *Without Depending on Them.*",
    subheading:
      "For over 13 years, I've worked across business development, sales, marketing, branding, operations, technology, and entrepreneurship. Today, I help founders simplify their business, build better systems, and use AI where it creates real business value.",
    quote: "A business that only runs when the founder pushes it, is a job with extra steps.",
    floatingBadge1: "13+ Years of Experience",
    floatingBadge2: "100+ Businesses Scaled",
    floatingBadge3: "5,000+ Professionals Trained",
  },
  problems: {
    section_eyebrow: "The Problems I Solve",
    section_heading: "Running a business\nshouldn't feel like\n*putting out fires\nevery day.*",
    section_subheading: "I help founders solve problems like:",
    problem_1: "Everything depends on me to keep the business running",
    problem_2: "My team isn't productive without constant supervision",
    problem_3: "We don't know where AI actually fits in our business",
    problem_4: "Sales and marketing teams aren't aligned or connected",
    problem_5: "We waste too much time on manual, repetitive tasks",
    problem_6: "We have too many software tools but poor execution",
  },
  ease: {
    section_eyebrow: "My Approach",
    section_heading: "Better businesses aren't built by *adding more tools.*",
    section_subheading:
      "They're built by improving the way work gets done. The EASE Framework is a structured path to simplification, clarity, and automation.",
    framework_title: "The EASE Framework",
    stage1_label: "Eliminate",
    stage1_desc: "Remove work that doesn't create value.",
    stage2_label: "Automate",
    stage2_desc: "Use AI only after the process is clear.",
    stage3_label: "Streamline",
    stage3_desc: "Connect people, processes, and technology.",
    stage4_label: "Execute",
    stage4_desc: "Turn ideas into consistent business results.",
  },
  howIHelp: {
    section_eyebrow: "How I Help",
    section_heading: "I Build. I Advise. *I Train.*",
    section_subheading:
      "Practical, hands-on support for founder-led businesses. Building software-driven operations, advising on management processes, and training teams for AI adoption.",
    card1_title: "Build",
    card1_eyebrow: "Operating Systems",
    card1_desc: "I build practical AI products to turn messy business operations into systems people actually use.",
    card2_title: "Advice",
    card2_eyebrow: "Better Ways of Working",
    card2_desc: "I help founders improve systems, align execution rhythms, and drive practical AI adoption across the team.",
    card3_title: "Train",
    card3_eyebrow: "Practical AI Training",
    card3_desc: "I help teams & professionals to use AI in their daily work, not only learn about new tools.",
  },
  testimonials: {
    section_eyebrow: "What clients say",
    section_heading: "Results that speak *for themselves.*",
    t1_quote:
      "Ambesh didn't just teach AI — he rewired how our team thinks about work. Three months later, we've cut manual reporting time by 60% and our managers actually own their numbers.",
    t1_name: "Chief Operating Officer",
    t1_role: "Mid-size Financial Services Firm",
    t2_quote:
      "We've had plenty of consultants come in with slides. Ambesh came in with a system. The SOPs, the accountability structure, the AI workflows — it all clicked together in weeks, not quarters.",
    t2_name: "Founder & CEO",
    t2_role: "E-commerce Brand, UAE",
    t3_quote:
      "The session rating doesn't lie — 9.6 out of 10 from a room of sceptical senior managers. He made AI feel practical, not threatening. People left wanting to try things the very next day.",
    t3_name: "Head of Learning & Development",
    t3_role: "Large Retail Group, India",
  },
  ventures: {
    section_eyebrow: "Brands and Products",
    section_heading: "I do not only advise.\n*I build.*",
    section_subheading:
      "Building products has taught me lessons that cannot be learned from presentations. You have to understand customers, make difficult choices, work with a team, manage costs and make the product useful enough for people to keep using it.",
    v1_title: "BDA Technologies",
    v1_eyebrow: "Business systems & automation",
    v1_desc: "BDA Technologies helps founder-led businesses improve reporting, workflows, dashboards, automation and use of AI.",
    v2_title: "LinkAssist",
    v2_eyebrow: "AI support for LinkedIn authority",
    v2_desc: "LinkAssist helps professionals find ideas, write stronger LinkedIn content and build authority with more consistency.",
    v3_title: "Automation School",
    v3_eyebrow: "AI Training For Professionals",
    v3_desc: "Practical AI training courses and customized corporate programs designed for hands-on operational adoption.",
  },
  stats: {
    section_eyebrow: "Selected Work",
    section_heading: "Work across companies, *teams and institutions.*",
    section_subheading:
      "I have worked with founders, corporate teams, professional bodies, educational institutions and government organisations.",
    stat1_value: "5,000+",
    stat1_label: "Professionals trained",
    stat2_value: "150+",
    stat2_label: "Sessions and engagements",
    stat3_value: "11+",
    stat3_label: "Industries delivered in",
    stat4_value: "9.5/10",
    stat4_label: "Average session rating",
  },
  about: {
    section_eyebrow: "About",
    section_heading: "Meet *Ambesh.*",
    intro: "I am Ambesh Tiwari, an AI Trainer, Business Systems Consultant, author and founder of BDA Technologies.",
    quote: "They were caused by unclear systems and inconsistent execution.",
    closing: "Today, I help businesses close that gap. I help founders build businesses that are simpler to run and easier to grow.",
  },
  book: {
    section_eyebrow: "THE BOOK",
    section_heading: "Accelerate *with AI.*",
    section_subheading: "A simple guide to using AI in business.",
    desc: "Accelerate with AI helps founders and professionals understand what AI can do and how they can start using it in practical work.",
  },
  cta: {
    heading: "Ready to Build a Business *That Runs Better?*",
    subheading:
      "Let's talk about your business, your goals, and where AI and better systems can create the biggest impact.",
    button_text: "Book a Strategy Call",
    note: "Responds within 24 hours. No sales script. Just a real conversation.",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_HOME_CONTENT;
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
    title: "Hero & Positioning",
    description: "Main tagline, headline, subheading, founder quote, and floating metric badges.",
    icon: Home,
  },
  problems: {
    title: "The Problems I Solve (6 Cards)",
    description: "Section headline and 6 core founder pain point cards.",
    icon: Flame,
  },
  ease: {
    title: "The EASE Framework (4 Stages)",
    description: "Approach headline, framework name, and 4 operational stages.",
    icon: Layers,
  },
  howIHelp: {
    title: "How I Help (Build, Advise, Train)",
    description: "Service pillars: Operating Systems, Better Ways of Working, Practical AI Training.",
    icon: HelpCircle,
  },
  testimonials: {
    title: "Client Testimonials & Results",
    description: "Client reviews, executive quotes, and organizational outcomes.",
    icon: Quote,
  },
  ventures: {
    title: "Brands and Products (Ventures)",
    description: "BDA Technologies, LinkAssist, Automation School portfolio cards.",
    icon: Briefcase,
  },
  stats: {
    title: "Selected Work Stats & Metrics",
    description: "4 Key quantifiable proof metrics (Trained, Engagements, Industries, Rating).",
    icon: BarChart3,
  },
  about: {
    title: "About Ambesh Teaser",
    description: "Brief founder intro, philosophy quote, and closing mission statement.",
    icon: User,
  },
  book: {
    title: "Accelerate with AI Book Spotlight",
    description: "Book banner, subheading, and description overview.",
    icon: BookOpen,
  },
  cta: {
    title: "Closing Call to Action",
    description: "Strategy call CTA banner, button text, and response time promise note.",
    icon: ArrowRight,
  },
};

export function HomePageEditor() {
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
        .eq("page", "home");

      if (error) {
        console.error("Failed to load home content:", error);
        setContent(EXACT_DEFAULT_HOME_CONTENT);
        return;
      }

      const map: ContentMap = {};
      (Object.keys(EXACT_DEFAULT_HOME_CONTENT) as SectionKey[]).forEach((section) => {
        map[section] = { ...EXACT_DEFAULT_HOME_CONTENT[section] };
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
      console.error("Failed to load home content:", err);
      setContent(EXACT_DEFAULT_HOME_CONTENT);
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
        page: "home",
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
        channel.postMessage({ page: "home", section, timestamp: Date.now() });
        channel.close();
      } catch (bcErr) {
        console.warn("BroadcastChannel error:", bcErr);
      }
      localStorage.setItem("ambesh-cms-last-update", `home-${section}-${Date.now()}`);
      try {
        localStorage.setItem("cms-updated-home", Date.now().toString());
      } catch (_) {}

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
        [section]: { ...EXACT_DEFAULT_HOME_CONTENT[section] },
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
          Loading Home page content...
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
              <Home className="h-3.5 w-3.5" />
              Home Page CMS
            </span>
            <span className="text-xs text-white/40">10 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Home Page Editor (/)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit hero copy, problems, EASE framework, pillars, client quotes, ventures, stats, and CTAs with 0ms live sync.
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
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
            View Live Page (/)
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
              Wrap words in <code className="bg-white/10 px-1 py-0.5 rounded text-blue-200">*asterisks*</code> for vibrant gradient glowing text, and <code className="bg-white/10 px-1 py-0.5 rounded text-blue-200">[brackets]</code> for underlined serif accents.
            </p>
          </div>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-6">
        {(Object.keys(EXACT_DEFAULT_HOME_CONTENT) as SectionKey[]).map((section) => {
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
                              label="Eyebrow Tagline"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("hero", "eyebrow", v)}
                              placeholder="AI Strategist | Author | Entrepreneur"
                            />
                            <InputField
                              label="Main Headline (Supports [brackets] & *gradients*)"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("hero", "heading", v)}
                              placeholder="I Help Founders Scale Their [Service Business] *Without Depending on Them.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <TextareaField
                              label="Hero Subheading"
                              value={secContent.subheading || ""}
                              onChange={(v) => updateField("hero", "subheading", v)}
                              rows={3}
                            />
                            <TextareaField
                              label="Featured Founder Quote"
                              value={secContent.quote || ""}
                              onChange={(v) => updateField("hero", "quote", v)}
                              rows={3}
                            />
                          </div>

                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Floating Badges</h4>
                            <div className="grid gap-4 sm:grid-cols-3">
                              <InputField
                                label="Floating Badge 1"
                                value={secContent.floatingBadge1 || ""}
                                onChange={(v) => updateField("hero", "floatingBadge1", v)}
                                placeholder="13+ Years of Experience"
                              />
                              <InputField
                                label="Floating Badge 2"
                                value={secContent.floatingBadge2 || ""}
                                onChange={(v) => updateField("hero", "floatingBadge2", v)}
                                placeholder="100+ Businesses Scaled"
                              />
                              <InputField
                                label="Floating Badge 3"
                                value={secContent.floatingBadge3 || ""}
                                onChange={(v) => updateField("hero", "floatingBadge3", v)}
                                placeholder="5,000+ Professionals Trained"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 2: PROBLEMS */}
                      {section === "problems" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.section_eyebrow || ""}
                              onChange={(v) => updateField("problems", "section_eyebrow", v)}
                              placeholder="The Problems I Solve"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.section_heading || ""}
                              onChange={(v) => updateField("problems", "section_heading", v)}
                              placeholder="Running a business shouldn't feel like *putting out fires every day.*"
                            />
                            <InputField
                              label="Subheading Intro"
                              value={secContent.section_subheading || ""}
                              onChange={(v) => updateField("problems", "section_subheading", v)}
                              placeholder="I help founders solve problems like:"
                            />
                          </div>

                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">6 Founder Pain Points</h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {[1, 2, 3, 4, 5, 6].map((num) => {
                                const key = `problem_${num}`;
                                return (
                                  <InputField
                                    key={key}
                                    label={`Problem #${num}`}
                                    value={secContent[key] || ""}
                                    onChange={(v) => updateField("problems", key, v)}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 3: EASE */}
                      {section === "ease" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.section_eyebrow || ""}
                              onChange={(v) => updateField("ease", "section_eyebrow", v)}
                              placeholder="My Approach"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.section_heading || ""}
                              onChange={(v) => updateField("ease", "section_heading", v)}
                              placeholder="Better businesses aren't built by *adding more tools.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Framework Title"
                              value={secContent.framework_title || ""}
                              onChange={(v) => updateField("ease", "framework_title", v)}
                              placeholder="The EASE Framework"
                            />
                            <TextareaField
                              label="Subheading Explanation"
                              value={secContent.section_subheading || ""}
                              onChange={(v) => updateField("ease", "section_subheading", v)}
                              rows={2}
                            />
                          </div>

                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">4 EASE Framework Stages</h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {[
                                { num: 1, defaultL: "Eliminate" },
                                { num: 2, defaultL: "Automate" },
                                { num: 3, defaultL: "Streamline" },
                                { num: 4, defaultL: "Execute" },
                              ].map((stg) => {
                                const lKey = `stage${stg.num}_label`;
                                const dKey = `stage${stg.num}_desc`;
                                return (
                                  <div key={stg.num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                    <InputField
                                      label={`Stage ${stg.num} Label`}
                                      value={secContent[lKey] || ""}
                                      onChange={(v) => updateField("ease", lKey, v)}
                                      placeholder={stg.defaultL}
                                    />
                                    <TextareaField
                                      label={`Stage ${stg.num} Description`}
                                      value={secContent[dKey] || ""}
                                      onChange={(v) => updateField("ease", dKey, v)}
                                      rows={2}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 4: HOW I HELP */}
                      {section === "howIHelp" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.section_eyebrow || ""}
                              onChange={(v) => updateField("howIHelp", "section_eyebrow", v)}
                              placeholder="How I Help"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.section_heading || ""}
                              onChange={(v) => updateField("howIHelp", "section_heading", v)}
                              placeholder="I Build. I Advise. *I Train.*"
                            />
                          </div>

                          <TextareaField
                            label="Section Subheading"
                            value={secContent.section_subheading || ""}
                            onChange={(v) => updateField("howIHelp", "section_subheading", v)}
                            rows={2}
                          />

                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">3 Core Pillars</h4>
                            <div className="grid gap-4 sm:grid-cols-3">
                              {[
                                { num: 1, color: "text-violet-400" },
                                { num: 2, color: "text-blue-400" },
                                { num: 3, color: "text-amber-400" },
                              ].map((item) => {
                                const tKey = `card${item.num}_title`;
                                const eKey = `card${item.num}_eyebrow`;
                                const dKey = `card${item.num}_desc`;
                                return (
                                  <div key={item.num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                    <div className={`text-xs font-semibold ${item.color}`}>Card #{item.num}</div>
                                    <InputField
                                      label="Title"
                                      value={secContent[tKey] || ""}
                                      onChange={(v) => updateField("howIHelp", tKey, v)}
                                    />
                                    <InputField
                                      label="Eyebrow"
                                      value={secContent[eKey] || ""}
                                      onChange={(v) => updateField("howIHelp", eKey, v)}
                                    />
                                    <TextareaField
                                      label="Description"
                                      value={secContent[dKey] || ""}
                                      onChange={(v) => updateField("howIHelp", dKey, v)}
                                      rows={3}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 5: TESTIMONIALS */}
                      {section === "testimonials" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.section_eyebrow || ""}
                              onChange={(v) => updateField("testimonials", "section_eyebrow", v)}
                              placeholder="What clients say"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.section_heading || ""}
                              onChange={(v) => updateField("testimonials", "section_heading", v)}
                              placeholder="Results that speak *for themselves.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-3">
                            {[1, 2, 3].map((num) => {
                              const qKey = `t${num}_quote`;
                              const nKey = `t${num}_name`;
                              const rKey = `t${num}_role`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="text-xs font-semibold text-blue-400">Testimonial #{num}</div>
                                  <TextareaField
                                    label="Quote"
                                    value={secContent[qKey] || ""}
                                    onChange={(v) => updateField("testimonials", qKey, v)}
                                    rows={3}
                                  />
                                  <InputField
                                    label="Name"
                                    value={secContent[nKey] || ""}
                                    onChange={(v) => updateField("testimonials", nKey, v)}
                                  />
                                  <InputField
                                    label="Role & Company"
                                    value={secContent[rKey] || ""}
                                    onChange={(v) => updateField("testimonials", rKey, v)}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 6: VENTURES */}
                      {section === "ventures" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.section_eyebrow || ""}
                              onChange={(v) => updateField("ventures", "section_eyebrow", v)}
                              placeholder="Brands and Products"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.section_heading || ""}
                              onChange={(v) => updateField("ventures", "section_heading", v)}
                              placeholder="I do not only advise. *I build.*"
                            />
                          </div>

                          <TextareaField
                            label="Section Subheading"
                            value={secContent.section_subheading || ""}
                            onChange={(v) => updateField("ventures", "section_subheading", v)}
                            rows={2}
                          />

                          <div className="grid gap-4 sm:grid-cols-3">
                            {[1, 2, 3].map((num) => {
                              const tKey = `v${num}_title`;
                              const eKey = `v${num}_eyebrow`;
                              const dKey = `v${num}_desc`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="text-xs font-semibold text-blue-400">Venture #{num}</div>
                                  <InputField
                                    label="Venture Name"
                                    value={secContent[tKey] || ""}
                                    onChange={(v) => updateField("ventures", tKey, v)}
                                  />
                                  <InputField
                                    label="Category Tagline"
                                    value={secContent[eKey] || ""}
                                    onChange={(v) => updateField("ventures", eKey, v)}
                                  />
                                  <TextareaField
                                    label="Description"
                                    value={secContent[dKey] || ""}
                                    onChange={(v) => updateField("ventures", dKey, v)}
                                    rows={3}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 7: STATS */}
                      {section === "stats" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.section_eyebrow || ""}
                              onChange={(v) => updateField("stats", "section_eyebrow", v)}
                              placeholder="Selected Work"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.section_heading || ""}
                              onChange={(v) => updateField("stats", "section_heading", v)}
                              placeholder="Work across companies, *teams and institutions.*"
                            />
                          </div>

                          <TextareaField
                            label="Section Subheading"
                            value={secContent.section_subheading || ""}
                            onChange={(v) => updateField("stats", "section_subheading", v)}
                            rows={2}
                          />

                          <div className="grid gap-4 sm:grid-cols-4">
                            {[1, 2, 3, 4].map((num) => {
                              const vKey = `stat${num}_value`;
                              const lKey = `stat${num}_label`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <InputField
                                    label={`Stat #${num} Value`}
                                    value={secContent[vKey] || ""}
                                    onChange={(v) => updateField("stats", vKey, v)}
                                    placeholder="5,000+"
                                  />
                                  <InputField
                                    label={`Stat #${num} Label`}
                                    value={secContent[lKey] || ""}
                                    onChange={(v) => updateField("stats", lKey, v)}
                                    placeholder="Professionals trained"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 8: ABOUT */}
                      {section === "about" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.section_eyebrow || ""}
                              onChange={(v) => updateField("about", "section_eyebrow", v)}
                              placeholder="About"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.section_heading || ""}
                              onChange={(v) => updateField("about", "section_heading", v)}
                              placeholder="Meet *Ambesh.*"
                            />
                          </div>

                          <TextareaField
                            label="Intro Paragraph"
                            value={secContent.intro || ""}
                            onChange={(v) => updateField("about", "intro", v)}
                            rows={2}
                          />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <TextareaField
                              label="Quote Highlight"
                              value={secContent.quote || ""}
                              onChange={(v) => updateField("about", "quote", v)}
                              rows={2}
                            />
                            <TextareaField
                              label="Closing Statement"
                              value={secContent.closing || ""}
                              onChange={(v) => updateField("about", "closing", v)}
                              rows={2}
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 9: BOOK */}
                      {section === "book" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.section_eyebrow || ""}
                              onChange={(v) => updateField("book", "section_eyebrow", v)}
                              placeholder="THE BOOK"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.section_heading || ""}
                              onChange={(v) => updateField("book", "section_heading", v)}
                              placeholder="Accelerate *with AI.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Subheading / Tagline"
                              value={secContent.section_subheading || ""}
                              onChange={(v) => updateField("book", "section_subheading", v)}
                              placeholder="A simple guide to using AI in business."
                            />
                            <TextareaField
                              label="Book Summary"
                              value={secContent.desc || ""}
                              onChange={(v) => updateField("book", "desc", v)}
                              rows={2}
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 10: CTA */}
                      {section === "cta" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="CTA Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("cta", "heading", v)}
                              placeholder="Ready to Build a Business *That Runs Better?*"
                            />
                            <InputField
                              label="Button Text"
                              value={secContent.button_text || ""}
                              onChange={(v) => updateField("cta", "button_text", v)}
                              placeholder="Book a Strategy Call"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <TextareaField
                              label="CTA Subheading"
                              value={secContent.subheading || ""}
                              onChange={(v) => updateField("cta", "subheading", v)}
                              rows={2}
                            />
                            <InputField
                              label="Trust Note Below Button"
                              value={secContent.note || ""}
                              onChange={(v) => updateField("cta", "note", v)}
                              placeholder="Responds within 24 hours. No sales script."
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
