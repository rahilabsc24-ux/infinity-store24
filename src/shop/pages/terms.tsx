import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of the Infinity store.",
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of terms</h2>
          <p className="mt-2">
            By accessing or using the Infinity website, you agree to be bound by these Terms of Service and our
            Privacy Policy. If you don't agree with any part of these terms, please don't use our site.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Orders and payment</h2>
          <p className="mt-2">
            All prices are listed in US dollars and are subject to change without notice. We reserve the right to
            refuse or cancel any order, including in cases of suspected fraud or pricing errors. Payment is
            processed securely at the time of order.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Shipping and delivery</h2>
          <p className="mt-2">
            Estimated delivery times are provided in good faith but are not guaranteed. Infinity is not liable for
            delays caused by carriers or events outside our control.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Returns</h2>
          <p className="mt-2">
            Returns are accepted according to our{" "}
            <a href="/shipping-returns" className="font-medium text-brand hover:underline">
              Shipping &amp; Returns policy
            </a>
            . Items must be unworn, unused, and in original packaging.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Intellectual property</h2>
          <p className="mt-2">
            All content on this site — including text, graphics, logos, and product images — is the property of
            Infinity or its licensors and may not be reproduced without permission.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Limitation of liability</h2>
          <p className="mt-2">
            Infinity is not liable for any indirect, incidental, or consequential damages arising from your use of
            the site or products purchased through it, to the fullest extent permitted by law.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Changes to these terms</h2>
          <p className="mt-2">
            We may update these terms from time to time. Continued use of the site after changes take effect
            constitutes acceptance of the revised terms.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to support@infinitystore.example.
          </p>
        </section>
      </div>
    </main>
  )
}
