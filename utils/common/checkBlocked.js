const prisma = require("../../prismaClient");

async function isUserBlocked(UserAId, userBId) {
  const block = await prisma.block.findFirst({
    where: {
      OR: [
        { blockerId: parseInt(UserAId), blockedId: parseInt(userBId) },
        { blockerId: parseInt(userBId), blockedId: parseInt(UserAId) },
      ],
    },
  });

  return !!block;
}

module.exports = {
  isUserBlocked,
};
