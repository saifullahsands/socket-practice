const { SocketAuth } = require("../middleware/auth.middleware");
const createGroup = require("./events/createGroup");
const groupMessage = require("./events/groupMessage");
const joinGroup = require("./events/joinGroup");

module.exports = function (io) {
  io.use(SocketAuth);
  io.on("connection", (socket) => {
    console.log(
      `authentication socket :: ${socket.userId} :: ${JSON.stringify(
        socket.user
      )}`
    );
    joinGroup(socket, io);
    createGroup(socket, io);
    groupMessage(socket, io);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
