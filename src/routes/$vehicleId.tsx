import { createFileRoute, Link } from "@tanstack/react-router";
import vehiclesData from "../data/vehicles.json";
import { useEffect, useState } from "react";
import { mockApi } from "../utils/mockApi";
import type { Vehicle } from "../types";
import { Spinner } from "../components/spinner";

export const Route = createFileRoute("/$vehicleId")({
  component: Vehicle,
});

function NotFoundState() {
  return (
    <div className="flex flex-col items-start gap-5">
      <h1 className="text-3xl uppercase font-extrabold">
        We were unable to find that vehicle
      </h1>

      <Link to="/" className="btn">
        Back to listings
      </Link>
    </div>
  );
}

function Vehicle() {
  const { vehicleId } = Route.useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Vehicle | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = (await mockApi(
        vehiclesData.filter((vehicle) => vehicle.id === vehicleId)[0]
      )) as Vehicle;
      setData(response);
      setIsLoading(false);
    }
    fetchData();
  }, [vehicleId]);

  const notFound = !isLoading && !data;

  return (
    <div className="p-10 min-h-dvh">
      <header className="mb-5 text-slate-500">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {notFound ? (
              <NotFoundState />
            ) : (
              <h1 className="text-3xl uppercase font-extrabold">
                {data?.make} {data?.model}
              </h1>
            )}
          </>
        )}
      </header>
    </div>
  );
}
