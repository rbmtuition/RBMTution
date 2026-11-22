type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  const trackedWindow = window as GtagWindow;
  if (typeof trackedWindow.gtag !== "function") return;
  trackedWindow.gtag("event", name, params);
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  const trackedWindow = window as GtagWindow;
  if (typeof trackedWindow.gtag !== "function") return;
  trackedWindow.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
