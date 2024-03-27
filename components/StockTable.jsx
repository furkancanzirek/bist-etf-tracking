import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

export default function StockTable({ stocks }) {
  // Fonksiyon, stocks dizisini iki eşit parçaya böler
  const splitStocks = (array) => {
    const half = Math.ceil(array.length / 2);
    const firstHalf = array.slice(0, half);
    const secondHalf = array.slice(half);
    return [firstHalf, secondHalf];
  };

  // stocks dizisini iki eşit parçaya böler
  const [leftStocks, rightStocks] = splitStocks(stocks);

  return (
    <>
      <div className="justify-between hidden  lg:flex">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Hisse Senedi</TableHead>
              <TableHead>Günlük Değişim</TableHead>
              <TableHead>Ağırlık</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leftStocks.map((stock) => (
              <TableRow key={stock.name}>
                <TableCell className="font-medium">{stock.name}</TableCell>
                <TableCell
                  className={cn({
                    "text-green-500": stock.change > 0,
                    "text-red-500": stock.change < 0,
                  })}
                >
                  {stock.change}
                </TableCell>
                <TableCell>{stock.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Hisse Senedi</TableHead>
              <TableHead>Günlük Değişim</TableHead>
              <TableHead>Ağırlık</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rightStocks.map((stock) => (
              <TableRow key={stock.name}>
                <TableCell className="font-medium">{stock.name}</TableCell>
                <TableCell
                  className={cn({
                    "text-green-500": stock.change > 0,
                    "text-red-500": stock.change < 0,
                  })}
                >
                  {stock.change}
                </TableCell>
                <TableCell>{stock.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Table className="lg:hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Hisse Senedi</TableHead>
            <TableHead>Günlük Değişim</TableHead>
            <TableHead>Ağırlık</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.name}>
              <TableCell className="font-medium">{stock.name}</TableCell>
              <TableCell
                className={cn({
                  "text-green-500": stock.change > 0,
                  "text-red-500": stock.change < 0,
                })}
              >
                {stock.change}
              </TableCell>
              <TableCell>{stock.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
