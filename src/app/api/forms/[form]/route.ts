import { NextResponse } from "next/server";
import {
  buildFormPayload,
  type FormType,
} from "@/lib/formPayloads";
import { isWeb3FormsConfigured } from "@/lib/web3forms";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 5;
const formTypes = ["enquiry", "tutor", "web"] as const;
const submissions = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

function getRecentSubmissions(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  if (recent.length > 0) {
    submissions.set(ip, recent);
  } else {
    submissions.delete(ip);
  }
  return recent;
}

function getRetryAfter(ip: string) {
  const recent = getRecentSubmissions(ip);
  if (recent.length < MAX_SUBMISSIONS) return 0;
  return Math.max(
    1,
    Math.ceil((WINDOW_MS - (Date.now() - recent[0])) / 1000),
  );
}

function recordSubmission(ip: string) {
  const recent = getRecentSubmissions(ip);
  recent.push(Date.now());
  submissions.set(ip, recent);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ form: string }> },
) {
  const { form } = await params;

  if (!formTypes.includes(form as FormType)) {
    return NextResponse.json(
      { success: false, message: "Unknown form." },
      { status: 404 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;
  const botcheck =
    typeof data.botcheck === "string" ? data.botcheck.trim() : "";

  if (botcheck) {
    return NextResponse.json(
      { success: false, message: "Submission rejected." },
      { status: 400 },
    );
  }

  const result = buildFormPayload(form as FormType, data);

  if (Object.keys(result.errors).length > 0 || !result.payload) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the highlighted fields and try again.",
        errors: result.errors,
      },
      { status: 422 },
    );
  }

  if (!isWeb3FormsConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Our enquiry form is being connected. Please call or WhatsApp us and we will help you right away.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const retryAfter = getRetryAfter(ip);

  if (retryAfter > 0) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Too many submissions from this connection. Please wait a few minutes or call us directly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  recordSubmission(ip);

  return NextResponse.json({
    success: true,
    payload: result.payload,
  });
}
