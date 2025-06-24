const prisma=require("../prismaClient")

class AUTH_SERVICE{
    async findUserByEmail(email){
        await prisma.user.findUnique({
            where:{
                email
            }
        })
    }

    async createUser({fullName,username,email,password}){
        await prisma.user.create({
            data:{
                fullName,
                username,
                email,
                password
            }
        })
    }

    
}

module.exports=new AUTH_SERVICE