"use client";

import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Terms of Use</h1>
      <div className="prose dark:prose-invert max-w-none text-black dark:text-white">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Last Updated: March 20, 2025
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p>
          By using Complain Easy ("the Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service. Complain Easy is a free tool provided by Velaryn Ltd to help UK consumers post complaints to company social media accounts.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of the Service</h2>
        <p>
          You may use Complain Easy to draft, tidy, and share complaints on social media platforms such as X and Facebook. You are solely responsible for the content of your complaints, including ensuring they comply with applicable UK laws (e.g., Public Order Act 1986, Defamation Act 2013). We do not review, endorse, or moderate the content you submit.
        </p>
        <p>
          When using the Service, you agree not to:
        </p>
        <ul className="list-disc pl-6">
          <li>Post content that is unlawful, threatening, defamatory, obscene, or otherwise objectionable.</li>
          <li>Use the Service to harass, abuse, or harm others.</li>
          <li>Attempt to reverse-engineer, hack, or interfere with the Service.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data and Privacy</h2>
        <p>
          Complain Easy does not store your personal data after use. Any data you provide (e.g., name, complaint text) is used temporarily to generate and share your complaint and is deleted immediately after the process is complete. For more details, see our <Link href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
        <p>
          The Service uses Mistral AI to tidy your complaint text. By using the Service, you agree to Mistral AI’s terms of use. We are not responsible for the performance or availability of third-party services, including social media platforms like X and Facebook.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Regulatory Bodies</h2>
        <p>
          Complain Easy allows you to CC regulatory bodies (e.g., Trading Standards, Financial Ombudsman Service) in your complaint. However, CC’ing these bodies does not guarantee action on their part. You are responsible for ensuring your complaint is appropriate for escalation and complies with the requirements of the selected regulatory body.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
        <p>
          Complain Easy is provided "as is" without warranties of any kind. Velaryn Ltd is not liable for any damages arising from your use of the Service, including but not limited to legal consequences from the content of your complaints. You use the Service at your own risk.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p>
          We may update these Terms of Use from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Service after such changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us at <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">info@velaryn.com</a>.
        </p>
      </div>
      <footer className="mt-8 text-center text-gray-600 dark:text-gray-300">
        <p>
          <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">Back to Home</Link> |{" "}
          <Link href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link> |{" "}
          <Link href="/consumer-rights" className="text-blue-600 hover:underline dark:text-blue-400">Consumer Rights</Link> |{" "}
          <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">Feedback & Suggestions</a>
        </p>
      </footer>
    </div>
  );
}