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
    const newEdition = { name: editionName };
   

    model.editions.push(newEdition);
    await model.save();
    const lastEdition = model.editions[model.editions.length - 1];
  
    return lastEdition;
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
