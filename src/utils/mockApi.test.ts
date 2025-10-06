import { describe, expect, it, vi } from "vitest";
import { mockApi } from "./mockApi.ts";

describe("mockApi", () => {
  it("resolves with correct data", async () => {
    vi.useFakeTimers();

    const data = ["one", "two", "three"];
    const promise = mockApi(data);

    vi.runAllTimers();
    await expect(promise).resolves.toEqual(data);
    vi.useRealTimers();
  });
});
