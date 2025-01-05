const mongoose = require("mongoose");

const SmartwatchModelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    selected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Smartwatch_models", SmartwatchModelSchema);
