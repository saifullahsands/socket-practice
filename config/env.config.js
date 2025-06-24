const path=require("path");


require("dotenv").config({
    path:path.resolve(__dirname,"../.env")

})

module.exports={
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    TOKEN_EXPIRY:process.env.TOKEN_EXPIRY
}
