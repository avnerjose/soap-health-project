import { CreateContactDialog } from "@/components/CreateContactDialog";
import { PhoneBookItem } from "@/components/PhoneBookItem";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { PhoneBookEntry } from "@/entities/PhoneBookEntry";
import { api } from "@/services/api";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function HomePage() {
  const [phoneBookEntries, setPhoneBookEntries] = useState<PhoneBookEntry[]>(
    []
  );
  const fetchPhoneBook = async () => {
    const { data } = await api.get<PhoneBookEntry[]>("/phone-book");

    setPhoneBookEntries(data);
  };

  useEffect(() => {
    fetchPhoneBook();
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen p-4">
      <main className="max-w-6xl mx-auto">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-dark-700 text-4xl font-semibold">Contacts</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white text-lg p-6">
                  + Add Contact
                </Button>
              </DialogTrigger>
              <CreateContactDialog />
            </Dialog>
          </div>
          <div className="flex gap-1 items-center w-full mt-6 border-2 rounded-md focus-within:outline focus-within:outline-1 border-gray-500 px-2 bg-white">
            <Search />
            <input
              className="w-full py-2 outline-none"
              placeholder="Search for contact by last name..."
            />
          </div>
        </div>
        <div className="mt-8">
          {phoneBookEntries.map((entry) => (
            <PhoneBookItem phoneBookItem={entry} />
          ))}
        </div>
      </main>
    </div>
  );
}
