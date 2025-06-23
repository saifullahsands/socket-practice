module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`new client  connected handshake complete`);
    console.log("socket  Id ", socket.id);
  });
};
