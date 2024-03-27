import { NextResponse } from "next/server";
import scrapeEtfs from "@/lib/scrapeEtfs";
import scrape from "@/lib/scrape";


export const runtime = "edge";


export async function POST(request) {
   const { url, type, etf_name } = await request.json();

  const scrapedData = await scrape(url, type, etf_name);
  return NextResponse.json(scrapedData);
}
