const { Smartwatch_models } = require("../database/models/");

module.exports = {
  getSmartwatchModelsFromRepo: async () => {
    return await Smartwatch_models.find({});
  },
  addSmartwatchModelToRepo: async (modelName) => {
    const newModel = new Smartwatch_models({ name: modelName });
    return await newModel.save();
  },
  getModelById: async (id) => {
    return Smartwatch_models.findById(id);
  },
};
