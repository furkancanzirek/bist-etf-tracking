import getETFChange from "@/services/getETFChange";
import scrape from "@/lib/scrape";
export const revalidate = 0;
export const runtime = "edge";

export default async function Page({ params }) {
  let slug = params.slug;
  let etfChange;
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/scrape`,
      {
        method: "POST",
        body: JSON.stringify({
          url: `https://fintables.com/fonlar/${slug}/portfoy`,
          type: "etf",
          etf_name: slug,
        }),
      }
    );
    let volumes = await response.json();
    etfChange = await getETFChange(volumes);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className={etfChange > 0 ? "text-green-500 text-5xl" : "text-red-500 text-5xl"}>
      {etfChange}
    </div>
  );
}
