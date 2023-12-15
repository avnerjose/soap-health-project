import { PhoneBookRepository } from "../../repositories/implementations/PhoneBookRepository";
import { DeletePhoneBookEntryUseCase } from "./DeletePhoneBookEntry.usecase";

describe("DeletePhoneBookEntryUseCase", () => {
  let deletePhoneBookEntryUseCase: DeletePhoneBookEntryUseCase;
  let phoneBookEntriesRepository: PhoneBookRepository;

  beforeAll(() => {
    phoneBookEntriesRepository = PhoneBookRepository.getInstance();
    deletePhoneBookEntryUseCase = new DeletePhoneBookEntryUseCase(
      phoneBookEntriesRepository
    );
  });

  it("should be able to delete PhoneBookEntry", () => {
    const phoneBookEntry = phoneBookEntriesRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    deletePhoneBookEntryUseCase.execute(phoneBookEntry.id as string);

    expect(phoneBookEntriesRepository.list()).toStrictEqual([]);
  });

  it("should not be able to delete PhoneBookEntry that doesn't exists", () => {
    expect(() => {
      deletePhoneBookEntryUseCase.execute("invalid-id");
    }).toThrow();
  });
});
