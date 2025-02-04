const { Router } = require("express");

const router = Router();

router.use("/users", require("./user/routes"));
router.use("/items", require("./items/routes"));
router.use("/smartwatch_models", require("./smartwatch_models/routes"));
router.use("/cart", require("./cart/routes"));

module.exports = router;
