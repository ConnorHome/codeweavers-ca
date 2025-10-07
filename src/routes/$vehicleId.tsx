import { createFileRoute, Link } from "@tanstack/react-router";
import vehiclesData from "../data/vehicles.json";
import { useEffect, useState } from "react";
import { mockApi } from "../utils/mockApi";
import type { Vehicle } from "../types";
import { Spinner } from "../components/spinner";
import { FinanceCalculator } from "../components/financeCalculator";

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
              <div className="flex flex-col gap-5">
                <Link to="/" className="text-sm underline">
                  Back to listings
                </Link>

                <h1 className="text-3xl uppercase font-extrabold">
                  {data?.make} {data?.model}
                </h1>
              </div>
            )}
          </>
        )}
      </header>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <dl className="self-start flex flex-col gap-3 bg-slate-100 border uppercase text-slate-500 border-slate-200 p-5 rounded-md [&_div]:flex [&_div]:gap-5 [&_dt]:w-1/2 [&_dt]:font-bold">
            <div>
              <dt>Year</dt>
              <dd>{data.year}</dd>
            </div>

            <div>
              <dt>Price</dt>
              <dd>£{data.price.toLocaleString()}</dd>
            </div>

            <div>
              <dt>Mileage</dt>
              <dd>{data.mileage.toLocaleString()}</dd>
            </div>

            <div>
              <dt>Colour</dt>
              <dd>{data.colour}</dd>
            </div>
          </dl>

          <FinanceCalculator vehicle={data} />
        </div>
      )}
    </div>
  );
}
