const { Router } = require("express");
const multer = require("multer");
const {
  getAllItems,
  getItem,
  deleteItemForce,
  deleteItem,
  updateItem,
  createNewItem,
  getMyItems,
} = require("./controller");
const { protected } = require("../../middlewares/auth");
const router = Router();
const upload = multer();
router.get("/", getAllItems);

router.get("/my", protected, getMyItems);

router.post("/", protected, upload.any(), createNewItem);

router.get("/:id", getItem);

router.put("/:id", protected, upload.any(), (req, res, next) => {
  // Здесь вы можете добавить отладочный вывод
  console.log("req.files:", req.files);
  
  // Затем вызовите функцию контроллера
  updateItem(req, res, next);
});

router.patch("/:id", protected, deleteItem);

router.delete("/force/:id", protected, deleteItemForce);

module.exports = router;
