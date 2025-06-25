const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const { unAuthorizedError, ForbiddenError } = require("../utils");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.config");
const prisma = require("../prismaClient");

const SocketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.headers?.token;
    if (!token || !token.startsWith("Bearer ")) {
      return next(new Error("Token not found or malformed"));
    }

    const jwtToken = token.split(" ")[1];
    const decoded = JWT.verify(jwtToken, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: parseInt(decoded.id) },
    });

    if (!user) return next(new Error("Unauthorized user"));

    delete user.password;
    socket.user = user; // for full info
    socket.userId = user.id; // for quick access
    

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new Error("Token expired"));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new Error("Invalid token"));
    } else {
      console.log(`error in authenticated middleware :: ${error.message}`);
      return unAuthorizedError(res, "AUthentication failed");
    }
  }
};

const verifyRole = (Role) => {
  return (req, res, next) => {
    if (req.user.role !== Role) {
      return ForbiddenError(res, "User doesn't have permission");
    }
    next();
  };
};

module.exports = {
  SocketAuth,
  verifyRole,
};
