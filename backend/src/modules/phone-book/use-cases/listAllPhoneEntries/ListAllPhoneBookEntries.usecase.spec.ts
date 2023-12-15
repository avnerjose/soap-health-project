import { PhoneBookRepository } from "../../repositories/implementations/PhoneBookRepository";
import { ListAllPhoneEntriesUseCase } from "./ListAllPhoneEntries.usecase";

describe("ListAllPhoneEntriesUseCase", () => {
  let listAllPhoneBookEntryUseCase: ListAllPhoneEntriesUseCase;
  let phoneBookEntriesRepository: PhoneBookRepository;

  beforeAll(() => {
    phoneBookEntriesRepository = PhoneBookRepository.getInstance();
    listAllPhoneBookEntryUseCase = new ListAllPhoneEntriesUseCase(
      phoneBookEntriesRepository
    );
  });

  it("should be able to list empty list", () => {
    expect(listAllPhoneBookEntryUseCase.execute()).toStrictEqual([]); // Compare this snippet from backend/src/modules/phone-book/use-cases/listAllPhoneEntries/ListAllPhoneBookEntries.usecase.spec.ts:listAllPhoneBookEntryUseCase.execute();
  });

  it("should be able to list all PhoneBookEntries", () => {
    phoneBookEntriesRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    expect(listAllPhoneBookEntryUseCase.execute()).toStrictEqual([
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        phone: "123456789",
      }),
    ]);
  });
});
