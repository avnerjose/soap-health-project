import { Pencil, Phone, Trash2 } from "lucide-react";
import { PhoneBookEntry } from "@/entities/PhoneBookEntry";
import { Button } from "./ui/button";

interface PhoneBookItemProps {
  phoneBookItem: PhoneBookEntry;
}
export function PhoneBookItem({
  phoneBookItem: { fistName, lastName, phone },
}: PhoneBookItemProps) {
  const fullName = `${fistName} ${lastName}`;

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
        <Button className="bg-green-500 p-3 w-12 h-12">
          <Pencil className="text-white" />
        </Button>
        <Button className="bg-red-500 p-3 w-12 h-12">
          <Trash2 className="text-white" />
        </Button>
      </div>
    </div>
  );
}
