import scrapeEtf from "./scrapeEtf";
import scrapeEtfs from "./scrapeEtfs";

const scrape = async (url, type, etf_name) => {
  try {
    let url =
      type === "etf"
        ? `https://fintables.com/fonlar/${etf_name.toUpperCase()}/portfoy`
        : "https://uzmanpara.milliyet.com.tr/canli-borsa/bist-TUM-hisseleri/";

    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.log(error);
  }
};

export default async (url, type, etf_name) => {
  let html = await scrape(url, type, etf_name);
  switch (type) {
    case "etf":
      let data = await scrapeEtf(html, etf_name);
      return data;
      break;
    case "etfs":
      return await scrapeEtfs(html);
      break;
    default:
      break;
  }
};
