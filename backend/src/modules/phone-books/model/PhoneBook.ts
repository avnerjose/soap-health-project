import { v4 as uuid } from "uuid";

class PhoneBook {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;

  constructor(firstName: string, lastName: string, phone: string) {
    if (!this.id) {
      this.id = uuid();
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
}

export { PhoneBook };
