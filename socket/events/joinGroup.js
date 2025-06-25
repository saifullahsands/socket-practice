const CHAT_SERVICE = require("../../services/chat.service");

module.exports = async function (socket, io) {
  socket.on("join-group", async ({ groupId }) => {
    try {
      if (!groupId) {
        return socket.emit("error", { message: "Group ID is required" });
      }
      await CHAT_SERVICE.addUserToGroup(socket.userId, groupId);
      await socket.join(groupId);
      console.log("User's rooms:", socket.rooms);
      socket.to(groupId).emit("user-joined", {
        userId: socket.userId,
        groupId,
      });

      socket.emit("joined-group", {
        message: `You joined group: ${groupId}`,
        groupId,
      });
      console.log(`User ${socket.userId} joined group ${groupId}`);
    } catch (error) {
      console.log(`error in join group :: ${error.message}`);
      socket.emit("error", { message: "Failed to join group" });
    }
  });
};
