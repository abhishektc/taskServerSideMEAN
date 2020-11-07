const router = require("express").Router();

const {
  userRegister,
  userLogin,
} = require("../utilFunctions/UserAuth");

router.post("/register", async (req, res) => {
  await userRegister(req.body, req.body.role, res);
});

router.post("/login", async (req, res) => {
  await userLogin(req.body, req.body.role, res);
});

module.exports = router;
