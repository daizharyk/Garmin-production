const { Router } = require("express");

const {
  getSmartwatchModels,
  addSmartwatchModel,
  gethModelById,
  addModelEdition,
  addModelVersion,
} = require("./controller");
const router = Router();

router.get("/models/:id", gethModelById);
router.get("/models", getSmartwatchModels);
router.post("/models", addSmartwatchModel);
router.post("/models/edition", addModelEdition);
router.post("/models/version", addModelVersion);

module.exports = router;
