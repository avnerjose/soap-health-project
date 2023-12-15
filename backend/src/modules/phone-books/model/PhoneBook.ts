import { v4 as uuid } from "uuid";

class PhoneBook {
  id?: string;
  name: string;
  phone: string;

  constructor(name: string, phone: string) {
    if (!this.id) {
      this.id = uuid();
    }

    this.name = name;
    this.phone = phone;
  }
}

export { PhoneBook };
