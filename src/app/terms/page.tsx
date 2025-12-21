import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-[900px] mx-auto px-6 py-24">
        <h1 className="mb-8" style={{ fontFamily: "var(--font-display)" }}>
          Terms and Conditions
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-8" style={{ color: "var(--color-neutral-dark)" }}>
          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              1. Advertising Platform
            </h2>
            <p className="mb-4">
              Group Escape Houses is an advertising and listing platform. We do not act as a booking agent or property manager. All bookings, payments, and contracts are handled directly between guests and property owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              2. Bookings and Payments
            </h2>
            <p className="mb-4">
              When you enquire about a property, your details are sent directly to the property owner. Any subsequent booking, deposit, or payment is made directly to the owner. Group Escape Houses does not take payments from guests for accommodation bookings.
            </p>
            <p className="mb-4">
              Payment terms, including deposit amounts, balance due dates, and security deposits, are set by individual house owners at their own discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              3. Contracts and Cancellations
            </h2>
            <p className="mb-4">
              The contract for your stay is between you and the property owner. All terms of that contract, including cancellation policies and house rules, are established by the owner. Group Escape Houses is not a party to these contracts and cannot be held liable for any disputes arising from them.
            </p>
            <p className="mt-4">
              We strongly recommend taking out travel insurance to cover unexpected cancellations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              4. Accuracy of Information
            </h2>
            <p className="mb-4">
              While we make every effort to ensure property descriptions and photographs provided by owners are accurate, Group Escape Houses does not verify the content of listings. Property owners remain responsible for the accuracy of their property details, pricing, and availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              5. Liability
            </h2>
            <p className="mb-4">
              Group Escape Houses is not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any personal injury, loss, or damage during your stay</li>
              <li>Incorrect information provided by property owners</li>
              <li>Disputes between guests and owners</li>
              <li>The quality or safety of the properties listed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              6. Data Protection
            </h2>
            <p className="mb-4">
              We process your personal data in accordance with UK GDPR and data protection laws. When you submit an enquiry, your information is shared with the relevant property owner to facilitate your request. Please see our Privacy Policy for full details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              7. Complaints
            </h2>
            <p className="mb-4">
              As your contract is with the property owner, any complaints regarding your stay should be directed to them immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              8. Contact Information
            </h2>
            <p className="mb-2">
              <strong>Group Escape Houses</strong><br />
              Office, 11a North Street<br />
              Brighton<br />
              BN41 1DH
            </p>
            <p>
              Email: <a href="mailto:hello@groupescapehouses.co.uk" className="text-[var(--color-accent-sage)] hover:underline">hello@groupescapehouses.co.uk</a>
            </p>
          </section>

          <section>
            <p className="text-sm italic" style={{ color: "var(--color-neutral-dark)" }}>
              Last updated: December 2025
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
