import { v4 as uuid } from "uuid";
import { ICreatePhoneBookDTO } from "../repositories/IPhoneBookRepository";

class PhoneBook {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;

  constructor({ firstName, lastName, phone }: ICreatePhoneBookDTO) {
    if (!this.id) {
      this.id = uuid();
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
}

export { PhoneBook };
