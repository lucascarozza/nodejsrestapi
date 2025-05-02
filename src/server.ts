// Internal utilities
import { app as server } from "./app";
import { env } from "./env";

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running.");
  });
