import app from "./app";
import dotenv from "dotenv";

dotenv.config()

const port = 5000

async function main() {
  app.get("/", (_req, res) => {
    res.send("Welcome to express prisma server!");
  });

  app.get("/api", (_req, res) => {
    res.send("Server api is running successfully!");
  });

  app.listen(port, () => console.log(`🚀 Server ready at Port: ${port} ⭐️`));
}

main();
