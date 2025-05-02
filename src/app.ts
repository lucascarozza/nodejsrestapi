// External libraries
import fastify from "fastify";
import cookie from "@fastify/cookie";
// Fastify plugins
import { transactionsRoutes } from "./routes/transactions";

export const app = fastify();

app.register(cookie);

// Application routes
app.register(transactionsRoutes, {
  prefix: "transactions",
});