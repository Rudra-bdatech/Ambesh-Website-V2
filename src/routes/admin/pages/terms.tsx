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
  FileText,
  Scale,
  Mail,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/terms")({
  component: TermsPageEditor,
});

// ─── EXACT 1:1 Default content matching the live terms.tsx ───────────────────
export const EXACT_DEFAULT_TERMS_CONTENT = {
  header: {
    eyebrow: "Legal",
    title: "Terms of Use",
    last_updated: "April 19, 2026",
  },
  intro: {
    intro_text:
      'These Terms of Use ("Terms") govern your access to and use of ambeshtiwari.com and the related properties ambesh.com, ambesh.in and acceleratewithai.in, along with any training, consulting, coaching, books, podcasts or related services offered by Ambesh Tiwari through BDA Technologies Pvt. Ltd., Delhi (collectively, the "Services"). By accessing the website or engaging the Services, you agree to be bound by these Terms. These Terms are an electronic contract under the Information Technology Act, 2000 and do not require any physical or digital signature.',
  },
  clauses: {
    sec1_title: "1. Eligibility",
    sec1_body:
      "You must be at least 18 years of age and competent to contract under the Indian Contract Act, 1872 to use the Services. By using the website, you represent that you meet this requirement.",

    sec2_title: "2. Use of the website",
    sec2_body:
      "You agree to use the website only for lawful purposes and to refrain from copying, scraping or republishing content without prior written permission, uploading malicious code, attempting to gain unauthorised access, transmitting unsolicited promotional materials, or impersonating any person or misrepresenting affiliation.",

    sec3_title: "3. Intellectual property",
    sec3_body:
      "All content on this website, including text, graphics, logos, images, videos, course material, frameworks, presentations, the book Accelerate with AI and the podcast The Ambesh Tiwari Show, is the intellectual property of Ambesh Tiwari and Ambesh Tiwari Consulting and is protected under the Copyright Act, 1957 and the Trade Marks Act, 1999. No part may be reproduced, distributed or used commercially without prior written consent.",

    sec4_title: "4. Services and engagements",
    sec4_body:
      "Specific Services (corporate training, workshops, keynotes, consulting, coaching) are governed by a separate written proposal, statement of work or engagement letter signed between you and Ambesh Tiwari Consulting. In case of conflict, the signed engagement document prevails over these Terms.",

    sec5_title: "5. Fees and payments",
    sec5_body:
      "Fees for paid Services are quoted in Indian Rupees (INR) unless otherwise stated and are exclusive of applicable taxes (GST). Payment terms, milestones and invoicing are specified in the engagement document. All payments must be made through the methods notified by us. Late payments may attract interest at 1.5% per month or the maximum permitted by law.",

    sec6_title: "6. Cancellations and refunds",
    sec6_body:
      "Cancellations and refunds are governed by the Refund Policy available on this website, which forms an integral part of these Terms.",

    sec7_title: "7. Disclaimer of warranties",
    sec7_body:
      'The website and its content are provided on an "as is" and "as available" basis. While reasonable efforts are made to keep information accurate, no representations or warranties are made, express or implied, regarding completeness, reliability or fitness for a particular purpose. Training outcomes depend on participant engagement and organisational context.',

    sec8_title: "8. Limitation of liability",
    sec8_body:
      "To the maximum extent permitted by Indian law, Ambesh Tiwari, BDA Technologies Pvt. Ltd. and their associates shall not be liable for any indirect, incidental, consequential, special or punitive damages arising out of your use of the website or Services. Aggregate liability for any direct claim shall not exceed the fees paid by you for the specific engagement in the preceding three months.",

    sec9_title: "9. Indemnity",
    sec9_body:
      "You agree to indemnify and hold harmless Ambesh Tiwari, Ambesh Tiwari Consulting, their employees and associates from any claim, loss, liability or expense (including reasonable legal fees) arising out of your breach of these Terms or violation of any law.",

    sec10_title: "10. Third-party links and tools",
    sec10_body:
      "The website may contain links to third-party websites or embedded tools (LinkedIn, YouTube, payment gateways, scheduling tools). We are not responsible for the content, policies or practices of those third parties.",

    sec11_title: "11. Termination",
    sec11_body:
      "Access to the website may be suspended or terminated at any time without notice if you breach these Terms or engage in conduct that, in our reasonable opinion, is harmful to us or other users.",

    sec12_title: "12. Modifications",
    sec12_body:
      'These Terms may be revised from time to time. The "Last updated" date reflects the most recent revision. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.',

    sec13_title: "13. Governing law and dispute resolution",
    sec13_body:
      "These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved amicably. Failing that, disputes shall be referred to arbitration by a sole arbitrator under the Arbitration and Conciliation Act, 1996, with the seat and venue of arbitration at New Delhi. Subject to arbitration, the courts at Delhi shall have exclusive jurisdiction.",
  },
  contact: {
    sec14_title: "14. Contact",
    sec14_intro: "Questions regarding these Terms of Use can be sent to our support desk:",
    email: "hello@ambesh.com",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_TERMS_CONTENT;
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
  header: {
    title: "Header & Revision Date",
    description: "Page title and last updated revision timestamp.",
    icon: FileText,
  },
  intro: {
    title: "Legal Introduction & Entity Scope",
    description: "Covered properties, service definitions, and electronic contract status.",
    icon: Scale,
  },
  clauses: {
    title: "Terms & Conditions Clauses (1-13)",
    description: "Eligibility, IP, fees, cancellations, limitation of liability, indemnity, arbitration, and jurisdiction.",
    icon: Scale,
  },
  contact: {
    title: "Legal Contact Information",
    description: "Official legal desk email for terms questions.",
    icon: Mail,
  },
};

export function TermsPageEditor() {
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
        .eq("page", "terms");

      if (error) {
        console.error("Failed to load terms content:", error);
        setContent(EXACT_DEFAULT_TERMS_CONTENT);
        return;
      }

      const map: ContentMap = {};
      (Object.keys(EXACT_DEFAULT_TERMS_CONTENT) as SectionKey[]).forEach((section) => {
        map[section] = { ...EXACT_DEFAULT_TERMS_CONTENT[section] };
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
      console.error("Failed to load terms content:", err);
      setContent(EXACT_DEFAULT_TERMS_CONTENT);
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
        page: "terms",
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
        channel.postMessage({ page: "terms", section, timestamp: Date.now() });
        channel.close();
      } catch (bcErr) {
        console.warn("BroadcastChannel error:", bcErr);
      }
      localStorage.setItem("ambesh-cms-last-update", `terms-${section}-${Date.now()}`);

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
        [section]: { ...EXACT_DEFAULT_TERMS_CONTENT[section] },
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
          Loading Terms of Use content...
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
              <Scale className="h-3.5 w-3.5" />
              Terms of Use CMS
            </span>
            <span className="text-xs text-white/40">4 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Terms of Use Editor (/terms)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit intellectual property, service agreements, liability limits, and arbitration terms with zero-delay live sync.
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
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
            View Live Page (/terms)
          </a>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-6">
        {(Object.keys(EXACT_DEFAULT_TERMS_CONTENT) as SectionKey[]).map((section) => {
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
                      {/* SECTION 1: HEADER */}
                      {section === "header" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Eyebrow Tag"
                              value={secContent.eyebrow || ""}
                              onChange={(v) => updateField("header", "eyebrow", v)}
                              placeholder="Legal"
                            />
                            <InputField
                              label="Page Heading"
                              value={secContent.title || ""}
                              onChange={(v) => updateField("header", "title", v)}
                              placeholder="Terms of Use"
                            />
                            <InputField
                              label="Last Updated Date String"
                              value={secContent.last_updated || ""}
                              onChange={(v) => updateField("header", "last_updated", v)}
                              placeholder="April 19, 2026"
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 2: INTRO */}
                      {section === "intro" && (
                        <div className="space-y-4">
                          <TextareaField
                            label="Introduction Statement"
                            value={secContent.intro_text || ""}
                            onChange={(v) => updateField("intro", "intro_text", v)}
                            rows={4}
                            placeholder="These Terms of Use ('Terms') govern your access to..."
                          />
                        </div>
                      )}

                      {/* SECTION 3: CLAUSES */}
                      {section === "clauses" && (
                        <div className="space-y-6">
                          {[
                            { num: "1", label: "Eligibility" },
                            { num: "2", label: "Use of the Website" },
                            { num: "3", label: "Intellectual Property" },
                            { num: "4", label: "Services and Engagements" },
                            { num: "5", label: "Fees and Payments" },
                            { num: "6", label: "Cancellations and Refunds" },
                            { num: "7", label: "Disclaimer of Warranties" },
                            { num: "8", label: "Limitation of Liability" },
                            { num: "9", label: "Indemnity" },
                            { num: "10", label: "Third-Party Links & Tools" },
                            { num: "11", label: "Termination" },
                            { num: "12", label: "Modifications" },
                            { num: "13", label: "Governing Law & Dispute Resolution" },
                          ].map((item) => {
                            const tKey = `sec${item.num}_title`;
                            const bKey = `sec${item.num}_body`;
                            return (
                              <div
                                key={item.num}
                                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3"
                              >
                                <div className="text-xs font-semibold text-blue-400">
                                  Section {item.num}: {item.label}
                                </div>
                                <InputField
                                  label="Section Title"
                                  value={secContent[tKey] || ""}
                                  onChange={(v) => updateField("clauses", tKey, v)}
                                />
                                <TextareaField
                                  label="Section Content"
                                  value={secContent[bKey] || ""}
                                  onChange={(v) => updateField("clauses", bKey, v)}
                                  rows={3}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* SECTION 4: CONTACT */}
                      {section === "contact" && (
                        <div className="space-y-4">
                          <InputField
                            label="Section Title"
                            value={secContent.sec14_title || ""}
                            onChange={(v) => updateField("contact", "sec14_title", v)}
                            placeholder="14. Contact"
                          />
                          <TextareaField
                            label="Intro Text"
                            value={secContent.sec14_intro || ""}
                            onChange={(v) => updateField("contact", "sec14_intro", v)}
                            rows={2}
                          />
                          <InputField
                            label="Official Support Email"
                            value={secContent.email || ""}
                            onChange={(v) => updateField("contact", "email", v)}
                            placeholder="hello@ambesh.com"
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
