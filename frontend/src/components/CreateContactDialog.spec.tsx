import { ReactNode } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { CreateContactDialog } from "./CreateContactDialog";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../services/api");

describe("CreateContactDialog", () => {
  const wrapper = (children: ReactNode) => {
    return (
      <Dialog>
        {children}
        <DialogTrigger>Trigger</DialogTrigger>
      </Dialog>
    );
  };

  it("should render correctly", () => {
    render(wrapper(<CreateContactDialog onSubmit={vi.fn()} />));

    fireEvent.click(screen.getByText("Trigger"));

    expect(screen.getByText("Add new contact")).toBeInTheDocument();
    expect(
      screen.getByText("Fill out the following fields to add a new contact")
    ).toBeInTheDocument();
  });

  it("should be able to submit the form", async () => {
    const onSubmit = vi.fn();
    render(wrapper(<CreateContactDialog onSubmit={onSubmit} />));

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

    fireEvent.click(screen.getByText("Create new contact"));

    await waitFor(() => {
      return expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("should display required error when fields are empty", async () => {
    const onSubmit = vi.fn();
    render(wrapper(<CreateContactDialog onSubmit={onSubmit} />));

    fireEvent.click(screen.getByText("Trigger"));

    fireEvent.click(screen.getByText("Create new contact"));

    await waitFor(() => {
      return expect(onSubmit).not.toHaveBeenCalled();
    });

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
  });
});
