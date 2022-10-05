const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/Auth.middleware");

router.post("/login",AuthMiddleware.isAuthorised, AuthController.signIn);

module.exports = router;
