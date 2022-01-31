const returnResponse = require("../utils/response/ResponseHandler");
const signIn = async (req, res, next) => {
  const data = {
    email: "test@email.com",
    password: "test",
    id: "5e9f8f9b8d8f8b1c8c8f9b8",
  };
  returnResponse(200, "Success", data, res);
};

module.exports = {
  signIn,
};
