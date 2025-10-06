import { Link } from "@tanstack/react-router";
import type { Vehicle } from "../types";

function MetaWrapper({ ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className="flex gap-3 justify-between uppercase text-xs text-slate-500"
      {...rest}
    />
  );
}

export interface VehicleCardProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "id">,
    Vehicle {}

export function VehicleCard({
  id,
  make,
  model,
  year,
  price,
  mileage,
  colour,
  ...rest
}: VehicleCardProps) {
  return (
    <div
      className="flex flex-col relative p-3 bg-slate-100 rounded-md gap-2 border border-slate-200 hover:shadow transition-shadow"
      {...rest}
    >
      <Link
        to="/$vehicleId"
        params={{ vehicleId: id }}
        aria-labelledby="heading"
        className="absolute inset-0"
      />

      <MetaWrapper>
        <span>{make}</span>
        <span>{year}</span>
      </MetaWrapper>

      <div className="flex gap-3 justify-between">
        <h2 id="heading" className="text-slate-800">
          {model}
        </h2>

        {/* Assuming the price is in pounds */}
        <span>£{price.toLocaleString()}</span>
      </div>

      <MetaWrapper>
        <span>{mileage.toLocaleString()} miles</span>
        <span
          style={{ backgroundColor: colour }}
          className="size-3 rounded-full border border-slate-200 saturate-80"
          aria-label={colour}
        />
      </MetaWrapper>
    </div>
  );
}
