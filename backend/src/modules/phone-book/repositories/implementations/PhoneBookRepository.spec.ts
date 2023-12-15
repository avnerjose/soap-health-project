import { validate } from "uuid";
import { PhoneBookRepository } from "./PhoneBookRepository";
import { PhoneBookEntry } from "../../model/PhoneBookEntry";

describe("PhoneBookRepository", () => {
  let phoneBookRepository: PhoneBookRepository;

  beforeAll(() => {
    phoneBookRepository = PhoneBookRepository.getInstance();
  });

  it("should be able to create a new phone book entry", () => {
    const phoneBookEntry = phoneBookRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    expect(phoneBookEntry).toMatchObject({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    expect(validate(phoneBookEntry.id as string)).toBe(true);
  });

  it("should be able to list all phone book entries", () => {
    const phoneBookEntry = phoneBookRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    expect(phoneBookRepository.list()).toEqual(
      expect.arrayContaining([phoneBookEntry])
    );
  });

  it("should be able to delete a phone book entry", () => {
    const phoneBookEntry = phoneBookRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    phoneBookRepository.delete(phoneBookEntry.id as string);

    expect(phoneBookRepository.list()).not.toEqual(
      expect.arrayContaining([phoneBookEntry])
    );
  });

  it("should be able to update a phone book entry", () => {
    const phoneBookEntry = phoneBookRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
    });

    phoneBookRepository.update(phoneBookEntry.id as string, {
      firstName: "Jane",
      lastName: "Doe",
      phone: "987654321",
    });

    expect(phoneBookRepository.list()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: "Jane",
          lastName: "Doe",
          phone: "987654321",
        }),
      ])
    );
  });

  it("should be able to find a phone book entry by id", () => {
    const phoneBookEntry = phoneBookRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "11111111",
    });

    expect(phoneBookRepository.findById(phoneBookEntry.id as string)).toEqual(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        phone: "11111111",
      })
    );
  });

  it("should be able to find a phone book entry by phone", () => {
    const phoneBookEntry = phoneBookRepository.create({
      firstName: "John",
      lastName: "Doe",
      phone: "2222222",
    });

    expect(
      phoneBookRepository.findByPhone(phoneBookEntry.phone) as PhoneBookEntry
    ).toEqual(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        phone: "2222222",
      })
    );
  });

  it("should not be able to find a phone book entry by id", () => {
    expect(phoneBookRepository.findById("invalid-id")).toBeUndefined();
  });
});
