import app from "./app";
import config from "./config";

async function main() {
  app.get("/", (_req, res) => {
    res.send("Welcome to express prisma server!");
  });

  app.get("/api", (_req, res) => {
    res.send("Server api running successfully!");
  });

  const port = config.port;
  app.listen(port, () => console.log(`🚀 Server ready at Port: ${port} ⭐️`));
}

main();
