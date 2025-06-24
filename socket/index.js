const { SocketAuth } = require("../middleware/auth.middleware");
const createGroup = require("./events/createGroup");
const groupMessage = require("./events/groupMessage");

module.exports = function (io) {
  io.use(SocketAuth);
  io.on("connection", (socket) => {
    console.log(`authentication socket :: ${socket.userId} :: ${socket.user}`);

    createGroup(socket, io);
    groupMessage(socket, io);
  });
};
