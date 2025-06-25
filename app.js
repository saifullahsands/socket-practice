const { Server } = require("socket.io");
const { createServer } = require("http");
const express = require("express");
const app = express();
const { PORT } = require("./config/env.config");
const rootRouter = require("./routes/rootRouter");

app.use(express.json());

// io.on("connection",(socket)=>{
//     console.log(`erorr in connection`)
// })

app.use("/api/v1", rootRouter);
const server = createServer(app);
const io = new Server(server);
require("./socket/index")(io);

module.exports=server


