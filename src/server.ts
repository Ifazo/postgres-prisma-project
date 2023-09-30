import app from "./app";
import config from "./config";

async function main() {
  app.get("/", (_req, res) => {
    res.send("Hello Prisma World!");
  });

  const port = 5000;
  app.listen(port, () => console.log(`🚀 Server ready at Port: ${port} ⭐️`));
}

main();
