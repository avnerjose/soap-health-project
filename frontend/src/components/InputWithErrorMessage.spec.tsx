import { vi } from "vitest";
import { InputWithErrorMessage } from "./InputWithErrorMessage";
import { useForm } from "react-hook-form";
import { render, screen } from "@testing-library/react";

vi.mock("react-hook-form", () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
  })),
}));

describe("InputWithErrorMessage", () => {
  it("should render correctly", () => {
    const form = useForm();

    render(
      <InputWithErrorMessage
        label="Name"
        name="name"
        register={form.register}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("should render error message", () => {
    const form = useForm();

    render(
      <InputWithErrorMessage
        label="Name"
        name="name"
        error="Name is required"
        register={form.register}
      />
    );

    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });
});
