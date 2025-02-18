import app from "./app";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config()

const port = 3000

export const redis = createClient();

redis.on('error', err => console.log('Redis Client Error', err));

async function main() {
  await redis.connect();

  app.get("/", (_req, res) => {
    res.send("Welcome to Express Server!");
  });

  app.get("/api", (_req, res) => {
    res.send("Server API is running successfully!");
  });

  app.get("/redis", async (_req, res) => {
    await redis.set("key", "Hello from Redis");
    const value = await redis.get("key");
    res.json({
      message: "Redis test",
      value,
    });
  });

  app.listen(port, () => console.log(`🚀 Server ready at Port: ${port} ⭐️`));
}

main();
