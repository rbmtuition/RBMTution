import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/page/LegalShell";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How RBM Tuition collects, uses and protects the information families and tutors share through enquiry forms, calls and the website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy-policy" },
            ]),
          ),
        }}
      />

      <LegalShell
        title="Privacy Policy"
        description="How we handle the information you share when you enquire, book a demo or apply to teach with RBM Tuition."
        updated="20 November 2026"
      >
        <section>
          <h2>1. Who we are</h2>
          <p>
            This website is operated by {siteConfig.legalName}, located at{" "}
            {siteConfig.address.full}. For privacy questions, write to{" "}
            <a href={siteConfig.emailHref}>{siteConfig.email}</a> or call{" "}
            {siteConfig.phone}.
          </p>
        </section>

        <section>
          <h2>2. Information we collect</h2>
          <p>When you submit an enquiry form, we collect the details you provide, including:</p>
          <ul>
            <li>Your name and phone number, and your email address if you add one</li>
            <li>The student&rsquo;s class, board, city, area and subject requirement</li>
            <li>Preferred mode of tuition and any message you write</li>
            <li>The page or enquiry source, so we can understand which service you asked about</li>
          </ul>
          <p>
            If you call, WhatsApp or email us, we keep a record of that
            conversation and the contact details you share. We do not ask for
            payment details through this website, and we do not store card or
            bank information.
          </p>
          <p>
            We may also collect basic technical information such as browser
            type, device category and pages visited if analytics is enabled.
          </p>
        </section>

        <section>
          <h2>3. How we use your information</h2>
          <ul>
            <li>To respond to your enquiry and confirm tutor availability</li>
            <li>To arrange a free demo class with a suitable tutor</li>
            <li>To share the limited information a tutor needs to prepare for the class</li>
            <li>To send updates about a class, schedule or enquiry you started</li>
            <li>To improve our services, content and website experience</li>
            <li>To meet legal, accounting or dispute-resolution obligations</li>
          </ul>
          <p>
            We do not sell your personal information. We do not add you to
            unrelated marketing lists without your consent.
          </p>
        </section>

        <section>
          <h2>4. Forms, analytics and third-party services</h2>
          <p>
            Enquiry forms on this site are processed by Web3Forms, which
            delivers the submission to our email. Web3Forms handles the data
            only to provide that form-delivery service. Our hosting provider
            processes standard server logs.
          </p>
          <p>
            If Google Analytics 4 or Google Search Console is configured, Google
            may collect usage and search-performance data under its own privacy
            terms. The map on our contact page is loaded from Google Maps and
            may set third-party cookies when it loads.
          </p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>
            The website may use cookies or similar storage required for basic
            functionality and, where enabled, analytics. You can block or delete
            cookies in your browser settings. Blocking some cookies may affect
            how parts of the site work.
          </p>
        </section>

        <section>
          <h2>6. Sharing with tutors and service providers</h2>
          <p>
            To arrange tuition, we share relevant details with the tutor being
            considered — typically the student&rsquo;s class, board, subject,
            locality and the parent&rsquo;s contact information. Tutors are
            expected to use this information only for teaching and scheduling.
          </p>
          <p>
            We may share information with service providers who help us operate
            the website and communications, or where required by law. We do not
            sell personal information to advertisers or data brokers.
          </p>
        </section>

        <section>
          <h2>7. How long we keep information</h2>
          <p>
            We keep enquiry and tutoring records for as long as needed to
            provide the service and meet legal or accounting requirements. If
            you want an enquiry record removed sooner, contact us and we will
            review the request, subject to any records we are required to keep.
          </p>
        </section>

        <section>
          <h2>8. Your choices and rights</h2>
          <p>
            You can ask us to access, correct or delete the personal information
            we hold about you, or withdraw consent for further contact. Send the
            request from the phone number or email you used with us so we can
            verify it. We aim to respond within a reasonable period.
          </p>
          <p>
            If you are not satisfied with our response, you may raise the matter
            with the appropriate data-protection authority in India.
          </p>
        </section>

        <section>
          <h2>9. Children&rsquo;s information</h2>
          <p>
            Our services are arranged by parents or guardians. Enquiries about a
            student under 18 should be submitted by a parent or guardian. We use
            the student&rsquo;s information to provide tuition, not for
            independent marketing.
          </p>
        </section>

        <section>
          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy as our services or legal obligations
            change. The latest version will always be published on this page
            with the date shown above.
          </p>
          <p>
            Questions? <Link href="/contact">Contact us here</Link> or email{" "}
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>.
          </p>
        </section>
      </LegalShell>
    </>
  );
}
