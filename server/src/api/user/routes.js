const { Router } = require("express");
const { protected } = require("../../middlewares/auth");
const {
  getAllUsers,
  deleteUser,
  deleteUserForce,
  updateUser,
  registerUser,
  loginUser,
  getMe,
  updatePassword,
} = require("./controller");

const router = Router();

router.get("/", protected, getAllUsers);

router.get("/me", protected, getMe);

router.put("/", protected, updateUser);

router.put("/update-password", protected, updatePassword);

router.patch("/:id", protected, deleteUser);

router.delete("/force/:id", protected, deleteUserForce);

router.post("/", registerUser);

router.post("/login", loginUser);

module.exports = router;
