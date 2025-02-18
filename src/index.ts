import app from "./app";
import dotenv from "dotenv";

dotenv.config()

const port = 3000

async function main() {
  app.get("/", (_req, res) => {
    res.send("Welcome to Express Server!");
  });

  app.get("/api", (_req, res) => {
    res.send("Server API is running successfully!");
  });

  app.listen(port, () => console.log(`🚀 Server ready at Port: ${port} ⭐️`));
}

main();
