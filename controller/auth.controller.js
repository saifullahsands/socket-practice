const AUTH_SERVICE = require("../services/auth.service");
const {
  BadRequestError,
  comparePassword,
  hashingPassword,
  okResponse,
  generateToken,
} = require("../utils");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await AUTH_SERVICE.findUserByEmail(email);
    if (!user) return BadRequestError(res, "Invalid credientials ");
    const matchedPassword = await comparePassword(password, user.password);
    if (!matchedPassword) return BadRequestError(res, "Invalid credientials");

    const token = await generateToken(user.id);

    okResponse(res, 200, " ", user, token);
  } catch (error) {
    console.log(`error in successfully !! ${error.message}`);
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, username } = req.body;
    const existingUser = await AUTH_SERVICE.findUserByEmail(email);
    if (existingUser)
      return BadRequestError(res, "this email is already in use");
    const passwordHash = await hashingPassword(password);
    const user = await AUTH_SERVICE.createUser({
      fullName,
      username,
      email,
      passwordHash,
    });
    okResponse(res, 201, "user created successfully !! ", user);
  } catch (error) {
    console.log(`error in register ${error.message}`);
    next(error);
  }
};

module.exports = {
  register,
  login,
};
