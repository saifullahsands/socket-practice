const { errorHandler } = require("../utils");

const globalMiddleware = async (err, req, res, next) => {
  const message = err.message || "Something went wrong";
  const status = err.status || 500;
  return errorHandler(res, status, message);
};

module.exports = globalMiddleware;
