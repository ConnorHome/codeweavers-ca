import { createFileRoute } from "@tanstack/react-router";
import vehiclesData from "../data/vehicles.json";
import { useEffect, useMemo, useState } from "react";
import type { Vehicle } from "../types";
import { mockApi } from "../utils/mockApi";
import { VehicleCard } from "../components/vehicleCard";
import { Spinner } from "../components/spinner";
import { Select } from "../components/select";
import { Input } from "../components/input";

export const Route = createFileRoute("/")({
  component: Index,
});

const sortOptions = [
  { value: "price-asc", label: "Price (lowest first)" },
  { value: "price-desc", label: "Price (highest first)" },
  { value: "year-asc", label: "Year (oldest first)" },
  { value: "year-desc", label: "Year (newest first)" },
  { value: "mileage-asc", label: "Mileage (lowest first)" },
  { value: "mileage-desc", label: "Mileage (highest first)" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const sortMethods: Record<SortValue, (a: Vehicle, b: Vehicle) => number> = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "year-asc": (a, b) => a.year - b.year,
  "year-desc": (a, b) => b.year - a.year,
  "mileage-asc": (a, b) => a.mileage - b.mileage,
  "mileage-desc": (a, b) => b.mileage - a.mileage,
};

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Vehicle[]>([]);
  const [sortOrder, setSortOrder] = useState<SortValue>(sortOptions[0].value);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = (await mockApi(vehiclesData)) as Vehicle[];
      setData(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const sortedData = useMemo(() => {
    return data
      .filter((vehicle) =>
        `${vehicle.make} ${vehicle.model}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .toSorted(sortMethods[sortOrder]);
  }, [data, searchTerm, sortOrder]);

  return (
    <div className="p-10 min-h-dvh">
      <header className="flex gap-3 items-center mb-5 text-3xl uppercase text-slate-500">
        <h1 className="font-extrabold">Available Vehicles</h1>

        {isLoading ? <Spinner /> : `(${data.length})`}
      </header>

      <div className="flex not-sm:flex-col gap-5 justify-between mb-10">
        <Select
          className="flex-1"
          name="sort-by"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortValue)}
        >
          {sortOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </Select>

        <Input
          placeholder="Search make & model…"
          className="flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {sortedData.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sortedData.map((vehicle) => {
            return (
              <li key={vehicle.id}>
                <VehicleCard {...vehicle} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
