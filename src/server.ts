// External libraries
import fastify from "fastify";
// Internal utilities
import { env } from "./env";
// Fastify plugins
import { transactionsRoutes } from "./routes/transactions";

const server = fastify();

// Fastify plugins
server.register(transactionsRoutes, {
  prefix: "transactions",
});

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running.");
  });
