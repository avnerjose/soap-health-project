import { PhoneBookEntry } from "../model/PhoneBookEntry";

interface ICreatePhoneBookEntryDTO {
  firstName: string;
  lastName: string;
  phone: string;
}

interface IUpdatePhoneBookEntryDTO extends ICreatePhoneBookEntryDTO {}

interface IPhoneBookRepository {
  create({ firstName, lastName, phone }: ICreatePhoneBookEntryDTO): PhoneBookEntry;
  findById(id: string): PhoneBookEntry | undefined;
  findByLastName(lastName: string): PhoneBookEntry | undefined;
  findByPhone(phone: string): PhoneBookEntry | undefined;
  list(): PhoneBookEntry[];
  update(id: string, phoneBookEntry: IUpdatePhoneBookEntryDTO): PhoneBookEntry;
  delete(id: string): void;
}

export { IPhoneBookRepository, ICreatePhoneBookEntryDTO, IUpdatePhoneBookEntryDTO };
