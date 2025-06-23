const {Server}=require("socket.io");
const {createServer }=require("http");
const express=require("express")
const app=express()
const {PORT}=require("./config/env.config")

const server=createServer(app)
const io=new Server(server)
app.use(express.json())


// io.on("connection",(socket)=>{
//     console.log(`erorr in connection`)
// })


require("./check")(io)

server.listen(PORT,()=>console.log(`server is running on PORT :: ${PORT}`))





module.exports=io

