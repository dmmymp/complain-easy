"use client";

import Link from "next/link";

export default function ConsumerRights() {
  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Consumer Rights</h1>
      <div className="prose dark:prose-invert max-w-none text-black dark:text-white">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Last Updated: March 20, 2025
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
        <p>
          Complain Easy is designed to empower UK consumers by helping them voice their complaints publicly. This page provides an overview of your consumer rights in the UK and how you can use this tool to escalate issues effectively. For legal advice, please consult a professional.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Your Rights Under UK Consumer Law</h2>
        <p>
          As a UK consumer, you are protected by several laws, including the Consumer Rights Act 2015. Here are some key rights you should be aware of:
        </p>
        <ul className="list-disc pl-6">
          <li><strong>Goods Must Be of Satisfactory Quality:</strong> Products you buy must be of satisfactory quality, fit for purpose, and as described. If they are not, you may be entitled to a repair, replacement, or refund.</li>
          <li><strong>Services Must Be Performed with Reasonable Care:</strong> Services (e.g., repairs, deliveries) must be carried out with reasonable care and skill, within a reasonable time, and at a reasonable price (if not agreed beforehand).</li>
          <li><strong>Right to Reject:</strong> If goods are faulty, you have 30 days to reject them and request a full refund. After 30 days, you may be entitled to a repair or replacement.</li>
          <li><strong>Unfair Contract Terms:</strong> Contract terms must be fair and transparent. Unfair terms (e.g., excessive cancellation fees) are not legally binding.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. When to Escalate a Complaint</h2>
<p>
  If a company does not resolve your complaint satisfactorily, you can escalate the issue to a regulatory body or ombudsman. Complain Easy allows you to CC these bodies in your complaint to draw their attention to potential malpractice. Here’s when to consider escalation:
</p>
<ul className="list-disc pl-6">
  <li><strong>Unfair Trading Practices:</strong> If a company engages in misleading advertising, aggressive sales tactics, or unfair contract terms, you can CC <a href="https://www.tradingstandards.uk" className="text-blue-600 hover:underline dark:text-blue-400">Trading Standards</a>.</li>
  <li><strong>Financial Disputes:</strong> For issues with banking, insurance, or investments, the <a href="https://www.financial-ombudsman.org.uk" className="text-blue-600 hover:underline dark:text-blue-400">Financial Ombudsman Service</a> can help.</li>
  <li><strong>Misleading Advertisements:</strong> The <a href="https://www.asa.org.uk" className="text-blue-600 hover:underline dark:text-blue-400">Advertising Standards Authority</a> handles complaints about false or misleading ads.</li>
  <li><strong>Widespread Issues:</strong> For anti-competitive practices or widespread unfair conduct, the <a href="https://www.gov.uk/government/organisations/competition-and-markets-authority" className="text-blue-600 hover:underline dark:text-blue-400">Competition and Markets Authority</a> may be appropriate.</li>
  <li><strong>Health and Safety Concerns:</strong> <a href="https://www.gov.uk/find-local-council" className="text-blue-600 hover:underline dark:text-blue-400">Local Authority Environmental Health</a> can address issues like food safety, noise, or hygiene (contact your local council).</li>
  <li><strong>Industry-Specific Issues:</strong> <a href="https://www.ombudsman-services.org" className="text-blue-600 hover:underline dark:text-blue-400">Ombudsman Services</a> covers sectors like energy, communications, and property.</li>
</ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. How Complain Easy Helps</h2>
        <p>
          Complain Easy allows you to:
        </p>
        <ul className="list-disc pl-6">
          <li>Draft a professional complaint using AI to ensure clarity and politeness.</li>
          <li>Share your complaint publicly on X or Facebook to increase visibility.</li>
          <li>CC relevant regulatory bodies to escalate your issue and draw attention to potential malpractice.</li>
        </ul>
        <p>
          Note that CC’ing a regulatory body does not guarantee action. You are responsible for ensuring your complaint is appropriate for escalation.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Additional Resources</h2>
        <p>
          For more information on your consumer rights, visit these official resources:
        </p>
        <ul className="list-disc pl-6">
          <li><a href="https://www.gov.uk/consumer-protection-rights" className="text-blue-600 hover:underline dark:text-blue-400">UK Government: Consumer Rights</a></li>
          <li><a href="https://www.citizensadvice.org.uk/consumer/" className="text-blue-600 hover:underline dark:text-blue-400">Citizens Advice: Consumer Advice</a></li>
          <li><a href="https://www.tradingstandards.uk/consumers" className="text-blue-600 hover:underline dark:text-blue-400">Trading Standards: Consumer Support</a></li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p>
          If you have questions about your consumer rights or how to use Complain Easy, please contact us at <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">info@velaryn.com</a>.
        </p>
      </div>
      <footer className="mt-8 text-center text-gray-600 dark:text-gray-300">
        <p>
          <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">Back to Home</Link> |{" "}
          <Link href="/terms-of-use" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Use</Link> |{" "}
          <Link href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link> |{" "}
          <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">Feedback & Suggestions</a>
        </p>
      </footer>
    </div>
  );
}