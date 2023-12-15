import { PhoneBook } from "../model/PhoneBook";

interface ICreatePhoneBookDTO {
    firstName: string;
    lastName: string;
    phone : string;
}

interface IUpdatePhoneBookDTO extends ICreatePhoneBookDTO {}

interface IPhoneBooksRepository {
  create({ firstName, lastName, phone }: ICreatePhoneBookDTO): PhoneBook;
  findById(id: string): PhoneBook | undefined;
  findByLastName(lastName: string): PhoneBook | undefined;
  list(): PhoneBook[];
  update(id: string, phoneBook: IUpdatePhoneBookDTO): PhoneBook;
  delete(id: string): void;
}

export { IPhoneBooksRepository, ICreatePhoneBookDTO, IUpdatePhoneBookDTO };