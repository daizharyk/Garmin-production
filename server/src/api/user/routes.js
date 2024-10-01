const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  deleteUser,
  deleteUserForce,
  updateUser,
  registerUser,
  loginUser,
} = require("./controller");

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.delete("/force/:id", deleteUserForce);

router.post("/", registerUser);

router.post("/login", loginUser)

module.exports = router;
