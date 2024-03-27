/* const fs = require("fs"); */
import { getRequestContext } from "@cloudflare/next-on-pages";
export default async (selectedETFVolumes) => {
  //get prices from db
  let prices;
  try {
    const { env } = getRequestContext();
    const statement = await env.DB.prepare("SELECT * FROM prices");

    let { results } = await statement.all();
    prices = results;
  } catch (error) {
    console.log(error);
  }

  let availableStocks = selectedETFVolumes.map((stock) => {
    let stockPrice = prices.find((price) => price.name === stock.companyName);
    return {
      name: stock.companyName,
      change: stockPrice?.change,
      volume: stock.volume,
    };
  });

  let totalVolume = 0;
  let totalChange = 0;
  availableStocks.forEach((stock) => {
    if (stock.volume != "" && stock.name) {
      totalVolume += Number(stock.volume.replace(",", "."));
      totalChange += stock.change * Number(stock.volume.replace(",", "."));
    }
  });
  //total volume sometimes less than 100
  let change = totalChange / totalVolume;
  change = Number(change.toFixed(4));
  return {
    change,
    stocks: availableStocks,
  };
};
