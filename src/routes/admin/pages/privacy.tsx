import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
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
  Shield,
  FileText,
  UserCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/privacy")({
  component: PrivacyPageEditor,
});

// ─── EXACT 1:1 Default content matching the live privacy.tsx ───────────────────
const EXACT_DEFAULT_PRIVACY_CONTENT = {
  header: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    last_updated: "April 19, 2026",
  },
  intro: {
    intro_text:
      'This Privacy Policy explains how BDA Technologies Pvt. Ltd. ("we", "us", "our"), based in Delhi, India, collects, uses, stores and protects your personal information when you visit ambeshtiwari.com and the related properties ambesh.com, ambesh.in and acceleratewithai.in, or engage with services offered through these websites. This policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000.',
  },
  clauses: {
    sec1_title: "1. Information we collect",
    sec1_body:
      "We collect information you provide (name, email, phone number, company, role and message content submitted through contact, booking or training enquiry forms), automatic technical data (IP address, browser type, device type, pages visited, referring URL and timestamps via standard server logs and analytics tools), and cookies used to remember preferences and measure traffic.",

    sec2_title: "2. How we use your information",
    sec2_body:
      "Personal data is used strictly for the purposes for which it was collected, including responding to enquiries and scheduling discovery calls, delivering corporate training and consulting services, sending invoices, contracts, course materials, and post-engagement communication, improving website performance, and complying with statutory obligations.",

    sec3_title: "3. Legal basis (DPDP Act, 2023)",
    sec3_body:
      "Personal data is processed on the basis of your consent (provided when you submit a form or engage our services) or for the performance of a contract with you. You may withdraw consent at any time by writing to the grievance officer.",

    sec4_title: "4. Sharing and disclosure",
    sec4_body:
      "We do not sell or rent your personal data. Limited sharing happens only with essential service providers (hosting, email, scheduling, payments, analytics), professional advisors bound by confidentiality, and government authorities when required by Indian law or a valid court order.",

    sec5_title: "5. Data storage and security",
    sec5_body:
      "Data is stored on secure servers operated by reputable cloud providers. Reasonable security practices are followed in line with Rule 8 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.",

    sec6_title: "6. Data retention",
    sec6_body:
      "Personal data is retained only as long as necessary to fulfil the purpose for which it was collected and to comply with statutory retention requirements, after which it is deleted or anonymised.",

    sec7_title: "7. Your rights under the DPDP Act",
    sec7_body:
      "You have the right to access personal data held about you, request correction or erasure of inaccurate data, withdraw consent for future processing, and nominate another individual to exercise rights on your behalf.",

    sec8_title: "8. Third-party links",
    sec8_body:
      "The website may contain links to third-party sites (LinkedIn, YouTube, payment gateways, calendar tools). We are not responsible for the privacy practices of those external services.",

    sec9_title: "9. Children",
    sec9_body:
      "The services are intended for working professionals and are not directed at individuals under 18. Personal data of minors is not knowingly collected without verifiable parental consent.",

    sec11_title: "11. Changes to this policy",
    sec11_body:
      'This policy may be updated periodically. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the website after changes are posted constitutes acceptance.',

    sec12_title: "12. Governing law and jurisdiction",
    sec12_body:
      "This Privacy Policy is governed by the laws of India. All disputes are subject to the exclusive jurisdiction of the courts at Delhi, India.",
  },
  officer: {
    sec10_title: "10. Grievance officer",
    sec10_intro:
      "In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, the Grievance Officer for this website is:",
    name: "Ambesh Tiwari",
    company: "BDA Technologies Pvt. Ltd., Delhi, India",
    email: "hello@ambesh.com",
    sla: "Grievances are acknowledged within 48 hours and resolved within 30 days.",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_PRIVACY_CONTENT;
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
  header: {
    title: "Header & Revision Date",
    description: "Page title and last updated revision timestamp.",
    icon: Shield,
  },
  intro: {
    title: "Legal Introduction & Entity Scope",
    description: "Company entity name, covered domains, and statutory Acts applicable.",
    icon: FileText,
  },
  clauses: {
    title: "Privacy Policy Clauses (1-9, 11-12)",
    description: "Collection categories, usage, DPDP basis, sharing, storage, retention, user rights, links, children, and jurisdiction.",
    icon: Shield,
  },
  officer: {
    title: "Grievance Officer & Legal Contact",
    description: "Grievance officer designation, official email address, and dispute resolution SLA.",
    icon: UserCheck,
  },
};

function PrivacyPageEditor() {
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
        .eq("page", "privacy");

      if (error) {
        console.error("Failed to load privacy content:", error);
        setContent(EXACT_DEFAULT_PRIVACY_CONTENT);
        return;
      }

      const map: ContentMap = {};
      (Object.keys(EXACT_DEFAULT_PRIVACY_CONTENT) as SectionKey[]).forEach((section) => {
        map[section] = { ...EXACT_DEFAULT_PRIVACY_CONTENT[section] };
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
      console.error("Failed to load privacy content:", err);
      setContent(EXACT_DEFAULT_PRIVACY_CONTENT);
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
        page: "privacy",
        section,
        key,
        value: String(value ?? ""),
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from("site_content")
        .upsert(upsertRows, { onConflict: "page,section,key" });

      if (error) throw error;

      // Realtime cross-tab sync & instant cache update
      try {
        const cached = localStorage.getItem("cms-cache-privacy");
        const parsed = cached ? JSON.parse(cached) : {};
        parsed[section] = sectionData;
        localStorage.setItem("cms-cache-privacy", JSON.stringify(parsed));
      } catch (_) {}

      try {
        const channel = new BroadcastChannel("ambesh-cms-sync");
        channel.postMessage({ page: "privacy", section, data: sectionData, timestamp: Date.now() });
        channel.close();
      } catch (bcErr) {
        console.warn("BroadcastChannel error:", bcErr);
      }
      localStorage.setItem("ambesh-cms-last-update", `privacy-${section}-${Date.now()}`);

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
        [section]: { ...EXACT_DEFAULT_PRIVACY_CONTENT[section] },
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
          Loading Privacy Policy content...
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
              <Shield className="h-3.5 w-3.5" />
              Privacy Policy CMS
            </span>
            <span className="text-xs text-white/40">4 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Privacy Policy Editor (/privacy)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit statutory terms, DPDP compliance clauses, and grievance contact with zero-delay live synchronization.
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
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
            View Live Page (/privacy)
          </a>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-6">
        {(Object.keys(EXACT_DEFAULT_PRIVACY_CONTENT) as SectionKey[]).map((section) => {
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
                              placeholder="Privacy Policy"
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
                            placeholder="This Privacy Policy explains how BDA Technologies..."
                          />
                        </div>
                      )}

                      {/* SECTION 3: CLAUSES */}
                      {section === "clauses" && (
                        <div className="space-y-6">
                          {[
                            { num: "1", label: "Information We Collect" },
                            { num: "2", label: "How We Use Information" },
                            { num: "3", label: "Legal Basis (DPDP Act)" },
                            { num: "4", label: "Sharing & Disclosure" },
                            { num: "5", label: "Storage & Security" },
                            { num: "6", label: "Data Retention" },
                            { num: "7", label: "Your Rights" },
                            { num: "8", label: "Third-Party Links" },
                            { num: "9", label: "Children" },
                            { num: "11", label: "Policy Changes" },
                            { num: "12", label: "Governing Law & Jurisdiction" },
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

                      {/* SECTION 4: GRIEVANCE OFFICER */}
                      {section === "officer" && (
                        <div className="space-y-4">
                          <InputField
                            label="Section Title"
                            value={secContent.sec10_title || ""}
                            onChange={(v) => updateField("officer", "sec10_title", v)}
                            placeholder="10. Grievance officer"
                          />
                          <TextareaField
                            label="Intro Text"
                            value={secContent.sec10_intro || ""}
                            onChange={(v) => updateField("officer", "sec10_intro", v)}
                            rows={2}
                          />
                          <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                              label="Officer Name"
                              value={secContent.name || ""}
                              onChange={(v) => updateField("officer", "name", v)}
                              placeholder="Ambesh Tiwari"
                            />
                            <InputField
                              label="Officer Company & Address"
                              value={secContent.company || ""}
                              onChange={(v) => updateField("officer", "company", v)}
                              placeholder="BDA Technologies Pvt. Ltd., Delhi, India"
                            />
                            <InputField
                              label="Officer Email"
                              value={secContent.email || ""}
                              onChange={(v) => updateField("officer", "email", v)}
                              placeholder="hello@ambesh.com"
                            />
                          </div>
                          <InputField
                            label="SLA Resolution Timeline"
                            value={secContent.sla || ""}
                            onChange={(v) => updateField("officer", "sla", v)}
                            placeholder="Grievances are acknowledged within 48 hours and resolved within 30 days."
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
