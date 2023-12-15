import { ReactNode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { DeleteContactDialog } from "./DeleteContactDialog";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";
import { api } from "@/services/api";

vi.mock("../services/api");

describe("DeleteContactDialog", () => {
  const wrapper = (children: ReactNode) => {
    return (
      <AlertDialog>
        {children}
        <AlertDialogTrigger>Trigger</AlertDialogTrigger>
      </AlertDialog>
    );
  };

  it("should render correctly", () => {
    render(wrapper(<DeleteContactDialog id="123" onSubmit={vi.fn()} />));

    fireEvent.click(screen.getByText("Trigger"));

    expect(
      screen.getByText("Are you sure you want to delete this contact?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "This action cannot be undone. This will permanently delete the contact from your list."
      )
    ).toBeInTheDocument();
  });

  it("should be able to delete contact", async () => {
    const mockDelete = vi.fn();
    const onSubmit = vi.fn();

    vi.spyOn(api, "delete").mockImplementation(mockDelete);

    render(wrapper(<DeleteContactDialog id="123" onSubmit={onSubmit} />));

    fireEvent.click(screen.getByText("Trigger"));

    fireEvent.click(screen.getByTestId("delete"));

    await waitFor(() => {
      return expect(onSubmit).toHaveBeenCalled();
    });

    await waitFor(() => {
      return expect(mockDelete).toHaveBeenCalledWith("/phone-book/123");
    });
  });

  it("should not delete if cancel is clicked", async () => {
    const mockDelete = vi.fn();
    const onSubmit = vi.fn();

    vi.spyOn(api, "delete").mockImplementation(mockDelete);

    render(wrapper(<DeleteContactDialog id="123" onSubmit={onSubmit} />));

    fireEvent.click(screen.getByText("Trigger"));

    fireEvent.click(screen.getByTestId("cancel"));

    await waitFor(() => {
      return expect(onSubmit).not.toHaveBeenCalled();
    });

     await waitFor(() => {
       return expect(mockDelete).not.toHaveBeenCalled();
     });
  });
});
