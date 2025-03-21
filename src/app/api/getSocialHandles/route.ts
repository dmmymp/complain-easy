import { NextResponse } from "next/server";
import FuzzySearch from "fuzzy-search";
import companyDatabase from "./company_database.json";

interface CompanyEntry {
  serial: number;
  company_name: string;
  company_number: string;
  company_complaints_email: string;
  x_handle: string;
  facebook_handle: string;
}

// Build the social handle map for exact matches
const socialHandleMap: Record<string, CompanyEntry> = {};
companyDatabase.forEach((entry: CompanyEntry) => {
  const key = entry.company_name.toLowerCase().replace(/\s+/g, "");
  socialHandleMap[key] = entry;
});

// Initialize fuzzy searcher for similar name matches
const searcher = new FuzzySearch(companyDatabase, ["company_name"], {
  caseSensitive: false,
  sort: true,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const company = searchParams.get("company");

  if (!company) {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  }

  const companyKey = company.toLowerCase().replace(/\s+/g, "");
  const companySlug = `@${companyKey}`;
  const defaultEmail = `customerservice@${companyKey}.co.uk`;

  try {
    // First try an exact match
    let entry = socialHandleMap[companyKey];

    // If no exact match, use fuzzy search to find similar names
    if (!entry) {
      const fuzzyResults = searcher.search(company);
      entry = fuzzyResults.length > 0 ? fuzzyResults[0] : null;
    }

    if (entry) {
      return NextResponse.json({
        xHandle: entry.x_handle,
        fbHandle: entry.facebook_handle,
        email: entry.company_complaints_email,
        companyNumber: entry.company_number,
        companyName: entry.company_name,
        message: "Details retrieved from database.",
      });
    } else {
      return NextResponse.json({
        xHandle: `${companySlug} (guess)`, // Add "(guess)" to clarify it's speculative
        fbHandle: `${companySlug} (guess)`, // Same for Facebook
        email: defaultEmail,
        companyNumber: "Unknown",
        message: "Company not in database. Social handles are guesses—verify manually.",
      });
    }
  } catch (err) {
    console.error("Error in getSocialHandles:", err);
    return NextResponse.json({
      xHandle: `${companySlug} (guess)`, // Consistent fallback
      fbHandle: `${companySlug} (guess)`,
      email: defaultEmail,
      companyNumber: "Unknown",
      message: "Error retrieving details. Social handles are guesses—verify manually.",
    });
  }
}