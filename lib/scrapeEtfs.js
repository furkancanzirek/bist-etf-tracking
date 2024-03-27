const cheerio = require("cheerio");
import { getRequestContext } from '@cloudflare/next-on-pages'
/* import fs from "fs"; */
export default async (html) => {
  const $ = cheerio.load(html);
  const etfArray = [];
  const elementsWithHTrId = $('[id^="h_tr_id_"]');

  elementsWithHTrId.each((index, element) => {
    const stockName = $(element).find("td.currency b").text().trim();
    const percentageChange = $(element)
      .find(`[id^="h_td_yuzde_id_${stockName}"]`)
      .text()
      .trim();
    const jsonData = {
      name: stockName,
      change: percentageChange,
    };
    etfArray.push(jsonData);
  });

  /*  const db = JSON.parse(fs.readFileSync("db.json")); */

  try {
    let values = [];
    for (let entry of etfArray) {
      let name = entry.name.replace("'", "''");
      let change = entry.change.replace(",", ".");
      values.push(`('${name}', ${change})`);
    }
    let query = `INSERT OR REPLACE INTO prices (name, change) VALUES ${values.join(", ")};`;
    const { env } = getRequestContext();
    let data = await env.DB.exec(query);

    return etfArray
  } catch (error) {
    console.log(error);
  }
};
