const apiResponse = require("../helpers/apiResponse")

const signIn = async (req, res, next) => {
  const data = {
    email: "test@email.com",
    password: "test",
    id: "5e9f8f9b8d8f8b1c8c8f9b8",
  };
  return apiResponse.succesResponseWithData(res, "Login Successful", data);
};


module.exports = {
  signIn
}