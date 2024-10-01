const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  deleteUser,
  deleteUserForce,
  updateUser,
  createNewUser,
} = require("./controller");


const router = Router();

router.get("/", getAllUsers);

router.post("/", createNewUser);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.delete("/force/:id", deleteUserForce);

module.exports = router;
