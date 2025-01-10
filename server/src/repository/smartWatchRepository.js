const { Smartwatch_models } = require("../database/models/");

module.exports = {
  getSmartwatchModelsFromRepo: async () => {
    return await Smartwatch_models.find({});
  },
  addSmartwatchModelToRepo: async (modelName) => {
    const newModel = new Smartwatch_models({ name: modelName });
    return await newModel.save();
  },
  addModelEdition: async (modelId, editionName) => {
    const model = await Smartwatch_models.findById(modelId);

    model.editions.push({ name: editionName });
    return await model.save();
  },
  addModelVersionToRepo: async (modelId, versionName) => {
    const model = await Smartwatch_models.findById(modelId);

    model.versions.push({ name: versionName });
    return await model.save();
  },
  getModelById: async (id) => {
    return Smartwatch_models.findById(id);
  },
};
