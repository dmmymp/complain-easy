"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";
import Head from "next/head";

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  onKeyDown,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-4">
    <label className="block text-black dark:text-white mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border rounded text-black placeholder-gray-500 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400"
      required={required}
      onKeyDown={onKeyDown}
    />
  </div>
);

const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  className?: string;
}) => (
  <div className="mb-4">
    <label className="block text-black dark:text-white mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full p-2 border rounded text-black placeholder-gray-500 min-h-[100px] dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400 ${className}`}
      required={required}
    />
  </div>
);

const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center mb-6 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 p-2 rounded-lg shadow-md">
    <div className="flex items-center">
      <span className={`mr-2 font-bold ${currentStep >= 1 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
        1. Find Company <span className="text-xs italic font-normal">(Enter name)</span>
      </span>
      <span className="mr-2 dark:text-gray-300">{">"}</span>
      <span className={`mr-2 font-bold ${currentStep >= 2 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
        2. Write Complaint <span className="text-xs italic font-normal">(Fill details)</span>
      </span>
      <span className="mr-2 dark:text-gray-300">{">"}</span>
      <span className={`font-bold ${currentStep >= 3 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
        3. Share <span className="text-xs italic font-normal">(Tidy & post)</span>
      </span>
    </div>
  </div>
);

type SocialHandles = {
  xHandle: string;
  fbHandle: string;
  email: string;
  companyNumber: string;
  companyName: string;
  message: string;
};

type RegulatoryBody = {
  name: string;
  xHandle?: string;
  fbHandle?: string;
  appliesTo: string[];
  description: string;
};

const regulatoryBodies: RegulatoryBody[] = [
  {
    name: "Trading Standards",
    xHandle: "@TradingStandards",
    fbHandle: "TradingStandardsUK",
    appliesTo: ["Service Delays", "Poor Customer Service", "Billing Issues", "Product Quality"],
    description: "For unfair trading practices, false advertising, or consumer protection issues (e.g., faulty products, misleading claims).",
  },
  {
    name: "Financial Ombudsman Service",
    xHandle: "@FinancialOmbuds",
    fbHandle: "FinancialOmbudsmanService",
    appliesTo: ["Billing Issues"],
    description: "For complaints about financial products or services (e.g., banking, insurance, investments).",
  },
  {
    name: "Advertising Standards Authority",
    xHandle: "@ASA_UK",
    fbHandle: "ASAUK",
    appliesTo: ["Product Quality", "Other"],
    description: "For misleading advertisements or marketing communications.",
  },
  {
    name: "Competition and Markets Authority",
    xHandle: "@CMAgovUK",
    fbHandle: "CMAgovUK",
    appliesTo: ["Billing Issues", "Other"],
    description: "For anti-competitive practices or widespread unfair business conduct.",
  },
  {
    name: "Local Authority Environmental Health",
    appliesTo: ["Other"],
    description: "For issues related to hygiene, food safety, noise disturbances, or health hazards.",
  },
  {
    name: "Ombudsman Services",
    xHandle: "@OmbudsmanService",
    fbHandle: "OmbudsmanServices",
    appliesTo: ["Service Delays", "Poor Customer Service", "Billing Issues", "Product Quality", "Other"],
    description: "For industry-specific issues in sectors like energy, communications, or property.",
  },
];

type FormData = {
  company: string;
  fullName: string;
  complaint: string;
  complaintType: string;
  consent: boolean;
  includeName: boolean;
  regulatoryBodies: string[];
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    fullName: "",
    complaint: "",
    complaintType: "",
    consent: false,
    includeName: false,
    regulatoryBodies: [],
  });
  const [socialHandles, setSocialHandles] = useState<SocialHandles | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tidiedComplaint, setTidiedComplaint] = useState<string>("");
  const [editedTidiedComplaint, setEditedTidiedComplaint] = useState<string>("");
  const [isEditingTidiedComplaint, setIsEditingTidiedComplaint] = useState<boolean>(false);
  const [tidyLoading, setTidyLoading] = useState<boolean>(false);
  const [showLegalReminder, setShowLegalReminder] = useState<boolean>(false);
  const [showShareConfirmation, setShowShareConfirmation] = useState<"X" | "Facebook" | null>(null);
  const [suggestionIndex, setSuggestionIndex] = useState<number>(0);
  const [expandedBody, setExpandedBody] = useState<string | null>(null); // For mobile toggle
  const tidiedComplaintRef = useRef<HTMLPreElement | HTMLTextAreaElement>(null);

  const complaintTypes = [
    "Service Delays",
    "Poor Customer Service",
    "Billing Issues",
    "Product Quality",
    "Other",
  ];

  const complaintPlaceholders: { [key: string]: string } = {
    "Service Delays": "e.g., My delivery was delayed by 3 days with no prior notice, causing significant inconvenience.",
    "Poor Customer Service": "e.g., I spent 30 minutes on hold, only to be disconnected without a resolution.",
    "Billing Issues": "e.g., I was overcharged £50 on my last bill with no explanation provided.",
    "Product Quality": "e.g., The item I purchased broke within a week, despite being advertised as durable.",
    "Other": "e.g., I have an issue not listed here that I’d like addressed promptly.",
  };

  const scriptedComplaints: { [key: string]: string[] } = {
    "Service Delays": [
      "Your service was delayed by over 2 hours with no prior notice, causing significant inconvenience.",
      "I waited 45 minutes beyond the scheduled time for your technician, disrupting my day.",
      "Your delivery arrived 3 days late, despite promises of next-day service.",
    ],
    "Poor Customer Service": [
      "Your staff were unhelpful and rude when I called to resolve an issue with my account.",
      "I spent 30 minutes on hold, only to be disconnected without a resolution.",
      "Your representative dismissed my complaint without offering any assistance.",
    ],
    "Billing Issues": [
      "I was overcharged £50 on my last bill with no explanation provided.",
      "Your company billed me twice for the same service this month.",
      "I’m still being charged for a subscription I cancelled three months ago.",
    ],
    "Product Quality": [
      "The item I purchased broke within a week, despite being advertised as durable.",
      "Your product arrived damaged, and I’ve had no response to my refund request.",
      "The quality of your service was far below what was promised on your website.",
    ],
    "Other": [
      "I have an issue not listed here that I’d like addressed promptly.",
      "Your company’s actions have caused me unexpected difficulties.",
      "I’m dissatisfied with an aspect of your service not covered above.",
    ],
  };

  const updateFormData = (key: keyof FormData, value: string | boolean | string[]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSearch = async () => {
    if (!formData.company.trim()) {
      setError("Please enter a company name.");
      return;
    }

    setLoading(true);
    setError("");
    setSocialHandles(null);

    try {
      const response = await fetch(`/api/getSocialHandles?company=${encodeURIComponent(formData.company)}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setSocialHandles(data);
    } catch (err) {
      setError("An error occurred while fetching company details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleGetSuggestion = () => {
    if (!formData.complaintType || formData.complaintType === "Other") {
      setError("Please select a complaint type first (other than 'Other').");
      return;
    }

    const prompts = scriptedComplaints[formData.complaintType];
    const nextIndex = (suggestionIndex + 1) % prompts.length;
    updateFormData("complaint", prompts[nextIndex]);
    setSuggestionIndex(nextIndex);
  };

  const handleClearSuggestion = () => {
    updateFormData("complaint", "");
    setSuggestionIndex(0);
  };

  const handleTidyComplaint = async () => {
    if (!formData.complaint || !formData.fullName || !formData.consent) {
      setError("Please fill in your name, complaint, and agree to the disclaimer first.");
      return;
    }

    setShowLegalReminder(true);
  };

  const confirmTidyComplaint = async () => {
    setShowLegalReminder(false);
    setTidyLoading(true);
    try {
      const response = await fetch("/api/tidyComplaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complaint: formData.complaint,
          name: formData.fullName,
          companyName: socialHandles?.companyName || formData.company,
          regulatoryBodies: formData.regulatoryBodies,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to tidy complaint");
      }
      const data = await response.json();
      setTidiedComplaint(data.tidiedComplaint || "No tidied complaint returned");
      setEditedTidiedComplaint(data.tidiedComplaint || "");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`An error occurred while tidying the complaint: ${errorMessage}. Please try again.`);
      console.error("Tidy Error:", err);
    } finally {
      setTidyLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert("Complaint copied to clipboard!"));
  };

  const handleShareOnX = async () => {
    if (!tidiedComplaintRef.current || !tidiedComplaint) return;
    setShowShareConfirmation("X");
  };

  const handleShareOnFacebook = async () => {
    if (!tidiedComplaintRef.current || !tidiedComplaint) return;
    setShowShareConfirmation("Facebook");
  };

  const confirmShare = async (platform: "X" | "Facebook") => {
    setShowShareConfirmation(null);

    const complaintToSanitize = isEditingTidiedComplaint ? editedTidiedComplaint : tidiedComplaint;
    const sanitizedComplaintLines = complaintToSanitize.split("\n").filter(line => line.trim() !== "");
    let bodyEndIndex = sanitizedComplaintLines.length;
    for (let i = 1; i < sanitizedComplaintLines.length; i++) {
      const line = sanitizedComplaintLines[i].trim().toLowerCase();
      if (line.match(/^(yours sincerely,|sincerely,)/i)) {
        bodyEndIndex = i;
        break;
      }
    }

    const bodyLines = sanitizedComplaintLines.slice(1, bodyEndIndex);
    const sanitizedComplaint = `

${bodyLines.join("\n").trim()}

Yours sincerely,
${formData.includeName ? formData.fullName : "[Name omitted]"}
    `.trim();

    const originalContent = tidiedComplaintRef.current.innerText;
    tidiedComplaintRef.current.innerText = sanitizedComplaint;

    try {
      console.log("Capturing element with content:", tidiedComplaintRef.current.innerText);
      tidiedComplaintRef.current.style.display = "block";
      tidiedComplaintRef.current.style.visibility = "visible";
      tidiedComplaintRef.current.style.color = "#000000";
      tidiedComplaintRef.current.style.backgroundColor = "#ffffff";
      tidiedComplaintRef.current.style.fontFamily = "Arial, sans-serif";
      tidiedComplaintRef.current.style.width = "600px";
      tidiedComplaintRef.current.style.minHeight = "400px";
      tidiedComplaintRef.current.style.padding = "10px";

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(tidiedComplaintRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
        onclone: (document) => {
          const elements = document.querySelectorAll("*");
          elements.forEach((el) => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            if (color.includes("oklch")) {
              console.log(`Found oklch in color for element ${el.tagName}:`, color);
              el.style.color = "#000000";
            }
            if (backgroundColor.includes("oklch")) {
              console.log(`Found oklch in backgroundColor for element ${el.tagName}:`, backgroundColor);
              el.style.backgroundColor = "#ffffff";
            }
            el.style.borderColor = style.borderColor.includes("oklch") ? "#000000" : style.borderColor;
            el.style.boxShadow = "none";
            el.style.display = "block";
            el.style.visibility = "visible";
            el.style.fontFamily = "Arial, sans-serif";
          });
        },
      });
      const imageDataUrl = canvas.toDataURL("image/png");
      const blob = await fetch(imageDataUrl).then((res) => res.blob());
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      alert(`Screenshot of the complaint copied to clipboard! Paste it into your ${platform} post (Ctrl+V or Cmd+V).`);

      if (platform === "X") {
        const ccHandles = formData.regulatoryBodies
          .map((bodyName) => {
            const body = regulatoryBodies.find((b) => b.name === bodyName);
            return body?.xHandle ? body.xHandle : null;
          })
          .filter(Boolean);
        const ccText = ccHandles.length > 0 ? ` (CC: ${ccHandles.join(", ")})` : "";
        const tweetText = `Hey ${socialHandles?.xHandle || "@company"}, here’s my complaint - please fix it!${ccText} Made with this free tool ➡️`;
        const url = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, "_blank", "width=600,height=400");
      } else {
        const ccHandles = formData.regulatoryBodies
          .map((bodyName) => {
            const body = regulatoryBodies.find((b) => b.name === bodyName);
            return body?.fbHandle ? body.fbHandle : null;
          })
          .filter(Boolean);
        const ccText = ccHandles.length > 0 ? ` (CC: ${ccHandles.join(", ")})` : "";
        const url = window.location.href;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}"e=${encodeURIComponent(
          `Complained to ${socialHandles?.fbHandle || "this company"} with this free tool!${ccText}`
        )}`;
        window.open(facebookUrl, "_blank", "width=600,height=400");
      }
    } catch (err) {
      console.error(`Failed to generate screenshot for ${platform}:`, err);
      setError("Failed to generate screenshot. Please try again or contact support.");
    } finally {
      tidiedComplaintRef.current.innerText = originalContent;
      tidiedComplaintRef.current.style.display = "";
      tidiedComplaintRef.current.style.visibility = "";
      tidiedComplaintRef.current.style.color = "";
      tidiedComplaintRef.current.style.backgroundColor = "";
      tidiedComplaintRef.current.style.fontFamily = "";
      tidiedComplaintRef.current.style.width = "";
      tidiedComplaintRef.current.style.minHeight = "";
      tidiedComplaintRef.current.style.padding = "";
    }
  };

  const handleEditToggle = () => {
    setIsEditingTidiedComplaint(!isEditingTidiedComplaint);
    if (!isEditingTidiedComplaint) {
      setEditedTidiedComplaint(tidiedComplaint);
    } else {
      setTidiedComplaint(editedTidiedComplaint);
    }
  };

  const getCurrentStep = () => {
    if (tidiedComplaint) return 3;
    if (socialHandles) return 2;
    return 1;
  };

  return (
    <>
      <Head>
        <meta property="og:title" content="Complain Easy - Beta" />
        <meta property="og:description" content="I complained to a company in minutes with this free tool! Try it ➡️" />
        <meta property="og:url" content="https://your-complaint-app-url.com" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="container mx-auto p-6 bg-white dark:bg-gray-900">
        {!socialHandles ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-2 text-black dark:text-white">Complain Easy - Beta</h1>
            <p className="text-gray-600 mb-4 dark:text-gray-300">Post a complaint to a company’s social media in minutes.</p>
            <p className="text-sm text-yellow-600 mb-4 dark:text-yellow-400">
              This is a beta version—please send feedback to <a href="mailto:info@velaryn.com" className="underline">info@velaryn.com</a>.
            </p>
            <div className="w-full max-w-md">
              <p className="text-sm text-gray-700 mb-4 dark:text-gray-300">
                <strong>How It Works:</strong> 1. Enter a company name to find their social media. 2. Write your complaint. 3. Share it on X or Facebook.
              </p>
              <p className="text-sm text-gray-700 mb-4 dark:text-gray-300">
                <strong>About This Tool:</strong> A free tool to help UK consumers complain publicly. We don’t store your data after use—just write and post.
              </p>
              <InputField
                label="Company Name"
                value={formData.company}
                onChange={(value) => updateFormData("company", value)}
                placeholder="e.g., British Gas"
                required
                onKeyDown={handleCompanyKeyDown}
              />
              <button
                onClick={handleSearch}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Searching..." : "Find Company"}
              </button>
              {error && <p className="text-red-500 mt-4 text-center dark:text-red-400">{error}</p>}
            </div>
            <footer className="mt-8 text-center text-gray-600 dark:text-gray-300">
              <p>
                <Link href="/terms-of-use" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Use</Link> |{" "}
                <Link href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link> |{" "}
                <Link href="/consumer-rights" className="text-blue-600 hover:underline dark:text-blue-400">Consumer Rights</Link> |{" "}
                <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">Feedback & Suggestions</a>
              </p>
            </footer>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Complain Easy - Beta</h1>
            <p className="text-sm text-yellow-600 mb-4 dark:text-yellow-400 text-center">
              Beta version—send feedback to <a href="mailto:info@velaryn.com" className="underline">info@velaryn.com</a>.
            </p>
            <div className="text-center mb-4">
              <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">Back to Home</Link>
            </div>
            <ProgressIndicator currentStep={getCurrentStep()} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-4 border rounded bg-gray-100 text-black dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <p className="text-sm text-gray-700 mb-4 dark:text-gray-300">
                  <strong>About This Tool:</strong> A free way to post complaints to company social media. We don’t store your data after use—just write and share.
                </p>
                <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">{socialHandles.companyName}</h2>
                <p><strong className="text-black dark:text-white">X Handle:</strong> {socialHandles.xHandle}</p>
                <p><strong className="text-black dark:text-white">Facebook Handle:</strong> {socialHandles.fbHandle}</p>
                <p className="text-gray-600 mt-2 dark:text-gray-400">{socialHandles.message}</p>

                <h3 className="text-lg font-semibold mt-6 mb-2 text-black dark:text-white">Your Details</h3>
                <InputField
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(value) => updateFormData("fullName", value)}
                  placeholder="Your Full Name"
                  required
                />
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateFormData("consent", e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-black dark:text-white">I consent to my data being used temporarily to generate and share this complaint. Data is not stored after use.</span>
                </label>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={formData.includeName}
                    onChange={(e) => updateFormData("includeName", e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-black dark:text-white">Include my name in the post (if unchecked, name will be omitted)</span>
                </label>

                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Disclaimer</h3>
                <p className="text-gray-700 mb-4 dark:text-gray-300">
                  Disclaimer: You’re responsible for your complaint’s content, which must comply with UK laws (e.g., Public Order Act 1986). We don’t store your data after use, review your content, or endorse it. Use responsibly. CC’ing regulatory bodies does not guarantee action; you’re responsible for ensuring your complaint is appropriate for escalation.
                </p>

                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Draft Your Complaint</h3>
                <div className="mb-4">
                  <label className="block text-black dark:text-white mb-1">Complaint Type</label>
                  <select
                    value={formData.complaintType}
                    onChange={(e) => updateFormData("complaintType", e.target.value)}
                    className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">Select a complaint type</option>
                    {complaintTypes.map((type) => (
                      <option key={type} value={type} className="text-black dark:text-white">{type}</option>
                    ))}
                  </select>
                </div>
                {formData.complaintType && (
                  <div className="mb-4">
                    <label className="block text-black dark:text-white mb-1">
                      CC Regulatory Bodies (Optional)
                    </label>
                    <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">
                      Select bodies to copy in on your complaint to escalate the issue. Tap the info icon for guidance.
                    </p>
                    {regulatoryBodies
                      .filter((body) => body.appliesTo.includes(formData.complaintType))
                      .map((body) => (
                        <div key={body.name} className="mb-2">
                          <div className="flex items-center">
                            <label className="flex items-center flex-1">
                              <input
                                type="checkbox"
                                checked={formData.regulatoryBodies.includes(body.name)}
                                onChange={(e) => {
                                  const updatedBodies = e.target.checked
                                    ? [...formData.regulatoryBodies, body.name]
                                    : formData.regulatoryBodies.filter((name) => name !== body.name);
                                  updateFormData("regulatoryBodies", updatedBodies);
                                }}
                                className="mr-2"
                              />
                              <span className="text-black dark:text-white">{body.name}</span>
                            </label>
                            <button
                              onClick={() => setExpandedBody(expandedBody === body.name ? null : body.name)}
                              className="focus:outline-none"
                            >
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15H9v-2h2v2zm0-4H9V5h2v6z" />
                              </svg>
                            </button>
                          </div>
                          {expandedBody === body.name && (
                            <div className="mt-1 p-2 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-800 dark:text-gray-200">
                              {body.description}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={handleGetSuggestion}
                    className="w-2/3 bg-yellow-500 text-black p-2 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white"
                    disabled={!formData.complaintType || formData.complaintType === "Other"}
                  >
                    Get Suggestion
                  </button>
                  <button
                    onClick={handleClearSuggestion}
                    className="w-1/3 bg-gray-300 text-black p-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  >
                    Clear Suggestion
                  </button>
                </div>
                <TextAreaField
                  label="Complaint"
                  value={formData.complaint}
                  onChange={(value) => {
                    if (value.length <= 1000) {
                      updateFormData("complaint", value);
                      setError(""); // Clear error if within limit
                    } else {
                      setError("Complaint cannot exceed 1000 characters.");
                    }
                  }}
                  placeholder={formData.complaintType ? complaintPlaceholders[formData.complaintType] : "Select a complaint type to see an example..."}
                  required
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formData.complaint.length}/1000 characters
                </p>
              </div>

              <div className="p-4 border rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Draft Complaint Preview</h3>
                <p className="text-gray-600 mb-2 dark:text-gray-400">This updates as you type.</p>
                <pre
                  className="whitespace-pre-wrap mb-4 min-h-[400px] border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  style={{ borderColor: formData.complaint ? "green" : "gray" }}
                >
                  {formData.complaint
                    ? `To: ${socialHandles.companyName},\n\n${formData.complaint}\n\nFrom: ${formData.fullName}`
                    : "Start typing your complaint above..."}
                </pre>

                <button
                  onClick={handleTidyComplaint}
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={tidyLoading || !formData.complaint || !formData.consent}
                >
                  {tidyLoading ? "Tidying Complaint..." : "Tidy Complaint with AI"}
                </button>

                {showLegalReminder && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 max-w-md">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Before Tidying Your Complaint</h3>
                      <p className="text-gray-700 mb-2 dark:text-gray-300">
                        This complaint will be tidied using Mistral AI, an open-source model that refines your text for clarity.{" "}
                        <a href="https://mistral.ai" className="text-blue-600 hover:underline dark:text-blue-400">Learn more</a>.
                      </p>
                      <p className="text-gray-700 mb-4 dark:text-gray-300">
                        Ensure your complaint complies with UK laws (e.g., no threats or offensive content). You remain fully responsible for its content.
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setShowLegalReminder(false)}
                          className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmTidyComplaint}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {showShareConfirmation && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 max-w-md">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Confirm Sharing</h3>
                      <p className="text-gray-700 mb-4 dark:text-gray-300">
                        Are you sure you want to share your complaint on {showShareConfirmation}? This will make your complaint public, and you are responsible for its content.
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setShowShareConfirmation(null)}
                          className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => confirmShare(showShareConfirmation)}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {tidiedComplaint && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Tidied Complaint:</h3>
                    {isEditingTidiedComplaint ? (
                      <TextAreaField
                        label=""
                        value={editedTidiedComplaint}
                        onChange={(value) => setEditedTidiedComplaint(value)}
                        placeholder="Edit your tidied complaint here"
                        className="min-h-[400px]"
                      />
                    ) : (
                      <pre
                        ref={tidiedComplaintRef as React.RefObject<HTMLPreElement>}
                        className="whitespace-pre-wrap mb-4 min-h-[400px] border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      >
                        {editedTidiedComplaint || tidiedComplaint}
                      </pre>
                    )}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleEditToggle}
                        className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        {isEditingTidiedComplaint ? "Save Changes" : "Edit Complaint"}
                      </button>
                      <button
                        onClick={() => handleCopyToClipboard(isEditingTidiedComplaint ? editedTidiedComplaint : tidiedComplaint)}
                        className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        📋 Copy Complaint
                      </button>
                      <button
                        onClick={handleShareOnX}
                        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 flex items-center justify-center gap-2 dark:bg-gray-800 dark:hover:bg-gray-700"
                        disabled={isEditingTidiedComplaint || !formData.consent}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Share on X
                      </button>
                      <button
                        onClick={handleShareOnFacebook}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                        disabled={isEditingTidiedComplaint || !formData.consent}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.845c0-2.509 1.493-3.89 3.777-3.89.755 0 1.545.135 2.314.405v2.536h-1.304c-1.285 0-1.685.798-1.685 1.615V12h2.867l-.457 2.892h-2.41v6.987C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Share on Facebook
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 mt-4 text-center dark:text-red-400">{error}</p>}
            <footer className="mt-8 text-center text-gray-600 dark:text-gray-300">
              <p>
                <Link href="/terms-of-use" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Use</Link> |{" "}
                <Link href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link> |{" "}
                <Link href="/consumer-rights" className="text-blue-600 hover:underline dark:text-blue-400">Consumer Rights</Link> |{" "}
                <a href="mailto:info@velaryn.com" className="text-blue-600 hover:underline dark:text-blue-400">Feedback & Suggestions</a>
              </p>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}