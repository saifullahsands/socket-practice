const rootRouter=require("express").Router()
const authRouter=require("./authRouter")


rootRouter.use("/auth",authRouter)
rootRouter.all("*",(req,res)=>{
    return res.status(400).json({message:"this route cannot be accessable"})
})


module.exports=rootRouter