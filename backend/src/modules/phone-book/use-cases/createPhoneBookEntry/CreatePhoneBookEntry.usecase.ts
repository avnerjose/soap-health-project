import { IPhoneBookRepository } from "../../repositories/IPhoneBookRepository";

interface IRequest {
  firstName: string;
  lastName: string;
  phone: string;
}

class CreatePhoneBookEntryUseCase {
  constructor(private phoneBookRepository: IPhoneBookRepository) {}

  execute({ firstName, lastName, phone }: IRequest) {
    const phoneAlreadyExists = this.phoneBookRepository.findByPhone(phone);

    if (phoneAlreadyExists) {
      throw new Error("Phone already exists");
    }

    if (!firstName || !lastName || !phone) {
      throw new Error("Missing information");
    }

    const phoneBookEntry = this.phoneBookRepository.create({
      firstName,
      lastName,
      phone,
    });

    return phoneBookEntry;
  }
}

export { CreatePhoneBookEntryUseCase };
