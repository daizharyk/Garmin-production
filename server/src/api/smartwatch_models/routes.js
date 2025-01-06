const { Router } = require("express");

const { getSmartwatchModels, addSmartwatchModel } = require("./controller");
const router = Router();

router.get("/models", getSmartwatchModels);
router.post("/models", addSmartwatchModel);

module.exports = router;
