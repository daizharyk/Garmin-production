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

router.post(
  "/",
  protected,
  upload.fields([
    { name: "carouselImages", maxCount: 20 }, // Поле для карусели
    { name: "mainBanner" },
    { name: "adaptiveBanner" }, // Поле для баннера
    { name: "videoThumbnail" }, // Поле для баннера
    { name: "mainAdditionImg" }, // Поле для баннера
    { name: "adaptiveAdditionImg" }, // Поле для баннера
  ]),
  createNewItem
);

router.get("/:id", getItem);

router.put("/:id", protected, updateItem);

router.patch("/:id", protected, deleteItem);

router.delete("/force/:id", protected, deleteItemForce);

module.exports = router;
