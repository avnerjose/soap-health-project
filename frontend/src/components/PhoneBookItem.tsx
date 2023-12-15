import { Pencil, Phone, Trash2 } from "lucide-react";
import { PhoneBookEntry } from "@/entities/PhoneBookEntry";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { EditContactDialog } from "./EditContactDialog";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";
import { DeleteContactDialog } from "./DeleteContactDialog";

interface PhoneBookItemProps {
  phoneBookItem: PhoneBookEntry;
  onSubmit: () => Promise<void>;
}
export function PhoneBookItem({
  phoneBookItem: { firstName, lastName, phone, id },
  onSubmit,
}: PhoneBookItemProps) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="bg-white flex justify-between items-center py-6 px-4 first:rounded-t-md border-2 border-gray-500">
      <div>
        <h4 className="text-dark-700 text-3xl font-semibold">{fullName}</h4>
        <span className="flex gap-1 items-center text-xl font-bold text-gray-500">
          <Phone size={18} />
          {phone}
        </span>
      </div>
      <div className="flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 p-3 w-12 h-12">
              <Pencil className="text-white" />
            </Button>
          </DialogTrigger>
          <EditContactDialog
            contactToEdit={{ firstName, lastName, phone, id }}
            onSubmit={onSubmit}
          />
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500 p-3 w-12 h-12">
              <Trash2 className="text-white" />
            </Button>
          </AlertDialogTrigger>
          <DeleteContactDialog id={id} onSubmit={onSubmit} />
        </AlertDialog>
      </div>
    </div>
  );
}
