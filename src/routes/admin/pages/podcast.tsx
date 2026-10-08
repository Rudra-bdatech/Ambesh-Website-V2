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
  Headphones,
  Play,
  Star,
  MessageCircle,
  User,
  Mail,
  Mic,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pages/podcast")({
  component: PodcastPageEditor,
});

// ─── EXACT 1:1 Default content matching the live podcast.tsx ───────────────────
export const EXACT_DEFAULT_PODCAST_CONTENT = {
  hero: {
    eyebrow: "The podcast",
    heading: "Inspire with *Ambesh.*",
    subheading:
      "Conversations with founders, operators and builders about the things that actually matter: ambition, decisions, setbacks, and what it takes to build something real.",
    pull_quote:
      "No predictions. No hot takes. Just field notes from people doing the work.",
    card_number: "30+",
    card_label: "conversations published",
  },
  platforms: {
    eyebrow: "Listen on",
    spotify_url: "#",
    apple_url: "#",
    youtube_url: "#",
    jiosaavn_url: "#",
  },
  featured: {
    eyebrow: "Featured conversations",
    heading: "A few worth *starting with.*",
    subheading: "If you are new here, these three conversations are a good way in.",
    ep1_title: "Seize the opportunity as you live only once",
    ep1_guest: "Saji Mathews",
    ep1_blurb:
      "Saji is a seasoned integrated marketing executive with over two decades of experience in people management and performance leadership. A conversation about seizing moments and making the most of the one life you get.",
    ep1_link: "#",

    ep2_title: "Don't follow your passion blindly",
    ep2_guest: "Amitabh Tiwari, aka Political Baaba",
    ep2_blurb:
      "A counterintuitive take on passion, career choices, and why the advice everyone gives might be exactly wrong. Amitabh shares his own unconventional path with brutal honesty.",
    ep2_link: "#",

    ep3_title: "When life gives you lemons, make a lemonade",
    ep3_guest: "Rishi Tanna",
    ep3_blurb:
      "Rishi is on a mission to help young entrepreneurs kickstart their journeys. A conversation about resilience, starting again, and what it actually takes to turn setbacks into momentum.",
    ep3_link: "#",

    all_episodes_text: "See all 30+ episodes",
    all_episodes_url: "#",
  },
  topics: {
    eyebrow: "What we talk about",
    heading: "The *territory.*",
    body: "This is not an AI podcast. It is a podcast about building things, making decisions, and staying honest about what that costs. AI shows up because it is part of the world now. But the conversations are always about the people, not the tools.",
    list: "Entrepreneurship, Career decisions, AI and technology, Personal growth, Marketing and branding, Resilience and setbacks, Building a business in India",
  },
  host: {
    eyebrow: "Your host",
    heading: "Ambesh *Tiwari.*",
    body: "Entrepreneur, AI trainer, author of Accelerate with AI, and founder of BDA Technologies. Ambesh started this podcast because the most useful things he has learned came from conversations, not courses. This is his way of sharing those conversations with everyone who could not be in the room.",
    btn_text: "Read the full story",
  },
  newsletter: {
    eyebrow: "Stay in the loop",
    heading: "New conversations. *In your inbox.*",
    body: "No schedule. No spam. Just a note when a new conversation drops, and occasionally a short idea worth your time.",
    btn_text: "Subscribe",
    email_placeholder: "you@company.com",
  },
  pitch: {
    heading: "Got a story *worth sharing?*",
    subheading:
      "If you have built something interesting, lived through something worth telling, or have a perspective most people have not heard, Ambesh would love to talk. The best episodes come from people he was not expecting.",
    btn_text: "Pitch a conversation",
  },
};

type SectionKey = keyof typeof EXACT_DEFAULT_PODCAST_CONTENT;
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
      rows={rows}
      onChange={onChange}
      className="w-full resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm placeholder-white/20 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200 leading-relaxed"
      style={{ minHeight: rows * 28 }}
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

export function PodcastPageEditor() {
  const [content, setContent] = useState<ContentMap>(() => {
    const init: ContentMap = {};
    for (const [sec, keys] of Object.entries(EXACT_DEFAULT_PODCAST_CONTENT)) {
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
        .eq("page", "podcast");

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
      console.error("Failed to load podcast page content:", err);
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
        page: "podcast",
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
          "ambesh_podcast_sync",
          JSON.stringify({ section, timestamp: Date.now() })
        );
        try {
          const channel = new BroadcastChannel("ambesh-cms-sync");
          channel.postMessage({ page: "podcast", section, data: sectionData });
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
    const defaults = EXACT_DEFAULT_PODCAST_CONTENT[section];
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
    hero: { title: "Hero Section & Published Counter", badge: "01", icon: Headphones },
    platforms: { title: "Platform Direct Links", badge: "02", icon: Play },
    featured: { title: "Featured Conversations", badge: "03", icon: Star },
    topics: { title: "What We Talk About (Territory)", badge: "04", icon: MessageCircle },
    host: { title: "About The Host Card", badge: "05", icon: User },
    newsletter: { title: "Newsletter Subscription Form", badge: "06", icon: Mail },
    pitch: { title: "Guest Pitch Call to Action", badge: "07", icon: Mic },
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3 text-white/50 text-sm">
          <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
          Loading Podcast page content...
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
              <Headphones className="h-3.5 w-3.5" />
              Podcast Page CMS
            </span>
            <span className="text-xs text-white/40">7 Sections</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Podcast Page Editor (/podcast)
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Edit episodes, platform links, topics, host biography, and guest pitches with 0ms live sync.
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
            href="/podcast"
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
        {(Object.keys(EXACT_DEFAULT_PODCAST_CONTENT) as SectionKey[]).map((section) => {
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
                                Heading (*text* for gradient)
                              </label>
                              <input
                                type="text"
                                value={secContent.heading || ""}
                                onChange={(e) => updateField("hero", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none focus:border-blue-500/50"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("hero", "subheading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Italic Pull Quote
                            </label>
                            <input
                              type="text"
                              value={secContent.pull_quote || ""}
                              onChange={(e) => updateField("hero", "pull_quote", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Hero Card Number
                              </label>
                              <input
                                type="text"
                                value={secContent.card_number || ""}
                                onChange={(e) => updateField("hero", "card_number", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Hero Card Sub-label
                              </label>
                              <input
                                type="text"
                                value={secContent.card_label || ""}
                                onChange={(e) => updateField("hero", "card_label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 2: PLATFORMS */}
                      {section === "platforms" && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Section Eyebrow Text
                            </label>
                            <input
                              type="text"
                              value={secContent.eyebrow || ""}
                              onChange={(e) => updateField("platforms", "eyebrow", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Spotify URL
                              </label>
                              <input
                                type="text"
                                value={secContent.spotify_url || ""}
                                onChange={(e) =>
                                  updateField("platforms", "spotify_url", e.target.value)
                                }
                                placeholder="https://open.spotify.com/..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Apple Podcasts URL
                              </label>
                              <input
                                type="text"
                                value={secContent.apple_url || ""}
                                onChange={(e) => updateField("platforms", "apple_url", e.target.value)}
                                placeholder="https://podcasts.apple.com/..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                YouTube URL
                              </label>
                              <input
                                type="text"
                                value={secContent.youtube_url || ""}
                                onChange={(e) =>
                                  updateField("platforms", "youtube_url", e.target.value)
                                }
                                placeholder="https://youtube.com/..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                JioSaavn URL
                              </label>
                              <input
                                type="text"
                                value={secContent.jiosaavn_url || ""}
                                onChange={(e) =>
                                  updateField("platforms", "jiosaavn_url", e.target.value)
                                }
                                placeholder="https://jiosaavn.com/..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 3: FEATURED CONVERSATIONS */}
                      {section === "featured" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("featured", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("featured", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Subheading
                            </label>
                            <input
                              type="text"
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("featured", "subheading", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>

                          {/* 3 Featured Episodes */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                            {[1, 2, 3].map((num) => {
                              const tKey = `ep${num}_title`;
                              const gKey = `ep${num}_guest`;
                              const bKey = `ep${num}_blurb`;
                              const lKey = `ep${num}_link`;

                              return (
                                <div key={num} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2.5">
                                  <span className="text-xs font-mono font-bold text-blue-400">
                                    Featured Episode 0{num}
                                  </span>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Episode Title</label>
                                    <input
                                      type="text"
                                      value={secContent[tKey] || ""}
                                      onChange={(e) => updateField("featured", tKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Guest Name</label>
                                    <input
                                      type="text"
                                      value={secContent[gKey] || ""}
                                      onChange={(e) => updateField("featured", gKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Episode Blurb</label>
                                    <AutoTextarea
                                      value={secContent[bKey] || ""}
                                      onChange={(e) => updateField("featured", bKey, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-white/50 font-mono">Episode Link URL</label>
                                    <input
                                      type="text"
                                      value={secContent[lKey] || ""}
                                      onChange={(e) => updateField("featured", lKey, e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Bottom "See All Episodes" Text
                              </label>
                              <input
                                type="text"
                                value={secContent.all_episodes_text || ""}
                                onChange={(e) =>
                                  updateField("featured", "all_episodes_text", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Bottom "See All Episodes" URL
                              </label>
                              <input
                                type="text"
                                value={secContent.all_episodes_url || ""}
                                onChange={(e) =>
                                  updateField("featured", "all_episodes_url", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 4: TOPICS / TERRITORY */}
                      {section === "topics" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("topics", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("topics", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Section Narrative
                            </label>
                            <AutoTextarea
                              value={secContent.body || ""}
                              onChange={(e) => updateField("topics", "body", e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Comma-Separated Topics
                            </label>
                            <AutoTextarea
                              value={secContent.list || ""}
                              onChange={(e) => updateField("topics", "list", e.target.value)}
                              rows={2}
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 5: HOST */}
                      {section === "host" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("host", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("host", "heading", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Host Biography
                            </label>
                            <AutoTextarea
                              value={secContent.body || ""}
                              onChange={(e) => updateField("host", "body", e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Action Button Text
                            </label>
                            <input
                              type="text"
                              value={secContent.btn_text || ""}
                              onChange={(e) => updateField("host", "btn_text", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 6: NEWSLETTER */}
                      {section === "newsletter" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                                Eyebrow
                              </label>
                              <input
                                type="text"
                                value={secContent.eyebrow || ""}
                                onChange={(e) => updateField("newsletter", "eyebrow", e.target.value)}
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
                                onChange={(e) => updateField("newsletter", "btn_text", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Heading (*text* for gradient)
                            </label>
                            <input
                              type="text"
                              value={secContent.heading || ""}
                              onChange={(e) => updateField("newsletter", "heading", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Body Text
                            </label>
                            <AutoTextarea
                              value={secContent.body || ""}
                              onChange={(e) => updateField("newsletter", "body", e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Input Placeholder
                            </label>
                            <input
                              type="text"
                              value={secContent.email_placeholder || ""}
                              onChange={(e) =>
                                updateField("newsletter", "email_placeholder", e.target.value)
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 7: GUEST PITCH */}
                      {section === "pitch" && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Heading (*text* for gradient)
                            </label>
                            <AutoTextarea
                              value={secContent.heading || ""}
                              onChange={(e) => updateField("pitch", "heading", e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Subheading
                            </label>
                            <AutoTextarea
                              value={secContent.subheading || ""}
                              onChange={(e) => updateField("pitch", "subheading", e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                              Pitch Button Text
                            </label>
                            <input
                              type="text"
                              value={secContent.btn_text || ""}
                              onChange={(e) => updateField("pitch", "btn_text", e.target.value)}
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
