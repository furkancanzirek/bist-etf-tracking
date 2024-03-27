"use server";

import { fetchFundChange } from "@/lib/scrapeEtf";

export default async (prevState, formData) => {
  const fundCode = formData.get("fundCode");
  let { change, stocks } = await fetchFundChange(fundCode);
  return {
    change,
    stocks,
  };
};
