import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$vehicleId")({
  component: Vehicle,
});

function Vehicle() {
  const { vehicleId } = Route.useParams();

  return <h1>{vehicleId}</h1>;
}
