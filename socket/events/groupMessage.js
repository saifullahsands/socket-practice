const CHAT_SERVICE = require("../../services/chat.service");
const { isUserBlocked}=require("../../utils/common/checkBlocked")
module.exports = async function (socket, io) {
  socket.on("group-message", async ({ groupId, content }) => {
    try {
      const senderId = socket.userId;
      if (!socket.rooms.has(groupId)) {
        await socket.join(groupId);
        console.log(
          `Sender socket ${senderId} joined group room ${groupId} before sending message.`
        );
      }
      const message = await CHAT_SERVICE.createGroupMessage({
        senderId,
        groupId,
        content,
      });

      const otherMember=message.

      io.to(groupId).emit("group-message", message);
      // io.emit("group-message", message);
      // socket.to(groupId).emit("group-message", message);
      socket.emit("group-message",{name:"testing"});
    } catch (error) {
      console.log(`error in group message :: ${error.message}`);
    }
  });
};
