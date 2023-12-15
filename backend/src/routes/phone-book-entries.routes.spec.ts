import supertest from "supertest";
import { app } from "..";

describe("[POST] /phone-book", () => {
  it("should be able to create a new phone book entry", async () => {
    const phoneBookBody = {
      firstName: "John",
      lastName: "Doe",
      phone: "333-333-3333",
    };

    const response = await supertest(app)
      .post("/phone-book")
      .send(phoneBookBody)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      ...phoneBookBody,
    });
  });

  it("should not able to create a new phone book entry with same phone", async () => {
    const phoneBookBody = {
      firstName: "John",
      lastName: "Doe",
      phone: "333-333-3333",
    };

    const response = await supertest(app)
      .post("/phone-book")
      .send(phoneBookBody)
      .expect(400);

    expect(response.body.message).toBe("Phone already exists");
  });

  describe("missing values", () => {
    it("should not be able to create a new phone book entry without a first name", async () => {
      const phoneBookBody = {
        lastName: "Doe",
        phone: "333-333-4444",
      };

      const response = await supertest(app)
        .post("/phone-book")
        .send(phoneBookBody)
        .expect(400);

      expect(response.body.message).toBe("Missing information");
    });

    it("should not be able to create a new phone book entry without a last name", async () => {
      const phoneBookBody = {
        firstName: "John",
        phone: "333-333-3444",
      };

      const response = await supertest(app)
        .post("/phone-book")
        .send(phoneBookBody)
        .expect(400);

      expect(response.body.message).toBe("Missing information");
    });

    it("should not be able to create a new phone book entry without a phone number", async () => {
      const phoneBookBody = {
        firstName: "John",
        lastName: "Doe",
      };

      const response = await supertest(app)
        .post("/phone-book")
        .send(phoneBookBody)
        .expect(400);

      expect(response.body.message).toBe("Missing information");
    });
  });
});

describe("[GET] /phone-book", () => {
  it("should be able to fetch list with entries", async () => {
    const phoneEntries = [
      {
        firstName: "John",
        lastName: "Doe",
        phone: "333-333-3333",
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        phone: "444-444-4444",
      },
    ];

    phoneEntries.forEach(async (phoneEntry) => {
      await supertest(app).post("/phone-book").send(phoneEntry);
    });

    const response = await supertest(app).get("/phone-book").expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining(
        phoneEntries.map((entry) => expect.objectContaining(entry))
      )
    );
  });
});

describe("[DELETE] /phone-book/:id", () => {
  it("should be able to delete a phone book entry", async () => {
    const response = await supertest(app).get("/phone-book").expect(200);
    const { id } = response.body[0];

    await supertest(app).delete(`/phone-book/${id}`).expect(202);

    const responseAfterDelete = await supertest(app).get("/phone-book");

    expect(responseAfterDelete.body).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id })])
    );
  });

  it("shouldn't be able to delete non existing phone book entry", () => {
    return supertest(app).delete("/phone-book/123").expect(400);
  });
});

describe("[PUT] /phone-book/:id", () => {
  it("should be able to update a phone book entry", async () => {
    const response = await supertest(app).get("/phone-book").expect(200);
    const initialPhoneBookEntry = response.body[0];

    const phoneBookBody = {
      firstName: "Josh",
      lastName: "Doe",
      phone: "333-333-3333",
    };

    await supertest(app)
      .put(`/phone-book/${initialPhoneBookEntry.id}`)
      .send(phoneBookBody)
      .expect(200);

    const responseAfterUpdate = await supertest(app).get("/phone-book");

    expect(responseAfterUpdate.body[0]).toMatchObject({
      ...initialPhoneBookEntry,
      ...phoneBookBody,
    });

    expect(responseAfterUpdate.body[0].id).toEqual(initialPhoneBookEntry.id);

    expect(responseAfterUpdate).not.toEqual(
      expect.arrayContaining([expect.objectContaining(initialPhoneBookEntry)])
    );
  });

  it("shouldn't be able to update non existing phone book entry", () => {
    return supertest(app)
      .put("/phone-book/123")
      .send({
        firstName: "Josh",
        lastName: "Doe",
        phone: "333-333-3333",
      })
      .expect(400);
  });
});
