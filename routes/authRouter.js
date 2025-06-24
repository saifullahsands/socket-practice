const { register, login } = require("../controller/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
