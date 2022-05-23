const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const getPaginatedData = async (model, pageNo, size) => {
  const q = {};
  q.skip = size * (pageNo - 1);
  q.limit = size;
  const data = await model.find({}, {}, q);
  return data;
};

module.exports = {
  hashPassword,
  comparePassword,
  getPaginatedData,
};
