export type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  fbclid: string;
  referrer: string;
  landingPath: string;
};

const STORAGE_KEY = "rbm-attribution";

const attributionParams = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  utmContent: "utm_content",
  utmTerm: "utm_term",
  gclid: "gclid",
  fbclid: "fbclid",
} as const;

function clean(value: string | null | undefined) {
  return value?.trim().slice(0, 300) ?? "";
}

function readStoredAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<Attribution>;
    return {
      utmSource: clean(parsed.utmSource),
      utmMedium: clean(parsed.utmMedium),
      utmCampaign: clean(parsed.utmCampaign),
      utmContent: clean(parsed.utmContent),
      utmTerm: clean(parsed.utmTerm),
      gclid: clean(parsed.gclid),
      fbclid: clean(parsed.fbclid),
      referrer: clean(parsed.referrer),
      landingPath: clean(parsed.landingPath),
    };
  } catch {
    return null;
  }
}

export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const hasCampaign = Object.values(attributionParams).some((key) =>
      params.has(key),
    );
    const stored = readStoredAttribution();

    if (stored && !hasCampaign) return stored;

    const referrer = document.referrer;
    const externalReferrer =
      referrer && !referrer.startsWith(window.location.origin)
        ? clean(referrer)
        : "";

    const attribution: Attribution = {
      utmSource: clean(params.get(attributionParams.utmSource)),
      utmMedium: clean(params.get(attributionParams.utmMedium)),
      utmCampaign: clean(params.get(attributionParams.utmCampaign)),
      utmContent: clean(params.get(attributionParams.utmContent)),
      utmTerm: clean(params.get(attributionParams.utmTerm)),
      gclid: clean(params.get(attributionParams.gclid)),
      fbclid: clean(params.get(attributionParams.fbclid)),
      referrer: stored?.referrer || externalReferrer,
      landingPath:
        stored?.landingPath ||
        `${window.location.pathname}${window.location.search}`,
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return null;
  }
}

export function getAttribution() {
  return readStoredAttribution();
}

export function getAttributionFields() {
  const attribution = readStoredAttribution();
  if (!attribution) return {};

  const fields: Record<string, string> = {};

  if (attribution.utmSource) fields["UTM source"] = attribution.utmSource;
  if (attribution.utmMedium) fields["UTM medium"] = attribution.utmMedium;
  if (attribution.utmCampaign) fields["UTM campaign"] = attribution.utmCampaign;
  if (attribution.utmContent) fields["UTM content"] = attribution.utmContent;
  if (attribution.utmTerm) fields["UTM term"] = attribution.utmTerm;
  if (attribution.gclid) fields["Google click ID"] = attribution.gclid;
  if (attribution.fbclid) fields["Meta click ID"] = attribution.fbclid;
  if (attribution.referrer) fields["Referrer"] = attribution.referrer;
  if (attribution.landingPath) fields["Landing page"] = attribution.landingPath;

  return fields;
}
