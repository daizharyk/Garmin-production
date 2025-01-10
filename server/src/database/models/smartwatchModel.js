const mongoose = require("mongoose");

const EditionSchema = new mongoose.Schema({
  name: { type: String },
});

const VersionSchema = new mongoose.Schema({
  name: { type: String },
});

const SmartwatchModelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    editions: { type: [EditionSchema], default: [] },
    versions: { type: [VersionSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Smartwatch_models", SmartwatchModelSchema);
