import { PhoneBookRepository } from "../../repositories/implementations/PhoneBookRepository";
import { CreatePhoneBookEntryUseCase } from "./CreatePhoneBookEntry.usecase";

describe("CreatePhoneBookEntryUseCase", () => {
  let createPhoneBookEntryUseCase: CreatePhoneBookEntryUseCase;
  let phoneBookEntriesRepository: PhoneBookRepository;

  beforeAll(() => {
    phoneBookEntriesRepository = PhoneBookRepository.getInstance();
    createPhoneBookEntryUseCase = new CreatePhoneBookEntryUseCase(
      phoneBookEntriesRepository
    );
  });

  it("should be able to create new PhoneBookEntrys", () => {
    const phoneBookEntry = createPhoneBookEntryUseCase.execute({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    expect(phoneBookEntriesRepository.list()).toStrictEqual([phoneBookEntry]);
  });

  it("should not be able to create new PhoneBookEntry when phone is already taken", () => {
    expect(() => {
      createPhoneBookEntryUseCase.execute({
        firstName: "John",
        lastName: "Doe",
        phone: "123456789",
      });
    }).toThrow();
  });
});
