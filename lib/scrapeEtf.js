const cheerio = require("cheerio");
import { getRequestContext } from "@cloudflare/next-on-pages";
import getETFChange from "@/services/getETFChange";

export const revalidate = 10000;

const parseHtml = async (html) => {
  const $ = cheerio.load(html);

  const volumesArray = [];
  const firstTable = $(
    "div:nth-child(1) div div:nth-child(2) div div table"
  ).first();
  let companyName = $(firstTable).find("tbody tr td a");
  companyName = $(companyName).find(".text-foreground-01");
  const targetSpans = firstTable.find("tbody tr td span");

  for (let i = 0; i < targetSpans.length; i += 3) {
    const volume = targetSpans
      .eq(i + 1)
      .text()
      .replace("%", "")
      .trim();

    volumesArray.push({
      companyName: null,
      volume,
    });
  }
  companyName.each((i, el) => {
    volumesArray[i].companyName = $(el).text();
  });
  return { volumesArray };
};

export default async (html, name) => {
  const { volumesArray } = await parseHtml(html);
  const { env } = getRequestContext();
  await env.DB.exec(
    `INSERT OR REPLACE INTO volumes (fundName, volumes) VALUES ('${name}', '${JSON.stringify(
      volumesArray
    )}')`
  );

  /*   fs.writeFileSync("db.json", JSON.stringify(db)); */
  return volumesArray;
};

export const fetchFundChange = async (fundCode) => {
  try {
    let response;
    let volumes;
    try {
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scrape`, {
        method: "POST",
        body: JSON.stringify({
          url: `https://fintables.com/fonlar/${fundCode}/portfoy`,
          type: "etf",
          etf_name: fundCode,
        }),
        next: { revalidate: 60 * 60 * 24 },
      });
      volumes = await response.json();
    } catch (error) {
      console.log(error);
    }
    
    return await getETFChange(volumes);
  } catch (error) {
    console.log(error);
  }
};
