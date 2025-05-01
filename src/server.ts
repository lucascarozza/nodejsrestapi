import fastify from "fastify";
// import { randomUUID } from "node:crypto";
import { knex } from "./database";
import { env } from "./env";

const server = fastify();

server.get("/transaction", async () => {
  // const transaction = await knex("transactions")
  //   .insert({
  //     id: randomUUID(),
  //     title: "Transação teste",
  //     amount: 1000,
  //   })
  //   .returning("*");

  const transaction = await knex("transactions").select("*");

  // const transaction = await knex("transactions")
  //   .where("amount", 1000)
  //   .select("*");

  return transaction;
});

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running.");
  });
