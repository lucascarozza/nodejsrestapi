// External libraries
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
// Internal utilities
import { knex } from "../database";

export async function transactionsRoutes(server: FastifyInstance) {
  // List Transactions
  server.get("/", async () => {
    const transactions = await knex("transactions").select("*");
    return { transactions };
  });

  // Get Transaction Details
  server.get("/:id", async (request) => {
    // Zod Schema
    const getTransactionDetailsParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionDetailsParamsSchema.parse(request.params);

    const transaction = await knex("transactions").where("id", id).first();

    return { transaction };
  });

  // Summarize Transactions
  server.get("/summary", async () => {
    const summary = await knex("transactions")
      .sum("amount", {
        as: "amount",
      })
      .first();

    return { summary };
  });

  // Create Transaction
  server.post("/", async (request, reply) => {
    // Zod Schema
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send("Transaction created.");
  });
}
