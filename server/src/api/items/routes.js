const { Router } = require("express");
const { getAllItems, creatNewItem, getItem } = require("./controller");
const { updateItem } = require("../../repository/itemsRepository");
const { deleteItem, deleteItemForce } = require("../../service/itemService");

const router = Router();

router.get("/", getAllItems);

router.post("/", creatNewItem);

router.get("/:id", getItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

router.delete("/force/:id", deleteItemForce);
module.exports = router;
