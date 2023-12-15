import { PhoneBook } from "../../model/PhoneBook";
import {
  ICreatePhoneBookDTO,
  IPhoneBooksRepository,
  IUpdatePhoneBookDTO,
} from "../IPhoneBookRepository";

class PhoneBookRepository implements IPhoneBooksRepository {
  private phoneBooks: PhoneBook[] = [];
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

  create({ firstName, lastName, phone }: ICreatePhoneBookDTO): PhoneBook {
    const phoneBook = new PhoneBook({ firstName, lastName, phone });

    this.phoneBooks.push(phoneBook);

    return phoneBook;
  }

  delete(id: string): void {
    const filteredPhoneBooks = this.phoneBooks.filter(
      (phoneBook) => phoneBook.id !== id
    );

    this.phoneBooks = filteredPhoneBooks;
  }

  findById(id: string): PhoneBook | undefined {
    return this.phoneBooks.find((phoneBook) => phoneBook.id === id);
  }

  findByLastName(lastName: string): PhoneBook | undefined {
    return this.phoneBooks.find((phoneBook) => phoneBook.lastName === lastName);
  }

  list(): PhoneBook[] {
    return this.phoneBooks;
  }

  update(id: string, phoneBook: IUpdatePhoneBookDTO): PhoneBook {
    const phoneBookIndex = this.phoneBooks.findIndex(
      (pb) => pb.id === id
    );

    this.phoneBooks[phoneBookIndex] = phoneBook;

    return this.phoneBooks[phoneBookIndex];
  }
}
