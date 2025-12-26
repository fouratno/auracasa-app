export default function Privacy() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold">Datenschutz / Privacy</h1>
      
      <div className="mt-6 max-w-3xl space-y-6 text-neutral-700 text-sm leading-relaxed">
        <p>
          Auracasa respects your privacy. This page explains how we handle data on this website.
        </p>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-2">Data Collection</h2>
          <p>
            This website does not use cookies for tracking or analytics by default. We do not 
            collect personal data unless you explicitly provide it through our contact form.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-2">Contact Form</h2>
          <p>
            Form submissions are processed by Formspree, a third-party service. When you submit 
            the contact form, your name, email, and message are transmitted to Formspree and 
            forwarded to us via email. Formspree's privacy policy applies to this data processing.
          </p>
          <p className="mt-2">
            We use the information you provide solely to respond to your inquiry. We do not 
            share your contact information with other parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-2">Affiliate Links</h2>
          <p>
            This website may contain affiliate links to products and services that align with 
            our aesthetic philosophy. We participate in affiliate programs including TradeDoubler.
          </p>
          <p className="mt-2">
            When you click on an affiliate link, cookies may be set by the affiliate network 
            to track the referral. This tracking is performed by the affiliate network, not by 
            Auracasa. We receive a commission if you make a purchase through these links, at 
            no additional cost to you.
          </p>
          <p className="mt-2">
            Affiliate partnerships do not influence our editorial content. We only recommend 
            products and materials that genuinely align with our design philosophy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-2">Your Rights (GDPR)</h2>
          <p>
            Under the General Data Protection Regulation (GDPR), you have the right to:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact us at the email address provided in our Impressum.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-2">External Links</h2>
          <p>
            This website contains links to external sites. We are not responsible for the 
            privacy practices of these external sites. We encourage you to review their 
            privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-2">Changes to This Policy</h2>
          <p>
            We may update this privacy policy as our practices evolve. Significant changes 
            will be noted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-2">Contact</h2>
          <p>
            For privacy-related questions or data requests, contact us at the address provided 
            in our <a href="/legal/impressum" className="underline">Impressum</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
