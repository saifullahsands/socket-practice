const bcrypt = require("bcrypt");

async function hashingPassword(userPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(userPassword, salt);
}

async function comparePassword(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
}

module.exports = {
  hashingPassword,
  comparePassword,
};