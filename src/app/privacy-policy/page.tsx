"use client";

export default function PrivacyPolicy() {
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
        Privacy Policy
      </h1>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        Last updated: March 21, 2025
      </p>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        At Complain Easy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services. By using Complain Easy, you agree to the terms outlined in this policy.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        1. Information We Collect
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We collect the following information when you use our platform:
      </p>
      <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
        <li>
          <strong>Personal Information:</strong> Your full name, which you provide when submitting a complaint.
        </li>
        <li>
          <strong>Complaint Details:</strong> Information you provide in your complaint, such as the company name, complaint type, and the complaint text itself.
        </li>
        <li>
          <strong>Usage Data:</strong> We may collect anonymous usage data, such as page views and interactions, to improve our services.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        2. How We Use Your Information
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We use your information for the following purposes:
      </p>
      <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
        <li>
          To generate and tidy your complaint using AI (via Mistral AI).
        </li>
        <li>
          To facilitate sharing your complaint on social media platforms (X or Facebook).
        </li>
        <li>
          To improve our platform through anonymous usage analytics.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        3. Data Storage and Retention
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We do not store your personal data after you use our service. Once your complaint is generated and shared, all data you provide (including your name and complaint details) is deleted from our systems. We only retain anonymous usage data for analytics purposes.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        4. Third-Party Services
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We use the following third-party services:
      </p>
      <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
        <li>
          <strong>Mistral AI:</strong> To tidy your complaint for clarity. Mistral AI may process your complaint text temporarily, but we do not store this data. Learn more about Mistral AI&apos;s privacy practices at <a href="https://mistral.ai" className="text-blue-600 hover:underline dark:text-blue-400">mistral.ai</a>.
        </li>
        <li>
          <strong>Social Media Platforms:</strong> When you share your complaint on X or Facebook, those platforms may collect data according to their privacy policies.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        5. Your Rights
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        As a UK user, you have rights under the General Data Protection Regulation <strong>(&quot;GDPR&quot;)</strong>, including the right to access, correct, or delete your personal data. Since we do not store your data after use, there is no personal data to access or delete. If you have concerns, please contact us at <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">info@velaryn.com</a>.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        6. Security
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We take reasonable measures to protect your data during use, including secure transmission and temporary processing. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        7. Changes to This Policy
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
        8. Contact Us
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">info@velaryn.com</a>.
      </p>
    </div>
  );
}