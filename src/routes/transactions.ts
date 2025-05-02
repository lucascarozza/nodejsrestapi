// External libraries
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
// Internal utilities
import { knex } from "../database";

export async function transactionsRoutes(server: FastifyInstance) {
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
