import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
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
  User,
  Quote,
  BookOpen,
  Brain,
  Wrench,
  Shield,
  Layers,
  Milestone,
  Boxes,
  MessageSquare,
  Sparkle,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/about")({
  component: AboutPageEditor,
});

// ─── EXACT 1:1 Default content matching the live about.tsx ───────────────────
export const EXACT_DEFAULT_ABOUT_CONTENT = {
  hero: {
    eyebrow: "About",
    heading: "I help founders turn business chaos *into systems.*",
    subheading:
      "I am Ambesh Tiwari, a practical AI adoption partner, automation strategist, author, and founder of BDA Technologies. My work combines hands-on training, custom workflow design, and process implementation to help organizations run without founder dependency.",
    button_text: "Work With Ambesh",
    since: "Building since 2017",
  },
  pullQuote: {
    eyebrow: "A line he keeps coming back to",
    quote_p1: "You don't need to be perfect in everything to achieve your dreams.",
    quote_p2: "You just have to find someone who knows what you don't.",
  },
  story: {
    eyebrow: "The story",
    heading: "From small town to building across *three continents.*",
    paragraph_1:
      "I started by helping people understand AI and automation in a practical way. Over time, one pattern became clear: most businesses do not struggle because they lack tools. They struggle because their execution depends too much on the founder.",
    paragraph_2:
      "The founder knows what matters. The founder remembers the follow-ups. The founder connects the dots. The founder checks progress. The founder becomes the operating system.",
    paragraph_3:
      "That works in the beginning. But it becomes a bottleneck as the business grows.",
    paragraph_4:
      "Today, my work is focused on helping founder-led businesses build AI-powered operating systems that bring visibility, accountability, workflows, SOPs, automations, and execution routines into one practical structure.",
  },
  howIThink: {
    eyebrow: "How I Think",
    heading: "Ideas that guide\n*my work.*",
    subheading:
      "These core beliefs shape how I help founders automate operations, scale teams, and build self-managing companies.",
    belief1_title: "A business should not depend on the founder.",
    belief1_desc:
      "Founder dependency is structural, not personal. It is resolved with clear accountability, SOPs, and system design.",
    belief2_title: "AI adoption matters more than AI awareness.",
    belief2_desc:
      "Workshops have limited value unless teams change how they work. Real training requires daily AI adoption rhythms.",
    belief3_title: "Do not automate a process you do not understand.",
    belief3_desc:
      "Automation makes clean processes faster, but broken ones fail faster. Map the workflow manually before coding.",
    belief4_title: "Technology is only one part of the answer.",
    belief4_desc:
      "Clear roles and accountability matter more than new tools. Tech accelerates, but human execution is the foundation.",
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "What Ambesh is *hired for.*",
    subheading:
      "Providing a complete bridge between workflow strategy, people training, and automated systems implementation.",
    hired1_title: "AI Training & Workshops",
    hired1_desc:
      "Hands-on, department-specific training programs designed to turn technology confusion into immediate daily usage. Built around your team's real workflows and actual tasks.",
    hired2_title: "Workflow & Systems Strategy",
    hired2_desc:
      "Designing the operating cadence, documenting SOPs, and building management tracking systems so operations run smoothly without founder bottlenecks.",
    hired3_title: "Custom AI & Automation Install",
    hired3_desc:
      "Building lean, custom AI integrations and automation flows - supported by BDA Technologies - to eliminate repetitive manual work across departments.",
  },
  beliefs: {
    eyebrow: "What he believes",
    heading: "Four beliefs that shape *every engagement.*",
    b1_title: "AI needs a process, not just tools.",
    b1_desc:
      "An LLM is only as good as the workflow it sits in. If the process is broken, AI just makes mistakes faster.",
    b2_title: "Founders should not be the operating system.",
    b2_desc:
      "A business scales when decisions, guidelines and reviews are documented and owned by the team, not trapped in the founder's head.",
    b3_title: "Lean technology stacks beat complex ones.",
    b3_desc:
      "Most companies do not need expensive new enterprise software. They need their existing tools connected with simple, smart automation.",
    b4_title: "Adoption happens inside real work.",
    b4_desc:
      "Training is useless if the team does not apply it to their actual tasks in the first week. Every workshop must be built around live projects.",
  },
  roles: {
    eyebrow: "Three roles, one thread",
    heading: "Entrepreneur. Builder. *Teacher.*",
    subheading:
      "Not a typical trainer. Someone who builds what he teaches, and teaches what he builds.",
    r1_title: "Entrepreneur",
    r1_desc:
      "Founded BDA Technologies in 2017. Eight years of building a company, managing clients, growing revenue, making mistakes and learning from them. Everything Ambesh teaches about business comes from having done it.",
    r2_title: "Builder",
    r2_desc:
      "Shipped three AI-native products in the last year: LinkAssist (LinkedIn authority), HireAssist (recruitment AI), and TaskAssist (productivity AI). All built with the same tools and approach he teaches in workshops.",
    r3_title: "Teacher",
    r3_desc:
      "Author of Accelerate with AI. Host of Inspire with Ambesh (30+ episodes). Founder of Automation School. Trained 5,000+ professionals across 50+ organisations in 11 industries.",
  },
  journey: {
    eyebrow: "The journey",
    heading: "From small town to training teams across *three continents.*",
    j1_year: "Small Town",
    j1_title: "Where it started",
    j1_desc:
      "Grew up in a middle-class family. Curious, restless, never quite fit the mould. Tried joining the Indian Army. Did not make it. Kept the discipline.",
    j2_year: "Engineering + MBA",
    j2_title: "Building the foundation",
    j2_desc:
      "BTech in Electronics and Telecommunication (BPUT, Odisha). MBA in International Marketing (Symbiosis, Pune). Brand Management from the University of London.",
    j3_year: "Zen Technologies",
    j3_title: "First corporate chapter",
    j3_desc:
      "Three promotions in three years. Trained defence and police teams on simulators. Discovered a talent for business development. Resigned to build something of his own.",
    j4_year: "2017",
    j4_title: "BDA Technologies",
    j4_desc:
      "Founded Building Digital Arena in Delhi. A growth and digital transformation agency. StartupIndia recognised. Google, Meta and Shopify partnerships.",
    j5_year: "2023",
    j5_title: "AI pivot",
    j5_desc:
      "Built a working tool with AI in two minutes. Realised what had just changed. Shifted entirely to AI training and product development.",
    j6_year: "2023",
    j6_title: "Automation School",
    j6_desc:
      "Launched an online learning platform for professionals building AI and automation skills.",
    j7_year: "2024",
    j7_title: "Book + Podcast",
    j7_desc:
      "Published Accelerate with AI. Launched Inspire with Ambesh. 30+ podcast episodes with founders and operators.",
    j8_year: "2025",
    j8_title: "Products + International",
    j8_desc:
      "Shipped LinkAssist, HireAssist, TaskAssist. Delivered training at Landmark Group (Dubai), ISB (Hyderabad), Ministry of Finance (Tanzania).",
  },
  builds: {
    eyebrow: "Built along the way",
    heading: "One company. One school. *Three products.*",
    subheading: "Everything here started as something Ambesh needed for his own work.",
    b1_name: "BDA Technologies",
    b1_year: "2017",
    b1_desc: "AI transformation and growth agency. The home base.",
    b1_link: "https://bdatechnologies.com",
    b2_name: "Automation School",
    b2_year: "2023",
    b2_desc: "Online learning for professionals. Structured courses on AI and automation.",
    b2_link: "https://automationschool.in",
    b3_name: "LinkAssist",
    b3_year: "2025",
    b3_desc: "AI-powered LinkedIn authority building.",
    b3_link: "https://linkassist.ai",
    b4_name: "HireAssist",
    b4_year: "2025",
    b4_desc: "AI assistant for recruitment workflows.",
    b4_link: "https://hireassist.org",
    b5_name: "TaskAssist",
    b5_year: "2025",
    b5_desc: "AI productivity tool for overwhelmed professionals.",
    b5_link: "#",
    b6_name: "BDA OS",
    b6_year: "2026",
    b6_desc:
      "An AI-powered business operating system designed to streamline workflows, automate operations, and help organizations scale with intelligent processes.",
    b6_link: "https://bdatechnologies.com",
  },
  testimonials: {
    eyebrow: "What people say",
    heading: "About working *together.*",
    subheading:
      "The best feedback arrives weeks after the session, when something in the team has quietly changed.",
    t1_quote: "One specific observation from a real client.",
    t1_role: "VP, Financial Services (name withheld)",
    t2_quote: "Another quiet, weeks-after-the-session note from a team lead.",
    t2_role: "Director, Retail Group (name withheld)",
    t3_quote: "A third real, permissioned quote will replace this once collected.",
    t3_role: "Head of L&D, Public Sector (name withheld)",
  },
  knowables: {
    eyebrow: "A few things worth knowing",
    heading: "Small details that shape *how Ambesh works.*",
    item_1:
      "Grew up in small-town. The first person in many rooms who understands both sides of the technology divide.",
    item_2:
      "Three promotions in three years at his first job. Then he quit to build his own thing. That tells you something about how he thinks.",
    item_3:
      "Tried joining the Indian Army. Multiple times. Did not make it. Kept the discipline. Named his company's logo colour dark olive green because of it.",
    item_4:
      "He believes the best way to learn AI is to build something useless with it first. The useful things come later.",
    item_5: "Based in Delhi. Happy to travel for a room worth being in.",
  },
  cta: {
    eyebrow: "Final word",
    heading: "If any of this resonates, *let us have a conversation.*",
    subheading:
      "Thirty minutes. No pitch deck. No pressure. Just a real discussion about what your team needs and whether we are the right fit for each other.",
    button_text: "Book a Strategy Call",
    email: "hello@ambesh.com",
    note: "Responds within 24 hours",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_ABOUT_CONTENT;
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
    title: "Hero & Bio Intro",
    description: "Main headline, introductory bio, CTA button label, and founding badge.",
    icon: User,
  },
  pullQuote: {
    title: "Signature Pull Quote",
    description: "Core philosophy quote featured in prominent callout box.",
    icon: Quote,
  },
  story: {
    title: "The Story & Background (4 Paragraphs)",
    description: "Founder journey, the origin story, and systemic bottlenecks.",
    icon: BookOpen,
  },
  howIThink: {
    title: "How I Think (4 Core Beliefs)",
    description: "Operational beliefs on founder dependency, AI adoption, and workflows.",
    icon: Brain,
  },
  capabilities: {
    title: "Capabilities (What Ambesh is Hired For)",
    description: "AI Training, Workflow Strategy, and Custom Automation implementation.",
    icon: Wrench,
  },
  beliefs: {
    title: "Four Engagement Beliefs",
    description: "Principles guiding every corporate consulting engagement.",
    icon: Shield,
  },
  roles: {
    title: "Three Roles (Entrepreneur, Builder, Teacher)",
    description: "Triple-threat positioning: Founder, AI builder, and keynote trainer.",
    icon: Layers,
  },
  journey: {
    title: "Journey Timeline (8 Milestones)",
    description: "Chronological journey from small town, engineering, Zen Tech to BDA OS.",
    icon: Milestone,
  },
  builds: {
    title: "Built Along The Way (6 Products)",
    description: "BDA Technologies, Automation School, LinkAssist, HireAssist, TaskAssist, BDA OS.",
    icon: Boxes,
  },
  testimonials: {
    title: "What People Say (3 Reviews)",
    description: "Quiet observations from senior corporate leaders.",
    icon: MessageSquare,
  },
  knowables: {
    title: "A Few Things Worth Knowing (5 Facts)",
    description: "Personal insights, quirks, army discipline, and work philosophy.",
    icon: Sparkle,
  },
  cta: {
    title: "Closing Call to Action",
    description: "Final word, strategy call booking, and response guarantee.",
    icon: ArrowRight,
  },
};

export function AboutPageEditor() {
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
        .eq("page", "about");

      if (error) {
        console.error("Failed to load about content:", error);
        setContent(EXACT_DEFAULT_ABOUT_CONTENT);
        return;
      }

      const map: ContentMap = {};
      (Object.keys(EXACT_DEFAULT_ABOUT_CONTENT) as SectionKey[]).forEach((section) => {
        map[section] = { ...EXACT_DEFAULT_ABOUT_CONTENT[section] };
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
      console.error("Failed to load about content:", err);
      setContent(EXACT_DEFAULT_ABOUT_CONTENT);
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
        page: "about",
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
        channel.postMessage({ page: "about", section, timestamp: Date.now() });
        channel.close();
      } catch (bcErr) {
        console.warn("BroadcastChannel error:", bcErr);
      }
      localStorage.setItem("ambesh-cms-last-update", `about-${section}-${Date.now()}`);
      try {
        localStorage.setItem("cms-updated-about", Date.now().toString());
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
        [section]: { ...EXACT_DEFAULT_ABOUT_CONTENT[section] },
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
          Loading About page content...
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
              <User className="h-3.5 w-3.5" />
              About Page CMS
            </span>
            <span className="text-xs text-white/40">12 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            About Page Editor (/about)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit biography, story, 8 journey milestones, capabilities, 6 products built, beliefs, and quotes with zero-delay live sync.
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
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
            View Live Page (/about)
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
        {(Object.keys(EXACT_DEFAULT_ABOUT_CONTENT) as SectionKey[]).map((section) => {
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
                              placeholder="About"
                            />
                            <InputField
                              label="Headline (Supports *gradients*)"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("hero", "heading", v)}
                              placeholder="I help founders turn business chaos *into systems.*"
                            />
                          </div>

                          <TextareaField
                            label="Introductory Subheading"
                            value={secContent.subheading || ""}
                            onChange={(v) => updateField("hero", "subheading", v)}
                            rows={3}
                          />

                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Hero Button Text"
                              value={secContent.button_text || ""}
                              onChange={(v) => updateField("hero", "button_text", v)}
                              placeholder="Work With Ambesh"
                            />
                            <InputField
                              label="Building Since Badge"
                              value={secContent.since || ""}
                              onChange={(v) => updateField("hero", "since", v)}
                              placeholder="Building since 2017"
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 2: PULL QUOTE */}
                      {section === "pullQuote" && (
                        <div className="space-y-4">
                          <InputField
                            label="Quote Eyebrow Tag"
                            value={secContent.eyebrow || ""}
                            onChange={(v) => updateField("pullQuote", "eyebrow", v)}
                            placeholder="A line he keeps coming back to"
                          />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <TextareaField
                              label="Quote Part 1"
                              value={secContent.quote_p1 || ""}
                              onChange={(v) => updateField("pullQuote", "quote_p1", v)}
                              rows={2}
                            />
                            <TextareaField
                              label="Quote Part 2"
                              value={secContent.quote_p2 || ""}
                              onChange={(v) => updateField("pullQuote", "quote_p2", v)}
                              rows={2}
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 3: STORY */}
                      {section === "story" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("story", "eyebrow", v)}
                              placeholder="The story"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("story", "heading", v)}
                              placeholder="From small town to building across *three continents.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <TextareaField
                              label="Paragraph 1 (The struggle)"
                              value={secContent.paragraph_1 || ""}
                              onChange={(v) => updateField("story", "paragraph_1", v)}
                              rows={3}
                            />
                            <TextareaField
                              label="Paragraph 2 (Founder trap)"
                              value={secContent.paragraph_2 || ""}
                              onChange={(v) => updateField("story", "paragraph_2", v)}
                              rows={3}
                            />
                            <TextareaField
                              label="Paragraph 3 (Bottleneck)"
                              value={secContent.paragraph_3 || ""}
                              onChange={(v) => updateField("story", "paragraph_3", v)}
                              rows={3}
                            />
                            <TextareaField
                              label="Paragraph 4 (Operating systems resolution)"
                              value={secContent.paragraph_4 || ""}
                              onChange={(v) => updateField("story", "paragraph_4", v)}
                              rows={3}
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 4: HOW I THINK */}
                      {section === "howIThink" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("howIThink", "eyebrow", v)}
                              placeholder="How I Think"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("howIThink", "heading", v)}
                              placeholder="Ideas that guide *my work.*"
                            />
                          </div>
                          <TextareaField
                            label="Section Subheading"
                            value={secContent.subheading || ""}
                            onChange={(v) => updateField("howIThink", "subheading", v)}
                            rows={2}
                          />

                          <div className="grid gap-4 sm:grid-cols-2">
                            {[1, 2, 3, 4].map((num) => {
                              const tKey = `belief${num}_title`;
                              const dKey = `belief${num}_desc`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="text-xs font-semibold text-blue-400">Belief #{num}</div>
                                  <InputField
                                    label="Title"
                                    value={secContent[tKey] || ""}
                                    onChange={(v) => updateField("howIThink", tKey, v)}
                                  />
                                  <TextareaField
                                    label="Description"
                                    value={secContent[dKey] || ""}
                                    onChange={(v) => updateField("howIThink", dKey, v)}
                                    rows={2}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 5: CAPABILITIES */}
                      {section === "capabilities" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("capabilities", "eyebrow", v)}
                              placeholder="Capabilities"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("capabilities", "heading", v)}
                              placeholder="What Ambesh is *hired for.*"
                            />
                          </div>
                          <TextareaField
                            label="Section Subheading"
                            value={secContent.subheading || ""}
                            onChange={(v) => updateField("capabilities", "subheading", v)}
                            rows={2}
                          />

                          <div className="grid gap-4 sm:grid-cols-3">
                            {[1, 2, 3].map((num) => {
                              const tKey = `hired${num}_title`;
                              const dKey = `hired${num}_desc`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="text-xs font-semibold text-purple-400">Capability #{num}</div>
                                  <InputField
                                    label="Title"
                                    value={secContent[tKey] || ""}
                                    onChange={(v) => updateField("capabilities", tKey, v)}
                                  />
                                  <TextareaField
                                    label="Description"
                                    value={secContent[dKey] || ""}
                                    onChange={(v) => updateField("capabilities", dKey, v)}
                                    rows={3}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 6: BELIEFS */}
                      {section === "beliefs" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("beliefs", "eyebrow", v)}
                              placeholder="What he believes"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("beliefs", "heading", v)}
                              placeholder="Four beliefs that shape *every engagement.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            {[1, 2, 3, 4].map((num) => {
                              const tKey = `b${num}_title`;
                              const dKey = `b${num}_desc`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="text-xs font-semibold text-blue-400">Belief #{num}</div>
                                  <InputField
                                    label="Title"
                                    value={secContent[tKey] || ""}
                                    onChange={(v) => updateField("beliefs", tKey, v)}
                                  />
                                  <TextareaField
                                    label="Description"
                                    value={secContent[dKey] || ""}
                                    onChange={(v) => updateField("beliefs", dKey, v)}
                                    rows={2}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 7: ROLES */}
                      {section === "roles" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("roles", "eyebrow", v)}
                              placeholder="Three roles, one thread"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("roles", "heading", v)}
                              placeholder="Entrepreneur. Builder. *Teacher.*"
                            />
                          </div>
                          <TextareaField
                            label="Section Subheading"
                            value={secContent.subheading || ""}
                            onChange={(v) => updateField("roles", "subheading", v)}
                            rows={2}
                          />

                          <div className="grid gap-4 sm:grid-cols-3">
                            {[
                              { num: 1, label: "Entrepreneur" },
                              { num: 2, label: "Builder" },
                              { num: 3, label: "Teacher" },
                            ].map((r) => {
                              const tKey = `r${r.num}_title`;
                              const dKey = `r${r.num}_desc`;
                              return (
                                <div key={r.num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="text-xs font-semibold text-emerald-400">{r.label}</div>
                                  <InputField
                                    label="Role Title"
                                    value={secContent[tKey] || ""}
                                    onChange={(v) => updateField("roles", tKey, v)}
                                  />
                                  <TextareaField
                                    label="Role Description"
                                    value={secContent[dKey] || ""}
                                    onChange={(v) => updateField("roles", dKey, v)}
                                    rows={4}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 8: JOURNEY */}
                      {section === "journey" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("journey", "eyebrow", v)}
                              placeholder="The journey"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("journey", "heading", v)}
                              placeholder="From small town to training teams across *three continents.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                              const yKey = `j${num}_year`;
                              const tKey = `j${num}_title`;
                              const dKey = `j${num}_desc`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-blue-400">Milestone #{num}</span>
                                    <span className="text-[10px] font-mono text-white/40">{secContent[yKey] || ""}</span>
                                  </div>
                                  <div className="grid gap-3 sm:grid-cols-2">
                                    <InputField
                                      label="Year / Era"
                                      value={secContent[yKey] || ""}
                                      onChange={(v) => updateField("journey", yKey, v)}
                                    />
                                    <InputField
                                      label="Milestone Title"
                                      value={secContent[tKey] || ""}
                                      onChange={(v) => updateField("journey", tKey, v)}
                                    />
                                  </div>
                                  <TextareaField
                                    label="Description"
                                    value={secContent[dKey] || ""}
                                    onChange={(v) => updateField("journey", dKey, v)}
                                    rows={2}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 9: BUILDS */}
                      {section === "builds" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("builds", "eyebrow", v)}
                              placeholder="Built along the way"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("builds", "heading", v)}
                              placeholder="One company. One school. *Three products.*"
                            />
                          </div>
                          <TextareaField
                            label="Section Subheading"
                            value={secContent.subheading || ""}
                            onChange={(v) => updateField("builds", "subheading", v)}
                            rows={2}
                          />

                          <div className="grid gap-4 sm:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((num) => {
                              const nKey = `b${num}_name`;
                              const yKey = `b${num}_year`;
                              const dKey = `b${num}_desc`;
                              const lKey = `b${num}_link`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-amber-400">Product #{num}</span>
                                    <span className="text-[10px] font-mono text-white/40">{secContent[yKey] || ""}</span>
                                  </div>
                                  <div className="grid gap-2 sm:grid-cols-2">
                                    <InputField
                                      label="Name"
                                      value={secContent[nKey] || ""}
                                      onChange={(v) => updateField("builds", nKey, v)}
                                    />
                                    <InputField
                                      label="Year"
                                      value={secContent[yKey] || ""}
                                      onChange={(v) => updateField("builds", yKey, v)}
                                    />
                                  </div>
                                  <InputField
                                    label="Website Link"
                                    value={secContent[lKey] || ""}
                                    onChange={(v) => updateField("builds", lKey, v)}
                                  />
                                  <TextareaField
                                    label="Description"
                                    value={secContent[dKey] || ""}
                                    onChange={(v) => updateField("builds", dKey, v)}
                                    rows={2}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 10: TESTIMONIALS */}
                      {section === "testimonials" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("testimonials", "eyebrow", v)}
                              placeholder="What people say"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("testimonials", "heading", v)}
                              placeholder="About working *together.*"
                            />
                          </div>
                          <TextareaField
                            label="Section Subheading"
                            value={secContent.subheading || ""}
                            onChange={(v) => updateField("testimonials", "subheading", v)}
                            rows={2}
                          />

                          <div className="grid gap-4 sm:grid-cols-3">
                            {[1, 2, 3].map((num) => {
                              const qKey = `t${num}_quote`;
                              const rKey = `t${num}_role`;
                              return (
                                <div key={num} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                                  <div className="text-xs font-semibold text-blue-400">Review #{num}</div>
                                  <TextareaField
                                    label="Quote"
                                    value={secContent[qKey] || ""}
                                    onChange={(v) => updateField("testimonials", qKey, v)}
                                    rows={3}
                                  />
                                  <InputField
                                    label="Role / Attribution"
                                    value={secContent[rKey] || ""}
                                    onChange={(v) => updateField("testimonials", rKey, v)}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 11: KNOWABLES */}
                      {section === "knowables" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("knowables", "eyebrow", v)}
                              placeholder="A few things worth knowing"
                            />
                            <InputField
                              label="Section Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("knowables", "heading", v)}
                              placeholder="Small details that shape *how Ambesh works.*"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            {[1, 2, 3, 4, 5].map((num) => {
                              const key = `item_${num}`;
                              return (
                                <TextareaField
                                  key={key}
                                  label={`Fact #${num}`}
                                  value={secContent[key] || ""}
                                  onChange={(v) => updateField("knowables", key, v)}
                                  rows={2}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SECTION 12: CTA */}
                      {section === "cta" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Section Eyebrow"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("cta", "eyebrow", v)}
                              placeholder="Final word"
                            />
                            <InputField
                              label="CTA Heading"
                              value={secContent.heading || ""}
                              onChange={(v) => updateField("cta", "heading", v)}
                              placeholder="If any of this resonates, *let us have a conversation.*"
                            />
                          </div>

                          <TextareaField
                            label="CTA Subheading"
                            value={secContent.subheading || ""}
                            onChange={(v) => updateField("cta", "subheading", v)}
                            rows={2}
                          />

                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Button Text"
                              value={secContent.button_text || ""}
                              onChange={(v) => updateField("cta", "button_text", v)}
                              placeholder="Book a Strategy Call"
                            />
                            <InputField
                              label="Contact Email"
                              value={secContent.email || ""}
                              onChange={(v) => updateField("cta", "email", v)}
                              placeholder="hello@ambesh.com"
                            />
                            <InputField
                              label="Note"
                              value={secContent.note || ""}
                              onChange={(v) => updateField("cta", "note", v)}
                              placeholder="Responds within 24 hours"
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
