const { Router } = require("express");
const {  getAllUsers, creatNewUser } = require("./controller");

const router = Router();

router.get("/", getAllUsers);

router.post("/", creatNewUser);

module.exports = router;
