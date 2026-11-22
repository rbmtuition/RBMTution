import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { siteConfig } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pay Tuition Fees — Bank Transfer Details",
  description:
    "Pay RBM Tuition fees by UPI QR or bank transfer. Use the confirmed details, add the student's name as reference, and send the payment screenshot on WhatsApp.",
  path: "/payment",
  keywords: [
    "pay RBM Tuition fees",
    "home tuition fees payment",
    "bank transfer tuition fees",
  ],
});

const bank = siteConfig.bank;

const bankRows = [
  { label: "Account name", value: bank.accountName },
  { label: "Bank", value: bank.bankName },
  { label: "Account type", value: bank.accountType },
  { label: "Account number", value: bank.accountNumber, mono: true },
  { label: "IFSC code", value: bank.ifsc, mono: true },
  { label: "Branch", value: bank.branch },
  { label: "Bank address", value: bank.address },
];

const steps = [
  {
    title: "Confirm the amount",
    description:
      "Pay only after the demo class and after our team shares the agreed fee in writing.",
  },
  {
    title: "Transfer and add a reference",
    description:
      "Use the bank details above and include the student's full name and phone number in the transfer remarks.",
  },
  {
    title: "Send the receipt",
    description:
      "Share the payment screenshot on WhatsApp with the student's name, class and amount paid. We will confirm receipt.",
  },
];

export default function PaymentPage() {
  const paymentSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pay Tuition Fees",
    url: absoluteUrl("/payment"),
    description:
      "Bank transfer details and payment confirmation instructions for RBM Tuition families.",
    about: { "@id": absoluteUrl("/#organization") },
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            paymentSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Pay Fees", path: "/payment" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Pay Fees"
        title="Pay your tuition fees"
        description="Pay the confirmed fee by UPI QR or bank transfer, then send us the payment screenshot so we can confirm your booking."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pay Fees" },
        ]}
        highlights={[
          "UPI QR or bank transfer",
          "No card or OTP details",
          "Receipt confirmation on WhatsApp",
        ]}
        showCta={false}
      />

      <section className="section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
              <div className="flex items-start gap-3 border-b border-navy-100 bg-cream/60 p-5 sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Landmark className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Bank transfer details
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Use these details only after our team confirms the fee for
                    your child.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 border-b border-navy-100 p-5 sm:grid-cols-[13rem_1fr] sm:items-center sm:p-6">
                <div className="overflow-hidden rounded-xl border border-navy-100 bg-white">
                  <Image
                    src="/payment-qr.jpeg"
                    alt="UPI payment QR code for RBM Tuition"
                    width={1125}
                    height={1500}
                    sizes="(max-width: 640px) 100vw, 208px"
                    className="h-auto w-full"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold">Scan with any UPI app</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Open Paytm, Google Pay, PhonePe or your bank app, scan the
                    QR code and verify the payee name before confirming.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Add the student&apos;s name in the payment note, then send
                    us the screenshot on WhatsApp.
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-navy-100">
                {bankRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4 sm:px-6"
                  >
                    <dt className="text-[11px] font-extrabold tracking-[0.12em] text-muted uppercase">
                      {row.label}
                    </dt>
                    <dd
                      className={
                        row.mono
                          ? "font-mono text-base font-semibold tracking-wide text-navy-900"
                          : "text-sm font-semibold break-words text-navy-900"
                      }
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-gold-200 bg-gold-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] text-gold-800 uppercase">
                <ShieldCheck className="h-4 w-4" />
                Before you pay
              </div>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-navy-800">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                  Pay only after the free demo and a written fee confirmation
                  from our team.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                  The first-month fee is paid to RBM Tuition. Later monthly fees
                  go directly to the tutor unless we tell you otherwise.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                  We never ask for your OTP, PIN, CVV, card number or net
                  banking password.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                How to complete the payment
              </h2>
              <ol className="mt-4 grid gap-4 sm:grid-cols-3">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-xl border border-navy-100 bg-white p-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-gold-400">
                      {index + 1}
                    </span>
                    <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <h2 className="text-xl font-semibold text-white">
                Send payment confirmation
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">
                Include the student&apos;s name, class, amount paid and a
                screenshot of the transfer. Our team will confirm receipt, any
                day of the week.
              </p>
              <div className="mt-5 space-y-2.5">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full px-5 py-3 text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send on WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="btn-ghost-light w-full px-5 py-3 text-sm"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
                <a
                  href={siteConfig.emailHref}
                  className="btn-ghost-light w-full px-5 py-3 text-sm"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <h2 className="text-base font-bold">Prefer a payment link?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                If you would rather pay through the payment link we share, call
                or WhatsApp us and we will send the current link for your fee.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
              >
                Contact the team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-cream/60 p-6">
              <h2 className="text-base font-bold">Fees and refunds</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Fee schedules and refund terms are confirmed at onboarding. Read
                the full{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
                >
                  terms and conditions
                </Link>{" "}
                before paying.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
