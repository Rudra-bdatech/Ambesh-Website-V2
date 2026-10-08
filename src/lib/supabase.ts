import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContentItem {
  id: string;
  page: string;        // e.g. "home", "about", "services"
  section: string;     // e.g. "hero", "stats", "testimonials"
  key: string;         // e.g. "heading", "subheading", "body"
  value: string;       // the actual text content
  updated_at: string;
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function adminLogout() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ─── Content helpers ──────────────────────────────────────────────────────────

export async function getPageContent(page: string): Promise<Record<string, Record<string, string>>> {
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", page);

  if (error) {
    console.error("Error fetching content:", error);
    return {};
  }

  // Shape: { section: { key: value } }
  const shaped: Record<string, Record<string, string>> = {};
  for (const item of data as ContentItem[]) {
    if (!shaped[item.section]) shaped[item.section] = {};
    shaped[item.section][item.key] = item.value;
  }
  return shaped;
}

export async function updateContent(id: string, value: string) {
  const { error } = await supabase
    .from("site_content")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("id", id);
  return { error };
}

export async function getAllContent(): Promise<ContentItem[]> {
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .order("page", { ascending: true });

  if (error) {
    console.error("Error fetching all content:", error);
    return [];
  }
  return data as ContentItem[];
}
