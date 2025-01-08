const { Router } = require("express");

const { getSmartwatchModels, addSmartwatchModel, gethModelById } = require("./controller");
const router = Router();

router.get("/models/:id", gethModelById);
router.get("/models", getSmartwatchModels);
router.post("/models", addSmartwatchModel);

module.exports = router;
