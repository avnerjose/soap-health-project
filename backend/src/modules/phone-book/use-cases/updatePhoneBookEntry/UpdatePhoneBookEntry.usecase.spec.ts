import { PhoneBookRepository } from "../../repositories/implementations/PhoneBookRepository";
import { UpdatePhoneBookEntryUseCase } from "./UpdatePhoneBookEntry.usecase";

describe("UpdatePhoneBookEntryUseCase", () => {
  let updatePhoneBookEntryUseCase: UpdatePhoneBookEntryUseCase;
  let phoneBookEntriesRepository: PhoneBookRepository;

  beforeAll(() => {
    phoneBookEntriesRepository = PhoneBookRepository.getInstance();
    updatePhoneBookEntryUseCase = new UpdatePhoneBookEntryUseCase(
      phoneBookEntriesRepository
    );
  });

  it("should be able to update PhoneBookEntry", () => {
    const phoneBookEntry = phoneBookEntriesRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    updatePhoneBookEntryUseCase.execute({
      id: phoneBookEntry.id as string,
      firstName: "Jane",
      lastName: "Doe",
      phone: "987654321",
    });

    expect(phoneBookEntriesRepository.list()).toStrictEqual([
      expect.objectContaining({
        firstName: "Jane",
        lastName: "Doe",
        phone: "987654321",
      }),
    ]);
  });

  it("should not be able to update PhoneBookEntry that doesn't exists", () => {
    expect(() => {
      updatePhoneBookEntryUseCase.execute({
        id: "invalid-id",
        firstName: "Jane",
        lastName: "Doe",
        phone: "987654321",
      });
    }).toThrow();
  });
});
