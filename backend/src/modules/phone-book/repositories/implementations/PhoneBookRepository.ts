import { PhoneBookEntry } from "../../model/PhoneBookEntry";
import {
  ICreatePhoneBookEntryDTO,
  IPhoneBookRepository,
  IUpdatePhoneBookEntryDTO,
} from "../IPhoneBookRepository";

class PhoneBookRepository implements IPhoneBookRepository {
  private phoneBooks: PhoneBookEntry[] = [];
  private static INSTANCE: PhoneBookRepository;

  private constructor() {
    this.phoneBooks = [];
  }

  public static getInstance(): PhoneBookRepository {
    if (!PhoneBookRepository.INSTANCE) {
      PhoneBookRepository.INSTANCE = new PhoneBookRepository();
    }

    return PhoneBookRepository.INSTANCE;
  }

  create({
    firstName,
    lastName,
    phone,
  }: ICreatePhoneBookEntryDTO): PhoneBookEntry {
    const phoneBook = new PhoneBookEntry({ firstName, lastName, phone });

    this.phoneBooks.push(phoneBook);

    return phoneBook;
  }

  delete(id: string): void {
    const filteredPhoneBooks = this.phoneBooks.filter(
      (phoneBook) => phoneBook.id !== id
    );

    this.phoneBooks = filteredPhoneBooks;
  }

  findById(id: string): PhoneBookEntry | undefined {
    return this.phoneBooks.find((phoneBook) => phoneBook.id === id);
  }

  findByLastName(lastName: string): PhoneBookEntry | undefined {
    return this.phoneBooks.find((phoneBook) => phoneBook.lastName === lastName);
  }

  findByPhone(phone: string): PhoneBookEntry | undefined {
    return this.phoneBooks.find((phoneBook) => phoneBook.phone === phone);
  }

  list(): PhoneBookEntry[] {
    return this.phoneBooks;
  }

  update(id: string, phoneBook: IUpdatePhoneBookEntryDTO): PhoneBookEntry {
    const phoneBookIndex = this.phoneBooks.findIndex((pb) => pb.id === id);

    this.phoneBooks[phoneBookIndex] = phoneBook;

    return this.phoneBooks[phoneBookIndex];
  }
}

export { PhoneBookRepository };
