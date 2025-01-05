const { Router } = require("express");

const { getSmartwatchModels } = require("./controller");
const router = Router();

router.get("/models", getSmartwatchModels);

module.exports = router;
