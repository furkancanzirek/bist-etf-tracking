import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export async function GET(request) {
  /*  const db = JSON.parse(fs.readFileSync("db.json")); */
  let db = {
    prices: {},
  };
  return NextResponse.json(db.prices);
}
