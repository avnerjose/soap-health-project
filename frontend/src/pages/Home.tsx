import { CreateContactDialog } from "@/components/CreateContactDialog";
import { PhoneBookItem } from "@/components/PhoneBookItem";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { PhoneBookEntry } from "@/entities/PhoneBookEntry";
import { api } from "@/services/api";
import { BookUser, Search } from "lucide-react";
import { useEffect, useState } from "react";

export function HomePage() {
  const [phoneBookEntries, setPhoneBookEntries] = useState<PhoneBookEntry[]>(
    []
  );
  const [searchLastName, setSearchSearchLastName] = useState("");

  const filteredPhoneBookEntries = phoneBookEntries.filter((phoneBookEntry) =>
    phoneBookEntry.lastName.toLowerCase().includes(searchLastName.toLowerCase())
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
      <header className="flex items-center gap-3 w-full justify-center mb-10 mt-4">
        <BookUser size={32} />
        <h1 className="text-4xl font-bold text-dark-700">Phone Book App</h1>
      </header>
      <main className="max-w-6xl mx-auto">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-dark-700 text-4xl font-semibold">Contacts</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white text-lg p-6">
                  + Add Contact
                </Button>
              </DialogTrigger>
              <CreateContactDialog onSubmit={fetchPhoneBook} />
            </Dialog>
          </div>
          <div className="flex gap-1 items-center w-full mt-6 border-2 rounded-md focus-within:outline focus-within:outline-1 border-gray-500 px-2 bg-white">
            <Search />
            <input
              className="w-full py-2 outline-none"
              placeholder="Search for contact by last name..."
              value={searchLastName}
              onChange={(e) => setSearchSearchLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8">
          {filteredPhoneBookEntries.map((entry) => (
            <PhoneBookItem
              key={entry.id}
              phoneBookItem={entry}
              onSubmit={fetchPhoneBook}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
