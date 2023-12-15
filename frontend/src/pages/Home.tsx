import { Button } from "@/components/ui/button";
import { Pencil, Phone, Search, Trash2 } from "lucide-react";

export function HomePage() {
  return (
    <div className="bg-gray-400 min-h-screen p-4">
      <main className="max-w-6xl mx-auto">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-dark-700 text-4xl font-semibold">Contacts</h1>
            <Button className="bg-blue-500 text-white text-lg p-6">
              + Add Contact
            </Button>
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
          <div className="bg-white flex justify-between items-center py-6 px-4 first:rounded-t-md border-2 border-gray-500">
            <div>
              <h4 className="text-dark-700 text-3xl font-semibold">
                Eric Elliot
              </h4>
              <span className="flex gap-1 items-center text-xl font-bold text-gray-500">
                <Phone size={18} />
                222-555-6576
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
        </div>
      </main>
    </div>
  );
}
