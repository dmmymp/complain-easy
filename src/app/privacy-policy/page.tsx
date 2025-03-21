"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none text-black dark:text-white">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Last Updated: March 20, 2025
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
        <p>
          Complain Easy ("the Service") is operated by Velaryn Ltd. We are committed to protecting your privacy. This Privacy Policy explains how we handle your data when you use the Service. If you have any questions, please contact us at <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">info@velaryn.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Data We Collect</h2>
        <p>
          When you use Complain Easy, you may provide the following data:
        </p>
        <ul className="list-disc pl-6">
          <li>Your full name (optional, depending on your preference to include it in the complaint).</li>
          <li>The company name you are complaining about.</li>
          <li>The text of your complaint.</li>
          <li>Your consent to use the Service.</li>
        </ul>
        <p>
          We do not collect any additional personal data, such as your email address, IP address, or browsing history.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Use Your Data</h2>
        <p>
          The data you provide is used solely for the following purposes:
        </p>
        <ul className="list-disc pl-6">
          <li>To generate and tidy your complaint using Mistral AI.</li>
          <li>To create a screenshot of your complaint for sharing on social media platforms (X or Facebook).</li>
          <li>To facilitate sharing your complaint on the selected social media platform.</li>
        </ul>
        <p>
          Your data is used temporarily during the complaint generation and sharing process and is not stored after the process is complete.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Storage and Deletion</h2>
        <p>
          Complain Easy does not store your personal data after you complete the complaint process. Once your complaint is generated and shared (or if you exit the Service), all data you provided is deleted from our systems immediately. We do not retain any copies of your complaint, name, or other information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
        <p>
          We use Mistral AI to tidy your complaint text. When you use the Service, your complaint text is sent to Mistral AI for processing. Mistral AI’s privacy practices apply to the data sent to their service. We do not control Mistral AI’s data handling practices and are not responsible for their actions.
        </p>
        <p>
          When you share your complaint on X or Facebook, their respective privacy policies apply. We do not control how these platforms handle your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Security</h2>
        <p>
          We take reasonable measures to protect your data during the brief period it is processed by our Service. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights</h2>
        <p>
          Since we do not store your data, there is no personal data to access, correct, or delete after the complaint process is complete. If you have concerns about your data, please contact us at <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">info@velaryn.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Service after such changes constitutes acceptance of the new policy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">info@velaryn.com</a>.
        </p>
      </div>
      <footer className="mt-8 text-center text-gray-600 dark:text-gray-300">
        <p>
          <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">Back to Home</Link> |{" "}
          <Link href="/terms-of-use" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Use</Link> |{" "}
          <Link href="/consumer-rights" className="text-blue-600 hover:underline dark:text-blue-400">Consumer Rights</Link> |{" "}
          <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">Feedback & Suggestions</a>
        </p>
      </footer>
    </div>
  );
}