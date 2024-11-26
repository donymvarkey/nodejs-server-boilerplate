const jwt = require("jsonwebtoken");

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
    const verificationHeader = req.headers["authorization"];
    const accessToken = verificationHeader?.split(" ")[1];

    // Check if the Authorization header is missing or empty
    if (!verificationHeader) {
      return res.status(401).json({
        status: false,
        msg: "Unauthorized User",
      });
    }

    // Verify the JWT token
    jwt.verify(accessToken, process.env.ATK_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          msg: "Invalid or expired token",
        });
      }

      // Attach the decoded user information to the request object
      req.user = decoded;

      // Proceed to the next middleware
      next();
    });
  },

  isAdmin: function (req, res, next) {
    let verificationHeader = req.headers["x-auth-token"];

    try {
      let verify = jwt.verify(verificationHeader, process.env.ATK_SECRET);
      if (verify.role !== "admin") {
        return res.status(401).json({
          status: false,
          msg: "Access denied!",
        });
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
