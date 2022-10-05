const jwt = require("jsonwebtoken");
const apiResponse = require("./helpers/apiResponse");

module.exports = {
  allowCrossDomain: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, x-auth-token, X-Requested-With, Content-Type"
    );

    // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
      //res.sendStatus(200);
      next();
    } else {
      next();
    }
  },

  isAuthorised: function (req, res, next) {
    var verificationHeader = req.headers["Authorization"];
    var verify;

    if (
      verificationHeader === undefined ||
      verificationHeader === null ||
      verificationHeader === ""
    ) {
      return apiResponse.unAuthorizedResponse(res, "Unauthorized user");
    }

    try {
      verify = jwt.verify(verificationHeader, process.env.SIGNATURE);
      req.user = verify;

      next();
    } catch (e) {
      next(e);
    }
  },

  isAdmin: function (req, res, next) {
    let verificationHeader = req.headers["x-auth-token"];

    try {
      let verify = jwt.verify(verificationHeader, process.env.SIGNATURE);
      if (verify.role !== "admin") {
        return apiResponse.unAuthorizedResponse(res, "Unauthorized role");
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
