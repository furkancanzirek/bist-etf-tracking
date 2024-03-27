import StockCard from "@/components/StockCard";

export const runtime = "edge";

export default async function Home() {
  let results;

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scrape`, {
      method: "POST",
      body: JSON.stringify({
        url: "https://uzmanpara.milliyet.com.tr/canli-borsa/bist-TUM-hisseleri",
        type: "etfs",
      }),
      next: { revalidate: 60 },
    });
    results = await data.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container flex justify-center">
      <StockCard />
    </div>
  );
}
