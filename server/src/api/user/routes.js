
const { Router } = require("express");
const {protected}  = require("../../middlewares/auth")
const {
  getAllUsers,
  deleteUser,
  deleteUserForce,
  updateUser,
  registerUser,
  loginUser,
  getMe,
} = require("./controller");

const router = Router();

router.get("/",protected, getAllUsers);

router.get("/me",protected, getMe);

router.put("/:id",protected, updateUser);

router.patch("/:id",protected, deleteUser);

router.delete("/force/:id",protected, deleteUserForce);

router.post("/", registerUser);

router.post("/login", loginUser);


module.exports = router;

