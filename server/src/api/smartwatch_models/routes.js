const { Router } = require("express");

const {
  getSmartwatchModels,
  addSmartwatchModel,
  gethModelById,
  addModelEdition,
  addModelVersion,
  getEditionsByModelId,
} = require("./controller");
const router = Router();

router.get("/models/:id", gethModelById);
router.get("/models", getSmartwatchModels);
router.post("/models", addSmartwatchModel);
router.post("/models/edition", addModelEdition);
router.get("/models/edition/:id", getEditionsByModelId);
router.post("/models/version", addModelVersion);

module.exports = router;
