const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const middlewares = require("../middlewares");

router.post("/user/signin", AuthController.signIn);

module.exports = router;
