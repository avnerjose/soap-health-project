import { validate } from "uuid";
import { PhoneBookEntry } from "./PhoneBookEntry";

describe("PhoneBookEntry model", () => {
  it("should be ble to create a PhoneBookEntry", () => {
    const phoneBookEntry = new PhoneBookEntry({
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
});
