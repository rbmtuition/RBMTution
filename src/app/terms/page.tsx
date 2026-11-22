import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/page/LegalShell";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms for using the RBM Tuition website and arranging home or online tuition across Delhi NCR, including fees, scheduling, demos and tutor replacement.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Terms & Conditions", path: "/terms" },
            ]),
          ),
        }}
      />

      <LegalShell
        title="Terms & Conditions"
        description="The ground rules for using this website and arranging tuition with RBM Tuition."
        updated="20 November 2026"
      >
        <section>
          <h2>1. These terms</h2>
          <p>
            By using this website or arranging tuition through {siteConfig.legalName},
            you agree to these terms. If you do not agree, please do not use the
            site or submit an enquiry. These terms apply alongside any written
            schedule or fee confirmation shared with you before classes begin.
          </p>
        </section>

        <section>
          <h2>2. Our services</h2>
          <p>
            RBM Tuition arranges home and online tuition for school students and
            entrance-exam candidates. We help identify a suitable tutor, arrange
            a demo class and support scheduling and replacement requests. The
            specific subjects, classes, sessions and fees are confirmed in
            writing before regular classes start.
          </p>
          <p>
            Availability depends on the subject, class, locality and tutor
            schedule. A listed area or subject does not guarantee immediate
            placement.
          </p>
        </section>

        <section>
          <h2>3. Enquiries and demo classes</h2>
          <p>
            Enquiries can be submitted through the website, phone, WhatsApp or
            email. The demo class is free and does not obligate you to continue.
            Demo availability is subject to tutor schedules. Information you
            provide must be accurate so we can match the right tutor.
          </p>
        </section>

        <section>
          <h2>4. Fees and payment</h2>
          <p>
            Fees depend on the class, subjects, number of sessions per week,
            mode, tutor experience and locality. A monthly or package quote is
            shared after the demo. Agreed fees are payable according to the
            schedule confirmed at onboarding.
          </p>
          <p>
            Payments are made through the payment method or link we share. This
            website does not process card payments. Late or missed payments may
            pause classes after a reminder. Fees for a completed period are not
            refundable merely because a student chooses to stop attending.
          </p>
        </section>

        <section>
          <h2>5. Scheduling, cancellations and missed classes</h2>
          <p>
            Class timings are agreed between the family and the tutor. Please
            give as much notice as possible for a reschedule. The notice period
            and rules for missed sessions are confirmed at onboarding. Repeated
            last-minute cancellations may lead to a review of the schedule.
          </p>
          <p>
            If a tutor cannot attend a scheduled class, we will try to arrange a
            replacement session or tutor. Classes missed by the tutor are not
            charged.
          </p>
        </section>

        <section>
          <h2>6. Tutor replacement</h2>
          <p>
            If the teaching style does not suit the student, tell us and we will
            arrange another suitable tutor at no additional matching fee. A
            replacement is subject to availability in your subject and locality.
          </p>
        </section>

        <section>
          <h2>7. Parent and student responsibilities</h2>
          <ul>
            <li>Provide accurate class, board, subject and contact information</li>
            <li>Provide a safe, suitable space for home classes</li>
            <li>Ensure a responsible adult is available at home for minors</li>
            <li>Treat tutors respectfully and maintain a professional learning environment</li>
            <li>Do not record classes without the tutor&rsquo;s consent</li>
            <li>Notify us promptly about scheduling, safety or conduct concerns</li>
          </ul>
        </section>

        <section>
          <h2>8. Tutor conduct and verification</h2>
          <p>
            Tutors are screened for subject suitability, qualifications and
            identity before recommendation, and a demo lesson is part of the
            process. If you have a concern about a tutor&rsquo;s conduct, contact
            us immediately at {siteConfig.phone} or{" "}
            <a href={siteConfig.emailHref}>{siteConfig.email}</a> so we can
            investigate.
          </p>
        </section>

        <section>
          <h2>9. Online classes</h2>
          <p>
            Online tuition requires a reliable internet connection and a device
            suitable for video calls. The family is responsible for connectivity
            at their end. Recording a class is not permitted without the consent
            of everyone participating.
          </p>
        </section>

        <section>
          <h2>10. Website content and intellectual property</h2>
          <p>
            Text, design, graphics and other content on this website belong to
            RBM Tuition and may not be copied, republished or used commercially
            without written permission. You may share links to public pages.
          </p>
        </section>

        <section>
          <h2>11. Limitation of liability</h2>
          <p>
            We work to provide reliable tuition and accurate information, but we
            do not guarantee exam marks, ranks or admission outcomes. To the
            extent permitted by law, RBM Tuition is not liable for indirect or
            consequential losses arising from use of this website or from a
            tutor&rsquo;s services. Nothing in these terms limits liability that
            cannot be limited under applicable law.
          </p>
        </section>

        <section>
          <h2>12. Governing law</h2>
          <p>
            These terms are governed by the laws of India. Disputes are subject
            to the exclusive jurisdiction of the courts at Noida, Uttar Pradesh,
            unless a different venue is required by applicable law.
          </p>
        </section>

        <section>
          <h2>13. Contact</h2>
          <p>
            For questions about these terms, contact {siteConfig.legalName} at{" "}
            {siteConfig.address.full}, call {siteConfig.phone}, or email{" "}
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>. You can also
            use our <Link href="/contact">contact page</Link>.
          </p>
        </section>
      </LegalShell>
    </>
  );
}
