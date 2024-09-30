const { Router } = require("express");
const { getAllItems, creatNewItem } = require("./controller");

const router = Router();

router.get("/", getAllItems);
router.post("/", creatNewItem);
module.exports = router;
