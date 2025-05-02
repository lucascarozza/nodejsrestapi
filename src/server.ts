// External libraries
import fastify from "fastify";
import cookie from "@fastify/cookie";
// Internal utilities
import { env } from "./env";
// Fastify plugins
import { transactionsRoutes } from "./routes/transactions";

const server = fastify();

server.register(cookie);

// Application routes
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
