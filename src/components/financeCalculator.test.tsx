import { describe, expect, it } from "vitest";
import {
  FinanceCalculator,
  type FinanceCalculatorProps,
} from "./financeCalculator";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function _render(props?: Partial<FinanceCalculatorProps>) {
  return (
    <FinanceCalculator
      vehicle={{
        id: "veh001",
        make: "Polestar",
        model: "5",
        year: 2025,
        mileage: 1020,
        colour: "white",
        price: 95000,
        ...props?.vehicle,
      }}
      {...props}
    />
  );
}

describe("FinanceCalculator", () => {
  it("correct defaults", () => {
    render(_render());

    expect(screen.getByLabelText("Deposit (pounds)")).toHaveValue("9500");
    expect(screen.getByLabelText("Term (months)")).toHaveValue("60");

    expect(screen.getByTestId("on-the-road-price")).toHaveTextContent(
      "£95,000"
    );
    expect(screen.getByTestId("total-deposit")).toHaveTextContent("£9,500");
    expect(screen.getByTestId("total-amount-of-credit")).toHaveTextContent(
      "£85,500"
    );
    expect(screen.getByTestId("number-of-monthly-payments")).toHaveTextContent(
      "60"
    );
    expect(screen.getByTestId("monthly-payment")).toHaveTextContent("£1,425");
  });

  it("handles entry into the inputs and updates calculator", async () => {
    render(_render());

    const depositInput = screen.getByLabelText("Deposit (pounds)");
    await userEvent.clear(depositInput);
    await userEvent.type(depositInput, "2500");
    expect(depositInput).toHaveValue("2500");
    expect(screen.getByTestId("on-the-road-price")).toHaveTextContent(
      "£95,000"
    );
    expect(screen.getByTestId("total-deposit")).toHaveTextContent("£2,500");
    expect(screen.getByTestId("total-amount-of-credit")).toHaveTextContent(
      "£92,500"
    );
    expect(screen.getByTestId("number-of-monthly-payments")).toHaveTextContent(
      "60"
    );
    expect(screen.getByTestId("monthly-payment")).toHaveTextContent(
      "£1,541.67"
    );

    const termInput = screen.getByLabelText("Term (months)");
    await userEvent.clear(termInput);
    await userEvent.type(termInput, "24");
    expect(termInput).toHaveValue("24");
    expect(screen.getByTestId("on-the-road-price")).toHaveTextContent(
      "£95,000"
    );
    expect(screen.getByTestId("total-deposit")).toHaveTextContent("£2,500");
    expect(screen.getByTestId("total-amount-of-credit")).toHaveTextContent(
      "£92,500"
    );
    expect(screen.getByTestId("number-of-monthly-payments")).toHaveTextContent(
      "24"
    );
    expect(screen.getByTestId("monthly-payment")).toHaveTextContent(
      "£3,854.17"
    );
  });

  it("handles non-number entry into the inputs", async () => {
    render(_render());

    const depositInput = screen.getByLabelText("Deposit (pounds)");
    await userEvent.clear(depositInput);
    await userEvent.type(depositInput, "25l");
    expect(depositInput).toHaveValue("25");

    const termInput = screen.getByLabelText("Term (months)");
    await userEvent.clear(termInput);
    await userEvent.type(termInput, "p48");
    expect(depositInput).toHaveValue("25");
  });
});
