import { v4 as uuid } from "uuid";
import { ICreatePhoneBookEntryDTO } from "../repositories/IPhoneBookRepository";

class PhoneBookEntry {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;

  constructor({ firstName, lastName, phone }: ICreatePhoneBookEntryDTO) {
    if (!this.id) {
      this.id = uuid();
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
}

export { PhoneBookEntry };
