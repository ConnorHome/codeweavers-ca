import { useReducer } from "react";
import type { FinanceQuote, Vehicle } from "../types";
import { cn } from "../utils/styling";
import { Input } from "./input";

function Label({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"label">) {
  return (
    <label
      className={cn("flex gap-3 items-center *:w-1/2", className)}
      {...rest}
    />
  );
}

function stringToNumberReducer(prev: number, next: number) {
  if (Number.isNaN(next)) return prev;
  return next;
}

export interface FinanceCalculatorProps
  extends React.ComponentPropsWithoutRef<"section"> {
  vehicle: Vehicle;
}

export function FinanceCalculator({
  vehicle,
  className,
  ...rest
}: FinanceCalculatorProps) {
  const [deposit, setDeposit] = useReducer(
    stringToNumberReducer,
    vehicle.price / 10
  );
  const [term, setTerm] = useReducer(stringToNumberReducer, 60);

  const totalAmountOfCredit = vehicle.price - deposit;
  const results: FinanceQuote = {
    onTheRoadPrice: vehicle.price,
    totalDeposit: deposit,
    totalAmountOfCredit,
    numberOfMonthlyPayments: term,
    monthlyPayment: totalAmountOfCredit / term,
  };

  return (
    <section
      className={cn(
        "flex flex-col gap-5 border border-slate-200 rounded-md p-5 text-slate-800",
        className
      )}
      {...rest}
    >
      <h2 className="font-medium text-lg">Finance Calculator</h2>

      <form className="flex flex-col gap-3 w-full">
        <Label>
          <span>Deposit (pounds)</span>
          <Input
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
          />
        </Label>

        <Label>
          <span>Term (months)</span>
          <Input
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
          />
        </Label>
      </form>

      <dl className="flex flex-col gap-3 bg-slate-100 border uppercase text-slate-500 border-slate-200 p-5 rounded-md [&_div]:flex [&_div]:gap-5 [&_dt]:w-1/2">
        <div>
          <dt>On the road price</dt>
          <dd>£{results.onTheRoadPrice.toLocaleString()}</dd>
        </div>

        <div>
          <dt>Total deposit</dt>
          <dd>£{results.totalDeposit.toLocaleString()}</dd>
        </div>

        <div>
          <dt>Total amount of credit</dt>
          <dd>£{results.totalAmountOfCredit.toLocaleString()}</dd>
        </div>

        <div>
          <dt>Number of monthly payments</dt>
          <dd>{results.numberOfMonthlyPayments}</dd>
        </div>

        <div className="text-xl font-bold">
          <dt>Monthly payment</dt>
          <dd>£{results.monthlyPayment.toLocaleString()}</dd>
        </div>
      </dl>
    </section>
  );
}
