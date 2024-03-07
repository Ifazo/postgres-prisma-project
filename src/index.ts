import app from "./app";
import config from "./config";

async function main() {
  app.get("/", (_req, res) => {
    res.send("Hello from Prisma World!");
  });

  app.get("/api", (_req, res) => {
    res.send("Express server api running successfully!");
  });

  const port = config.port;
  app.listen(port, () => console.log(`🚀 Server ready at Port: ${port} ⭐️`));
}

main();
