const JWT = require("jsonwebtoken");
const { JWT_SECRET, TOKEN_EXPIRY } = require("../../config/env.config");

async function generateToken(userId) {
  return await JWT.sign(
    {
      id: userId,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

module.exports = {
  generateToken,
};
