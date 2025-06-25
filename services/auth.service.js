const prisma=require("../prismaClient")

class AUTH_SERVICE{
    async findUserByEmail(email){
      return await prisma.user.findUnique({
        where:{
            email
        }
       })
    }

    async createUser(fullName,username,email,hashingpassword){
       return  await prisma.user.create({
            data:{
                fullName,
                username,
                email,
                password:hashingpassword,
            }
        })
    }

    
}

module.exports=new AUTH_SERVICE