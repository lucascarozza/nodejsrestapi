// External libraries
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";
// Internal utilities
import { app } from "../src/app";

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npx knex migrate:rollback --all");
    execSync("npx knex migrate:latest");
  });

  it("should create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 750,
        type: "credit",
      })
      .expect(201);
  });

  it("should list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 750,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    if (!cookies) return null;

    const transactionsListResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    expect(transactionsListResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: "New transaction",
        amount: 750,
      }),
    ]);
  });

  it("should retrieve a transaction by its ID", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 750,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    if (!cookies) return null;

    const transactionsListResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionId = transactionsListResponse.body.transactions[0].id;

    const retrieveTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(retrieveTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: "New transaction",
        amount: 750,
      })
    );
  });
});

it("should summarize all transactions", async () => {
  const createTransactionResponse = await request(app.server)
    .post("/transactions")
    .send({
      title: "New transaction",
      amount: 750,
      type: "credit",
    });

  const cookies = createTransactionResponse.get("Set-Cookie");

  if (!cookies) return null;

  await request(app.server).post("/transactions").set("Cookie", cookies).send({
    title: "New transaction 2",
    amount: 250,
    type: "debit",
  });

  const summarizedResponse = await request(app.server)
    .get("/transactions/summary")
    .set("Cookie", cookies)
    .expect(200);

  expect(summarizedResponse.body.summarize).toEqual({
    amount: 500,
  });
});
