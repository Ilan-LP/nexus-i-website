import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useApiForm } from "./useApiForm";

describe("useApiForm", () => {
  it("sets success status and resets values on successful submission", async () => {
    const submitter = vi.fn().mockResolvedValue({ success: true });

    const { result } = renderHook(() =>
      useApiForm(
        {
          name: "",
          email: "",
        },
        submitter
      )
    );

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Ilan" },
      });
      result.current.handleChange({
        target: { name: "email", value: "ilan@example.com" },
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(submitter).toHaveBeenCalledWith({ name: "Ilan", email: "ilan@example.com" });
    expect(result.current.status).toBe("success");
    expect(result.current.errorMessage).toBe("");
    expect(result.current.values).toEqual({ name: "", email: "" });
  });
});
