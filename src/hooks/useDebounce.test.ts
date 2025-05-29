import { renderHook, act } from "@testing-library/react";
import { vi, it, afterEach, beforeEach, expect } from "vitest";
import { useDebounce } from "./useDebounce";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

it("затримує зміну значення на заданий інтервал", () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: "init", delay: 500 } }
  );

  expect(result.current).toBe("init");
  rerender({ value: "new", delay: 500 });
  expect(result.current).toBe("init");

  act(() => {
    vi.advanceTimersByTime(499);
  });
  expect(result.current).toBe("init");

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current).toBe("new");
});
