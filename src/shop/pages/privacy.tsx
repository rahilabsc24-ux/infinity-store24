
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2026</p>

      <div className="prose-sm mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Information we collect</h2>
          <p className="mt-2">
            When you shop with Infinity we collect information you provide directly, such as your name, email,
            shipping address, and payment details, along with information about your orders and how you use our
            site (like pages visited and items viewed).
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">How we use your information</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>To process and deliver your orders</li>
            <li>To send order confirmations, shipping updates, and customer support responses</li>
            <li>To send marketing communications you've opted into, which you can unsubscribe from at any time</li>
            <li>To improve our products, site, and recommendations</li>
            <li>To detect and prevent fraud</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">How we protect your data</h2>
          <p className="mt-2">
            We use industry-standard encryption for data in transit and at rest, and we never store full payment
            card numbers on our own servers — payment processing is handled by PCI-compliant providers.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Sharing your information</h2>
          <p className="mt-2">
            We share information with service providers who help us operate — such as shipping carriers and
            payment processors — only as needed to fulfill your order. We do not sell your personal information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Your choices</h2>
          <p className="mt-2">
            You can access, correct, or request deletion of your personal information, and opt out of marketing
            emails at any time using the unsubscribe link or by contacting support@infinitystore.example.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact us</h2>
          <p className="mt-2">
            Questions about this policy? Reach out at support@infinitystore.example or visit our{" "}
            <a href="/contact" className="font-medium text-brand hover:underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
