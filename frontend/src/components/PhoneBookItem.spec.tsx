import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PhoneBookItem } from "./PhoneBookItem";

describe("PhoneBookItem", () => {
  it("should render correctly", () => {
    render(
      <PhoneBookItem
        phoneBookItem={{
          id: "123",
          firstName: "John",
          lastName: "Doe",
          phone: "123456789",
        }}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
  });
});
