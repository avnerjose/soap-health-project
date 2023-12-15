import { ReactNode } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { EditContactDialog } from "./EditContactDialog";
import { api } from "@/services/api";

vi.mock("../services/api");

describe("EditContactDialog", () => {
  const wrapper = (children: ReactNode) => {
    return (
      <Dialog>
        {children}
        <DialogTrigger>Trigger</DialogTrigger>
      </Dialog>
    );
  };

  it("should render correctly", async () => {
    render(
      wrapper(
        <EditContactDialog
          contactToEdit={{
            id: "123",
            firstName: "John",
            lastName: "Doe",
            phone: "123456789",
          }}
          onSubmit={vi.fn()}
        />
      )
    );

    fireEvent.click(screen.getByText("Trigger"));

    expect(await screen.getAllByText("Edit contact")).toHaveLength(2);
    expect(
      screen.getByText("Edit the fields you want to Edit")
    ).toBeInTheDocument();
  });

  it("should be able to submit the form", async () => {
    const mockPut = vi.fn();
    const onSubmit = vi.fn();

    vi.spyOn(api, "put").mockImplementation(mockPut);

    render(
      wrapper(
        <EditContactDialog
          contactToEdit={{
            id: "123",
            firstName: "John",
            lastName: "Doe",
            phone: "123456789",
          }}
          onSubmit={onSubmit}
        />
      )
    );

    fireEvent.click(screen.getByText("Trigger"));

    fireEvent.input(screen.getByTestId("firstName"), {
      target: { value: "John" },
    });

    fireEvent.input(screen.getByTestId("lastName"), {
      target: { value: "Doe" },
    });

    fireEvent.input(screen.getByTestId("phone"), {
      target: { value: "123456789" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit contact",
      })
    );

    await waitFor(() => {
      return expect(mockPut).toHaveBeenCalledWith("/phone-book/123", {
        firstName: "John",
        lastName: "Doe",
        phone: "123456789",
      });
    });

    await waitFor(() => {
      return expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("should display required error when fields are empty", async () => {
    const onSubmit = vi.fn();
    render(
      wrapper(
        <EditContactDialog
          contactToEdit={{
            id: "123",
            firstName: "John",
            lastName: "Doe",
            phone: "123456789",
          }}
          onSubmit={onSubmit}
        />
      )
    );

    fireEvent.click(screen.getByText("Trigger"));

    fireEvent.input(screen.getByTestId("firstName"), {
      target: { value: "" },
    });

    fireEvent.input(screen.getByTestId("lastName"), {
      target: { value: "" },
    });

    fireEvent.input(screen.getByTestId("phone"), {
      target: { value: "" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit contact",
      })
    );

    await waitFor(() => {
      return expect(onSubmit).not.toHaveBeenCalled();
    });

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
  });
});
