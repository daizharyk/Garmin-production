const { Router } = require("express");
const { getAllItems, getItem, deleteItemForce, deleteItem, updateItem, createNewItem } = require("./controller");

const router = Router();

router.get("/", getAllItems);

router.post("/", createNewItem);

router.get("/:id", getItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

router.delete("/force/:id", deleteItemForce);


module.exports = router;
