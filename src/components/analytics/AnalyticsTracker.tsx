"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureAttribution } from "@/lib/attribution";
import { trackEvent, trackPageView } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const isInitialPageView = useRef(true);

  useEffect(() => {
    captureAttribution();

    if (isInitialPageView.current) {
      isInitialPageView.current = false;
      return;
    }
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href") ?? "";
      const text = anchor.textContent?.trim().toLowerCase() ?? "";

      if (href.startsWith("tel:")) {
        trackEvent("call_click", {
          link_url: href,
          page_path: window.location.pathname,
        });
        return;
      }

      if (href.includes("wa.me") || href.includes("whatsapp")) {
        trackEvent("whatsapp_click", {
          link_url: href,
          page_path: window.location.pathname,
        });
        return;
      }

      if (href === "/payment") {
        trackEvent("payment_click", {
          link_url: href,
          page_path: window.location.pathname,
        });
        return;
      }

      if (
        text.includes("book a free demo") ||
        text.includes("book free demo")
      ) {
        trackEvent("demo_cta_click", {
          link_url: href,
          page_path: window.location.pathname,
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
