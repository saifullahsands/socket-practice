const prisma = require("../prismaClient");

class CHAT_SERVICE {
  async createGroup({ creatorId, title, isPrivate, memberIds }) {
    return await prisma.group.create({
      data: {
        title: isPrivate ? "names1" : title,
        isPrivate,
        creator_id: parseInt(creatorId),
        users: {
          create: memberIds.map((uid) => ({
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

  async addUserToGroup(userId,groupId) {
      const existingMembership= await prisma.groupUser.findUnique({
        where:{
         group_id_user_id:{
          group_id:groupId,
          user_id:parseInt(userId)
         }

        }
      })

      if(existingMembership){
        return existingMembership
      }
      return await prisma.groupUser.create({
        data:{
          user_id:parseInt(userId),
          group_id:groupId
        }
      })
  }
}

module.exports = new CHAT_SERVICE();
