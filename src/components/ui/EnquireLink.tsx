"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type EnquireLinkProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  prefillPackage?: string;
};

export function EnquireLink({
  href = "/#enquire",
  className,
  children,
  onNavigate,
  prefillPackage,
}: EnquireLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    const [rawPath, rawHash = ""] = href.split("#");
    if (!rawHash) return;

    const targetPath = rawPath || pathname;

    if (prefillPackage) {
      trackEvent("package_cta_click", {
        package: prefillPackage,
        page_path: pathname,
        destination: targetPath,
      });

      window.dispatchEvent(
        new CustomEvent("rbm:package-prefill", {
          detail: prefillPackage,
        }),
      );

      if (targetPath !== pathname) {
        try {
          window.sessionStorage.setItem(
            "rbm-web-package-prefill",
            prefillPackage,
          );
        } catch {}
      }
    }

    if (targetPath !== pathname) return;

    const target = document.getElementById(rawHash);
    if (!target) return;

    event.preventDefault();

    window.history.replaceState(null, "", `#${rawHash}`);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (window.matchMedia("(min-width: 1024px)").matches) {
          const field = Array.from(
            target.querySelectorAll<HTMLElement>("input, select, textarea"),
          ).find(
            (element) =>
              element.tabIndex >= 0 && element.offsetParent !== null,
          );
          field?.focus({ preventScroll: true });
        }
      });
    });
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
