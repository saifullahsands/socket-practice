const prisma = require("../prismaClient");

class CHAT_SERVICE {
  async createGroup({ creatorId, title, memberIds }) {
    let isPrivate = memberIds.length === 1;
    let finalTitle = title;
    if (isPrivate) {
      const otherUser = await prisma.user.findUnique({
        where: {
          id: memberIds[0],
        },
        select: {
          fullName: true,
        },
      });
      if (!otherUser) {
        throw new Error("user not found for private chat");
      }
      finalTitle = otherUser.fullName;
    }

    const fUllMember = [creatorId, ...memberIds];
    return await prisma.group.create({
      data: {
        title: finalTitle,
        isPrivate,
        creator_id: parseInt(creatorId),
        users: {
          create: fUllMember.map((uid) => ({
            user: { connect: { id: uid } },
          })),
        },
      },
    });
  }

  async createGroupMessage({ senderId, groupId, content }) {
    return await prisma.groupMessage.create({
      data: {
        sender_id: parseInt(senderId),
        group_id: groupId,
        content: content,
      },
      include: {
        Sender: {
          select: {
            fullName: true,
          },
        },
      },
    });
  }

  async addUserToGroup(userId, groupId) {
    const existingMembership = await prisma.groupUser.findUnique({
      where: {
        group_id_user_id: {
          group_id: groupId,
          user_id: parseInt(userId),
        },
      },
    });

    if (existingMembership) {
      return existingMembership;
    }
    return await prisma.groupUser.create({
      data: {
        user_id: parseInt(userId),
        group_id: groupId,
      },
    });
  }
}

module.exports = new CHAT_SERVICE();
