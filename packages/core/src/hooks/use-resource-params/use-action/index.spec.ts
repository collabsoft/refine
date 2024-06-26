import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useAction } from ".";

import { mockRouterProvider, mockLegacyRouterProvider } from "@test";

describe("useAction Hook", () => {
  it("returns action from props", () => {
    const { result } = renderHook(() => useAction("clone"), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          action: "edit",
        }),
      }),
    });

    expect(result.current).toBe("clone");
  });

  it("returns action from router", () => {
    const { result } = renderHook(() => useAction(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          action: "clone",
        }),
      }),
    });

    expect(result.current).toBe("clone");
  });

  it("returns action from legacy router", () => {
    const { result } = renderHook(() => useAction(), {
      wrapper: TestWrapper({
        legacyRouterProvider: {
          ...mockLegacyRouterProvider(),
          useParams: () =>
            ({
              resource: "posts",
              action: "edit",
              id: 123,
            }) as any,
        },
      }),
    });

    expect(result.current).toBe("edit");
  });

  it("returns action from props and ignores router", () => {
    const { result } = renderHook(() => useAction("list"), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          action: "create",
        }),
      }),
    });

    expect(result.current).toBe("list");
  });

  it("returns action from props and ignores legacy router", () => {
    const { result } = renderHook(() => useAction("list"), {
      wrapper: TestWrapper({
        legacyRouterProvider: {
          ...mockLegacyRouterProvider(),
          useParams: () =>
            ({
              resource: "posts",
              action: "edit",
              id: 456,
            }) as any,
        },
      }),
    });

    expect(result.current).toBe("list");
  });
});
