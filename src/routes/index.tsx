import { createFileRoute } from "@tanstack/react-router";
import vehiclesData from "../data/vehicles.json";
import { useEffect, useState } from "react";
import type { Vehicle } from "../types";
import { mockApi } from "../utils/mockApi";
import { VehicleCard } from "../components/vehicleCard";
import { Spinner } from "../components/spinner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Vehicle[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = (await mockApi(vehiclesData)) as Vehicle[];
      setData(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="p-10 min-h-dvh">
      <header className="flex gap-3 items-center mb-10 text-3xl uppercase text-slate-500">
        <h1 className="font-extrabold">Available Vehicles</h1>

        {isLoading ? <Spinner /> : `(${data.length})`}
      </header>

      {data.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.map((vehicle) => {
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
