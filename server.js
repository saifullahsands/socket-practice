const server = require("./app");
const { PORT } = require("./config/env.config");
const prisma = require("./prismaClient");
const { connectionDb } = require("./config/db.config");

(async function () {
  try {
    await connectionDb();
    server.listen(PORT, () =>
      console.log(`server is running on port : ${PORT}`)
    );
  } catch (error) {
    await prisma.$disconnect();
    console.log(`errror in server connected with  database`);
    process.exit(1);
  }
})();
