const prisma = require("../prismaClient");

async function connectionDb() {
  try {
    await prisma.$connect();
    console.log(`Database connected successfully !!`);
  } catch (error) {
    console.log(`error in connection Db :: ${error.message}`);
    await prisma.$disconnect();
    process.exit(1);
  }
}

module.exports = {
  connectionDb,
};
