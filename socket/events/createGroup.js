const CHAT_SERVICE = require("../../services/chat.service");

module.exports = function (socket, io) {
  socket.on("creating-group", async ({ title, isPrivate, memberIds }) => {
    try {
      const creatorId = socket.user.id;
      const group = await CHAT_SERVICE.createGroup({
        creatorId,
        title,
        isPrivate,
        memberIds,
      });
      io.to(socket.id).emit('group-created', group);

    console.log(`📦 Group created: ${group.id}`);
    } catch (error) {
      console.log(`error in  creating-gorups :: ${error.message}`);
    }
  });
};
