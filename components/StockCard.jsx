"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ComboBoxResponsive } from "@/components/SearchBox";
import StockTable from "@/components/StockTable";
import getFundCodes from "@/lib/getFundCodes";
import fetchFundChange from "@/actions/fetchFundChange";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";

const StockCard = () => {
  const [formData, action] = useFormState(fetchFundChange, {
    change: null,
    stocks: null,
  });
  const fundCodes = getFundCodes().map((fund) => {
    return {
      value: fund,
      label: fund,
    };
  });

  const totalVolume = formData?.stocks?.reduce((acc, stock) => {
    return acc + Number(stock.volume.replace(",", "."));
  }, 0);
  return (
    <form action={action} className="w-full max-w-lg space-y-6" id="fund-form">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="font-medium text-md">Günlük Değişim</CardTitle>
          <ComboBoxResponsive data={fundCodes} />
        </CardHeader>
        <CardContent>
          {formData.change === null ? (
            <p className="py-2 text-sm">
              Değişim oranını görmek için bir fon seçiniz.
            </p>
          ) : typeof formData.change === "number" && !isNaN(formData.change) ? (
            <div
              className={`text-2xl font-bold ${
                formData.change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {`${formData.change}%`}
            </div>
          ) : (
            <div className="font-bold text-red-400 text-md">
              {"Hisse senedi içeren bir fon seçtiğinizden emin olunuz."}
            </div>
          )}
        </CardContent>
      </Card>
      {formData.stocks && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="font-medium text-md">
              Hisse Senetleri
            </CardTitle>
            <span className="text-sm font-normal">
              Toplam Ağırlık:
              <span className="ml-2 font-bold">
                {totalVolume.toFixed(2)}
                <span className="ml-1">%</span>
              </span>
            </span>
          </CardHeader>
          <CardContent>
            <StockTable stocks={formData.stocks} />
          </CardContent>
        </Card>
      )}
    </form>
  );
};

export default StockCard;
