"use client";

import Link from "next/link"; // Note: This import isn't used in the current code, but I'll keep it in case you add links later

export default function TermsOfUse() {
  // Function to handle "Go Back" navigation
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900">
      {/* Go Back Button */}
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ← Go Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Terms of Use
      </h1>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        Last updated: March 21, 2025
      </p>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        Welcome to Complain Easy. By using our website and services, you agree to these Terms of Use. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        1. Acceptance of Terms
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        By accessing or using Complain Easy, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use our services.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        2. Use of Our Services
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        Complain Easy allows you to generate and share complaints on social media. You are responsible for the content of your complaints, which must comply with UK laws (e.g., Public Order Act 1986). We do not review or endorse your content.
      </p>
      <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
        <li>
          You must not use our services to post threatening, defamatory, or illegal content.
        </li>
        <li>
          You must provide accurate information when using our platform.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        3. Third-Party Services
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We use third-party services to provide functionality:
      </p>
      <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
        <li>
          <strong>Mistral AI:</strong> To tidy your complaint. See their terms at <a href="https://mistral.ai" className="text-blue-600 hover:underline dark:text-blue-400">mistral.ai</a>.
        </li>
        <li>
          <strong>Social Media Platforms:</strong> Sharing on X or Facebook is subject to their terms of service.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        4. Limitation of Liability
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        Complain Easy is provided "as is" without warranties. We are not liable for any damages arising from your use of our services, including issues with third-party platforms or the accuracy of your complaint.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        5. Termination
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We may suspend or terminate your access to Complain Easy if you violate these Terms of Use.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        6. Changes to These Terms
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We may update these Terms of Use from time to time. Changes will be posted on this page with an updated "Last updated" date.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        7. Contact Us
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        If you have questions about these Terms of Use, please contact us at <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">info@velaryn.com</a>.
      </p>
    </div>
  );
}