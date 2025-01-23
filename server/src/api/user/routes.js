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
  recoverPassword,
} = require("./controller");

const router = Router();

router.post("/", registerUser);

router.post("/login", loginUser);

router.post("/recover-password", recoverPassword);

router.get("/", protected, getAllUsers);

router.get("/me", protected, getMe);

router.put("/", protected, updateUser);

router.put("/update-password", protected, updatePassword);

router.patch("/:id", protected, deleteUser);

router.delete("/force/:id", protected, deleteUserForce);

module.exports = router;
