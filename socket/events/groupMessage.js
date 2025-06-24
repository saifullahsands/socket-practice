const CHAT_SERVICE=require("../../services/chat.service")

module.exports = async function (socket, io) {
  socket.on("group-message", async ({ groupId,content }) => {
    try {
        const senderId=socket.userId
        const message=await CHAT_SERVICE.createGroupMessage({senderId, groupId, content})
        socket.to(groupId).emit("group-message",message)
        socket.emit("group-message",message)
    } catch (error) {
      console.log(`error in group message :: ${error.message}`);
    }
  });
};
