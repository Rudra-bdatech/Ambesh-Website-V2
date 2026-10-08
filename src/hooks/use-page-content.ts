import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function usePageContent<T extends Record<string, Record<string, string>>>(
  page: string,
  defaultContent: T
): T {
  const [content, setContent] = useState<T>(defaultContent);

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("*")
          .eq("page", page);

        if (error || !data || data.length === 0) return;

        if (isMounted) {
          setContent((prev) => {
            const next = JSON.parse(JSON.stringify(prev)) as T;
            for (const row of data) {
              if (row.section && row.key && row.value !== undefined) {
                if (!next[row.section as keyof T]) {
                  (next as Record<string, Record<string, string>>)[row.section] = {};
                }
                (next as Record<string, Record<string, string>>)[row.section][row.key] = row.value;
              }
            }
            return next;
          });
        }
      } catch (err) {
        console.error("Failed to load CMS content:", err);
      }
    }

    // Initial fetch on mount
    fetchContent();

    // 1. Cross-tab instant broadcast (0ms delay between Admin tab and Live tab)
    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      bc = new BroadcastChannel("ambesh-cms-sync");
      bc.onmessage = (event) => {
        if (event.data?.page === page || event.data?.page === "all") {
          fetchContent();
        }
      };
    }

    // 2. Storage event listener (fallback for browsers)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `cms-updated-${page}` || e.key === "cms-updated-all") {
        fetchContent();
      }
    };
    window.addEventListener("storage", handleStorage);

    // 3. Tab focus listener (when switching tabs back to the live site)
    const handleFocus = () => {
      fetchContent();
    };
    window.addEventListener("focus", handleFocus);

    // 4. Supabase Real-time websocket subscription
    const channel = supabase
      .channel(`cms-realtime-${page}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content", filter: `page=eq.${page}` },
        () => {
          fetchContent();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      bc?.close();
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
      supabase.removeChannel(channel);
    };
  }, [page]);

  return content;
}
