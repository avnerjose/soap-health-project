import { api } from "@/services/api";
import {
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from "./ui/alert-dialog";

interface DeleteContactDialogProps {
  id: string;
  onSubmit: () => Promise<void>;
}

export function DeleteContactDialog({
  id,
  onSubmit,
}: DeleteContactDialogProps) {
  const handleDelete = async () => {
    try {
      await api.delete(`/phone-book/${id}`);
      await onSubmit();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertDialogContent className="bg-white">
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this contact?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the contact
          from your list.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="border border-blue-500 text-blue-500 bg-blue-50">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className="border border-red-500 text-red-500 bg-red-50"
        >
          DELETE
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}