"use client";

import React, { useState, useRef, useEffect } from "react";
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
  maxLength,
  inputRef,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) => (
  <div className="mb-4">
    <label className="block text-black dark:text-white mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 border rounded text-black placeholder-gray-500 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400 text-base"
      required={required}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
      ref={inputRef}
    />
    {maxLength && (
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {value.length}/{maxLength} characters
      </p>
    )}
  </div>
);

const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  maxLength,
  textAreaRef,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  className?: string;
  maxLength?: number;
  textAreaRef?: React.RefObject<HTMLTextAreaElement | null>;
}) => (
  <div className="mb-4">
    <label className="block text-black dark:text-white mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full p-3 border rounded text-black placeholder-gray-500 min-h-[120px] dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400 text-base ${className}`}
      required={required}
      maxLength={maxLength}
      ref={textAreaRef}
    />
    {maxLength && (
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {value.length}/{maxLength} characters
      </p>
    )}
  </div>
);

const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex flex-row items-center justify-center mb-6 space-x-2 flex-wrap">
    {/* Step 1: Find Company */}
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
        } transition-all duration-300`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <span
        className={`mt-1 text-xs font-medium text-center ${
          currentStep >= 1 ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Find
      </span>
    </div>

    {/* Arrow */}
    <div
      className={`h-1 w-8 ${
        currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
      } transition-all duration-300`}
    />

    {/* Step 2: Write Complaint */}
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
        } transition-all duration-300`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      <span
        className={`mt-1 text-xs font-medium text-center ${
          currentStep >= 2 ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Write
      </span>
    </div>

    {/* Arrow */}
    <div
      className={`h-1 w-8 ${
        currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"
      } transition-all duration-300`}
    />

    {/* Step 3: Share */}
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
        } transition-all duration-300`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="5" r="3" />
          <rect x="9.5" y="7.5" width="6" height="6" rx="1" />
          <circle cx="5" cy="17" r="3" />
          <rect x="2.5" y="19.5" width="6" height="6" rx="1" />
          <circle cx="19" cy="17" r="3" />
          <rect x="16.5" y="19.5" width="6" height="6" rx="1" />
        </svg>
      </div>
      <span
        className={`mt-1 text-xs font-medium text-center ${
          currentStep >= 3 ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Share
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
  const [showFullScreenComplaint, setShowFullScreenComplaint] = useState<boolean>(false);
  const [suggestionIndex, setSuggestionIndex] = useState<number>(0);
  const [expandedBody, setExpandedBody] = useState<string | null>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const complaintRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const editComplaintRef = useRef<HTMLTextAreaElement>(null);

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

  const scriptedComplaintsWithRegulatoryBody: { [key: string]: string[] } = {
    "Service Delays": [
      "Your service was delayed by over 2 hours with no prior notice, causing significant inconvenience. I am CC’ing [Regulatory Body] to address this issue.",
      "I waited 45 minutes beyond the scheduled time for your technician, disrupting my day. I am CC’ing [Regulatory Body] to ensure this is resolved.",
      "Your delivery arrived 3 days late, despite promises of next-day service. I am CC’ing [Regulatory Body] to escalate this matter.",
    ],
    "Poor Customer Service": [
      "Your staff were unhelpful and rude when I called to resolve an issue with my account. I am CC’ing [Regulatory Body] to address this poor service.",
      "I spent 30 minutes on hold, only to be disconnected without a resolution. I am CC’ing [Regulatory Body] to escalate this issue.",
      "Your representative dismissed my complaint without offering any assistance. I am CC’ing [Regulatory Body] to ensure this is handled properly.",
    ],
    "Billing Issues": [
      "I was overcharged £50 on my last bill with no explanation provided. I am CC’ing [Regulatory Body] to investigate this billing issue.",
      "Your company billed me twice for the same service this month. I am CC’ing [Regulatory Body] to address this error.",
      "I’m still being charged for a subscription I cancelled three months ago. I am CC’ing [Regulatory Body] to resolve this billing dispute.",
    ],
    "Product Quality": [
      "The item I purchased broke within a week, despite being advertised as durable. I am CC’ing [Regulatory Body] to address this product quality issue.",
      "Your product arrived damaged, and I’ve had no response to my refund request. I am CC’ing [Regulatory Body] to escalate this matter.",
      "The quality of your service was far below what was promised on your website. I am CC’ing [Regulatory Body] to investigate this issue.",
    ],
    "Other": [
      "I have an issue not listed here that I’d like addressed promptly. I am CC’ing [Regulatory Body] to ensure this is handled appropriately.",
      "Your company’s actions have caused me unexpected difficulties. I am CC’ing [Regulatory Body] to address this matter.",
      "I’m dissatisfied with an aspect of your service not covered above. I am CC’ing [Regulatory Body] to escalate this issue.",
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
      if (data.companyName.toLowerCase() !== formData.company.toLowerCase()) {
        setError(`Company "${formData.company}" not found. Showing results for "${data.companyName}".`);
      }
      setSocialHandles(data);
    } catch (err: unknown) {
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
    if (!formData.complaintType) {
      setError("Please select a complaint type first.");
      return;
    }

    const hasRegulatoryBody = formData.regulatoryBodies.length > 0;
    const suggestions = hasRegulatoryBody
      ? scriptedComplaintsWithRegulatoryBody[formData.complaintType]
      : scriptedComplaints[formData.complaintType];

    const nextIndex = (suggestionIndex + 1) % suggestions.length;
    let suggestion = suggestions[nextIndex];

    if (hasRegulatoryBody) {
      const regulatoryBodyName = formData.regulatoryBodies[0];
      suggestion = suggestion.replace("[Regulatory Body]", regulatoryBodyName);
    }

    updateFormData("complaint", suggestion);
    setSuggestionIndex(nextIndex);
  };

  const handleClearSuggestion = () => {
    updateFormData("complaint", "");
    setSuggestionIndex(0);
  };

  const handleTidyComplaint = async () => {
    let errorMessage = "";
    let scrollToRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null> | null = null;

    if (!formData.fullName) {
      errorMessage = "Please enter your full name.";
      scrollToRef = fullNameRef;
    } else if (!formData.complaint) {
      errorMessage = "Please enter your complaint.";
      scrollToRef = complaintRef;
    } else if (!formData.consent) {
      errorMessage = "Please consent to data usage by checking the box.";
      scrollToRef = consentRef;
    }

    if (errorMessage) {
      setError(errorMessage);
      if (scrollToRef?.current) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setError("");
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
    } catch (err: unknown) {
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

  const handleShowFullScreen = () => {
    setShowFullScreenComplaint(true);
  };

  const handleShareOnX = () => {
    if (!tidiedComplaint) return;
    setShowShareConfirmation("X");
  };

  const handleShareOnFacebook = () => {
    if (!tidiedComplaint) return;
    setShowShareConfirmation("Facebook");
  };

  const confirmShare = (platform: "X" | "Facebook") => {
    setShowShareConfirmation(null);

    const complaintToShare = isEditingTidiedComplaint ? editedTidiedComplaint : tidiedComplaint;
    const ccHandles = formData.regulatoryBodies
      .map((bodyName) => {
        const body = regulatoryBodies.find((b) => b.name === bodyName);
        return platform === "X" ? body?.xHandle : body?.fbHandle;
      })
      .filter(Boolean);
    const ccText = ccHandles.length > 0 ? ` (CC: ${ccHandles.join(", ")})` : "";
    const url = window.location.href;

    if (platform === "X") {
      const tweetText = `Hey ${socialHandles?.xHandle || "@company"}, here’s my complaint - please fix it!${ccText} Made with this free tool ➡️`;
      const mobileUrl = `twitter://post?message=${encodeURIComponent(tweetText + " " + url)}`;
      window.location.href = mobileUrl;
    } else {
      const fbText = `Complained to ${socialHandles?.fbHandle || "this company"} with this free tool!${ccText}`;
      const mobileUrl = `fb://publish/?text=${encodeURIComponent(fbText + " " + url)}`;
      window.location.href = mobileUrl;
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

  useEffect(() => {
    if (isEditingTidiedComplaint && editComplaintRef.current) {
      editComplaintRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isEditingTidiedComplaint]);

  const getCurrentStep = () => {
    if (tidiedComplaint) return 3;
    if (socialHandles) return 2;
    return 1;
  };

  const handleBackToSearch = () => {
    setSocialHandles(null);
    setFormData({
      company: "",
      fullName: "",
      complaint: "",
      complaintType: "",
      consent: false,
      includeName: false,
      regulatoryBodies: [],
    });
    setTidiedComplaint("");
    setEditedTidiedComplaint("");
    setIsEditingTidiedComplaint(false);
    setError("");
    setSuggestionIndex(0);
    setExpandedBody(null);
  };

  return (
    <>
      <Head>
        <meta property="og:title" content="Complain Easy - Beta" />
        <meta property="og:description" content="I complained to a company in minutes with this free tool! Try it ➡️" />
        <meta property="og:url" content="https://your-complaint-app-url.com" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="container mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 min-h-screen">
        {!socialHandles ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
            <h1 className="text-xl sm:text-2xl font-bold mb-2 text-black dark:text-white">Complain Easy - Beta</h1>
            <p className="text-gray-600 mb-4 dark:text-gray-300 text-center">Post a complaint to a company’s social media in minutes.</p>
            <p className="text-sm text-yellow-600 mb-4 dark:text-yellow-400 text-center">
              This is a beta version—please send feedback to <a href="mailto:info@velaryn.com" className="underline">info@velaryn.com</a>.
            </p>
            <div className="w-full max-w-md">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-black dark:text-white">How It Works</h2>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <li>Find the Company – Search for their social media profiles.</li>
                  <li>Write Your Complaint – Describe your issue clearly.</li>
                  <li>Share It – Post directly to X or Facebook in one click.</li>
                </ol>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-black dark:text-white">About This Tool</h2>
                <ul className="list-none text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <li>✔ <strong>Free for UK consumers</strong> – Make your voice heard.</li>
                  <li>✔ <strong>Privacy-focused</strong> – We do not store your data after use.</li>
                  <li>✔ <strong>Quick & Easy</strong> – Just write, post, and let the company respond.</li>
                </ul>
              </div>
              <InputField
                label="Company Name"
                value={formData.company}
                onChange={(value) => updateFormData("company", value)}
                placeholder="e.g., British Gas"
                required
                onKeyDown={handleCompanyKeyDown}
                maxLength={50}
              />
              <button
                onClick={handleSearch}
                className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-base"
                disabled={loading}
              >
                {loading ? "Searching..." : "Find Company"}
              </button>
              {error && <p className="text-red-500 mt-4 text-center dark:text-red-400">{error}</p>}
            </div>
            <footer className="mt-8 text-center text-gray-600 dark:text-gray-300 text-sm">
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
            <h1 className="text-xl sm:text-2xl font-bold mb-6 text-black dark:text-white text-center">Complain Easy - Beta</h1>
            <p className="text-sm text-yellow-600 mb-4 dark:text-yellow-400 text-center">
              Beta version—send feedback to <a href="mailto:info@velaryn.com" className="underline">info@velaryn.com</a>.
            </p>
            <div className="text-center mb-4">
              <Link
                href="/"
                className="text-blue-800 hover:underline dark:text-blue-400 font-semibold text-sm sm:text-base"
                onClick={handleBackToSearch}
              >
                Back to Company Search
              </Link>
            </div>
            <ProgressIndicator currentStep={getCurrentStep()} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-4 border rounded bg-gray-100 text-black dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <p className="text-sm text-gray-700 mb-4 dark:text-gray-300">
                  <strong>About This Tool:</strong> A free way to post complaints to company social media. <strong>We don’t store your data after use—just write and share.</strong>
                </p>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-black dark:text-white">{socialHandles!.companyName}</h2>
                <p><strong className="text-black dark:text-white">X Handle:</strong> {socialHandles!.xHandle}</p>
                <p><strong className="text-black dark:text-white">Facebook Handle:</strong> {socialHandles!.fbHandle}</p>
                <p
                  className={`mt-2 flex items-center text-sm ${
                    socialHandles!.message === "Details retrieved from database."
                      ? "text-green-600 dark:text-green-400"
                      : socialHandles!.message === "Company not in database. Social handles are guesses—verify manually."
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {socialHandles!.message === "Details retrieved from database." && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {socialHandles!.message}
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2 text-black dark:text-white">Your Details</h3>
                <InputField
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(value) => updateFormData("fullName", value)}
                  placeholder="Your Full Name"
                  required
                  maxLength={100}
                  inputRef={fullNameRef}
                />
                <label className="flex items-center mb-4 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateFormData("consent", e.target.checked)}
                    className="mr-2"
                    ref={consentRef}
                  />
                  <span className="text-black dark:text-white">I consent to my data being used temporarily to generate and share this complaint. Data is not stored after use.</span>
                </label>
                <label className="flex items-center mb-4 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={formData.includeName}
                    onChange={(e) => updateFormData("includeName", e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-black dark:text-white">Include my name in the post (if unchecked, name will be omitted)</span>
                </label>

                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Disclaimer</h3>
                <p className="text-gray-700 mb-4 dark:text-gray-300 text-sm sm:text-base">
                  You’re responsible for your complaint’s content, which must comply with UK laws (e.g., Public Order Act 1986). We don’t store your data after use, review your content, or endorse it. Use responsibly. CC’ing regulatory bodies does not guarantee action; you’re responsible for ensuring your complaint is appropriate for escalation.
                </p>

                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Draft Your Complaint</h3>
                <div className="mb-4">
                  <label className="block text-black dark:text-white mb-1 text-sm sm:text-base">Complaint Type</label>
                  <select
                    value={formData.complaintType}
                    onChange={(e) => {
                      updateFormData("complaintType", e.target.value);
                      updateFormData("regulatoryBodies", []);
                      setExpandedBody(null);
                    }}
                    className="w-full p-3 border rounded text-black dark:text-white dark:bg-gray-800 dark:border-gray-700 text-base"
                  >
                    <option value="">Select a complaint type</option>
                    {complaintTypes.map((type) => (
                      <option key={type} value={type} className="text-black dark:text-white">{type}</option>
                    ))}
                  </select>
                </div>
                {formData.complaintType && (
                  <div className="mb-4">
                    <label className="block text-black dark:text-white mb-1 text-sm sm:text-base">
                      CC Regulatory Bodies (Optional)
                    </label>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 dark:text-gray-400">
                      Select a body to copy in on your complaint to escalate the issue. Tap the info icon for guidance.
                    </p>
                    {regulatoryBodies
                      .filter((body) => body.appliesTo.includes(formData.complaintType))
                      .map((body) => (
                        <div key={body.name} className="mb-2">
                          <div className="flex items-center">
                            <label className="flex items-center flex-1 text-sm sm:text-base">
                              <input
                                type="radio"
                                name="regulatoryBody"
                                checked={formData.regulatoryBodies.includes(body.name)}
                                onChange={(e) => {
                                  const updatedBodies = e.target.checked ? [body.name] : [];
                                  updateFormData("regulatoryBodies", updatedBodies);
                                }}
                                className="mr-2"
                              />
                              <span className="text-black dark:text-white">{body.name}</span>
                            </label>
                            <button
                              onClick={() => setExpandedBody(expandedBody === body.name ? null : body.name)}
                              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
                            <div className="mt-1 p-2 bg-gray-200 dark:bg-gray-700 rounded text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                              {body.description}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <button
                    onClick={handleGetSuggestion}
                    className={`w-full sm:w-2/3 bg-yellow-500 text-black p-3 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white text-base ${!formData.complaintType ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!formData.complaintType}
                  >
                    Get Suggestion
                  </button>
                  <button
                    onClick={handleClearSuggestion}
                    className="w-full sm:w-1/3 bg-gray-300 text-black p-3 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 text-base"
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
                      setError("");
                    } else {
                      setError("Complaint cannot exceed 1000 characters.");
                    }
                  }}
                  placeholder={formData.complaintType ? complaintPlaceholders[formData.complaintType] : "Select a complaint type to see an example..."}
                  required
                  maxLength={1000}
                  textAreaRef={complaintRef}
                />
              </div>

              <div className="p-4 border rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Draft Complaint Preview</h3>
                <p className="text-gray-600 mb-2 dark:text-gray-400 text-sm">This updates as you type.</p>
                <pre
                  className="whitespace-pre-wrap mb-4 min-h-[200px] border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 text-sm sm:text-base"
                  style={{ borderColor: formData.complaint ? "green" : "gray" }}
                >
                  {formData.complaint
                    ? `To: ${socialHandles!.companyName},\n\n${formData.complaint}\n\nFrom: ${formData.fullName}`
                    : "Start typing your complaint to see a preview..."}
                </pre>

                <button
                  onClick={handleTidyComplaint}
                  className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 text-base"
                  disabled={tidyLoading || !formData.complaint || !formData.consent}
                >
                  {tidyLoading ? "Tidying Complaint..." : "Tidy Complaint with AI"}
                </button>

                {showLegalReminder && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 max-w-md w-full">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Before Tidying Your Complaint</h3>
                      <p className="text-gray-700 mb-2 dark:text-gray-300 text-sm sm:text-base">
                        This complaint will be tidied using Mistral AI, an open-source model that refines your text for clarity.{" "}
                        <a href="https://mistral.ai" className="text-blue-600 hover:underline dark:text-blue-400">Learn more</a>.
                      </p>
                      <p className="text-gray-700 mb-4 dark:text-gray-300 text-sm sm:text-base">
                        Ensure your complaint complies with UK laws (e.g., no threats or offensive content). You remain fully responsible for its content.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => setShowLegalReminder(false)}
                          className="w-full bg-gray-300 text-black p-3 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 text-base"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmTidyComplaint}
                          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-base"
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {showShareConfirmation && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 max-w-md w-full">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Confirm Sharing</h3>
                      <p className="text-gray-700 mb-4 dark:text-gray-300 text-sm sm:text-base">
                        Are you sure you want to share your complaint on {showShareConfirmation}? This will make your complaint public, and you are responsible for its content.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => setShowShareConfirmation(null)}
                          className="w-full bg-gray-300 text-black p-3 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 text-base"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => confirmShare(showShareConfirmation!)}
                          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-base"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {showFullScreenComplaint && (
                  <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-4">
                    <pre className="whitespace-pre-wrap text-black dark:text-white text-base mb-4">
                      {isEditingTidiedComplaint ? editedTidiedComplaint : tidiedComplaint}
                    </pre>
                    <p className="text-black dark:text-white text-sm mb-4 text-center">
                      Press Side + Volume Up to screenshot (or Home + Power on older iPhones). Then open {showShareConfirmation} app, tap the text box, and select "Paste" to add the screenshot.
                    </p>
                    <button
                      onClick={() => setShowFullScreenComplaint(false)}
                      className="bg-gray-300 text-black p-3 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 text-base"
                    >
                      Back
                    </button>
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
                        className="min-h-[200px]"
                        textAreaRef={editComplaintRef}
                      />
                    ) : (
                      <pre
                        className="whitespace-pre-wrap mb-4 min-h-[200px] border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 text-sm sm:text-base"
                      >
                        {editedTidiedComplaint || tidiedComplaint}
                      </pre>
                    )}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleEditToggle}
                        className="w-full bg-gray-300 text-black p-3 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 text-base"
                      >
                        {isEditingTidiedComplaint ? "Save Changes" : "Edit Complaint"}
                      </button>
                      <button
                        onClick={() => handleCopyToClipboard(isEditingTidiedComplaint ? editedTidiedComplaint : tidiedComplaint)}
                        className="w-full bg-gray-300 text-black p-3 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 text-base"
                      >
                        📋 Copy Complaint Text
                      </button>
                      <button
                        onClick={handleShowFullScreen}
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-base"
                        disabled={isEditingTidiedComplaint || !formData.consent}
                      >
                        View Full Screen to Screenshot
                      </button>
                      <button
                        onClick={handleShareOnX}
                        className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 flex items-center justify-center gap-2 dark:bg-gray-800 dark:hover:bg-gray-700 text-base"
                        disabled={isEditingTidiedComplaint || !formData.consent}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Share on X
                      </button>
                      <button
                        onClick={handleShareOnFacebook}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 flex items-center justify-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-800 text-base"
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
            <footer className="mt-8 text-center text-gray-600 dark:text-gray-300 text-sm">
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