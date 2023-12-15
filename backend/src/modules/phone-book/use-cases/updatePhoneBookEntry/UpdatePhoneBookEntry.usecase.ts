import { IPhoneBookRepository } from "../../repositories/IPhoneBookRepository";

interface IRequest {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

class UpdatePhoneBookEntryUseCase {
  constructor(private phoneBookRepository: IPhoneBookRepository) {}

  execute({ id, firstName, lastName, phone }: IRequest) {
    const phoneAlreadyExists = this.phoneBookRepository.findById(id);

    if (!phoneAlreadyExists) {
      throw new Error("Phone not found");
    }

    if (!firstName || !lastName || !phone) {
      throw new Error("Missing information");
    }

    const phoneBookEntry = this.phoneBookRepository.update(id, {
      firstName,
      lastName,
      phone,
    });

    return phoneBookEntry;
  }
}

export { UpdatePhoneBookEntryUseCase };
