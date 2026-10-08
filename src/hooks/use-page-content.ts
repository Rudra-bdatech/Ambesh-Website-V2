import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export function mergeContent<T>(
  defaultContent: T,
  customContent?: Record<string, Record<string, string>> | null
): T {
  if (!customContent || typeof customContent !== "object") return defaultContent;
  const merged = JSON.parse(JSON.stringify(defaultContent)) as Record<string, Record<string, string>>;
  for (const [section, entries] of Object.entries(customContent)) {
    if (entries && typeof entries === "object") {
      if (!merged[section]) merged[section] = {};
      for (const [k, v] of Object.entries(entries as Record<string, string>)) {
        if (v !== undefined) {
          merged[section][k] = String(v);
        }
      }
    }
  }
  return merged as T;
}

function getCachedContent<T>(page: string, defaultContent: T): T {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = localStorage.getItem(`cms-cache-${page}`);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw);
    return mergeContent(defaultContent, parsed);
  } catch {
    return defaultContent;
  }
}

export function usePageContent<T extends Record<string, Record<string, string>>>(
  page: string,
  defaultContent: T,
  initialData?: Record<string, Record<string, string>>
): T {
  const [content, setContent] = useState<T>(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      return mergeContent(defaultContent, initialData);
    }
    return getCachedContent(page, defaultContent);
  });
  const contentRef = useRef<T>(content);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  // Apply updates safely with deep comparison check to prevent unnecessary re-renders
  const applyContentUpdate = useCallback(
    (updater: (prev: T) => T) => {
      const current = contentRef.current;
      const next = updater(current);

      if (JSON.stringify(current) === JSON.stringify(next)) {
        return;
      }

      contentRef.current = next;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`cms-cache-${page}`, JSON.stringify(next));
        } catch (_) {}
      }
      setContent(next);
    },
    [page]
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("*")
          .eq("page", page);

        if (error || !data || data.length === 0 || !isMounted) return;

        applyContentUpdate((prev) => {
          const next = JSON.parse(JSON.stringify(prev)) as Record<string, Record<string, string>>;
          for (const row of data) {
            if (row.section && row.key && row.value !== undefined) {
              if (!next[row.section]) {
                next[row.section] = {};
              }
              next[row.section][row.key] = row.value;
            }
          }
          return next as T;
        });
      } catch (err) {
        console.error("Failed to load CMS content:", err);
      }
    }

    function debouncedFetch() {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        if (isMounted) {
          fetchContent();
        }
      }, 150);
    }

    // Initial background synchronization
    debouncedFetch();

    // 1. Cross-tab instant broadcast (0ms delay between Admin tab and Live tab)
    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        bc = new BroadcastChannel("ambesh-cms-sync");
        bc.onmessage = (event) => {
          if (event.data?.page === page || event.data?.page === "all") {
            if (event.data?.section && event.data?.data) {
              applyContentUpdate((prev) => {
                const next = JSON.parse(JSON.stringify(prev)) as Record<string, Record<string, string>>;
                next[event.data.section] = {
                  ...(next[event.data.section] || {}),
                  ...event.data.data,
                };
                return next as T;
              });
            }
            debouncedFetch();
          }
        };
      } catch (_) {}
    }

    // 2. Storage event listener (fallback for cross-window sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `cms-cache-${page}`) {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            applyContentUpdate((prev) => ({
              ...prev,
              ...parsed,
            }));
          } catch (_) {}
        }
      } else if (e.key === `cms-updated-${page}` || e.key === "cms-updated-all") {
        debouncedFetch();
      }
    };
    window.addEventListener("storage", handleStorage);

    // 3. Tab focus listener (when switching tabs back to the live site)
    const handleFocus = () => {
      debouncedFetch();
    };
    window.addEventListener("focus", handleFocus);

    // 4. Supabase Real-time websocket subscription
    const channel = supabase
      .channel(`cms-realtime-${page}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content", filter: `page=eq.${page}` },
        () => {
          debouncedFetch();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      bc?.close();
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
      supabase.removeChannel(channel);
    };
  }, [page, applyContentUpdate]);

  return content;
}
