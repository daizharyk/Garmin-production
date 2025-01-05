const { Smartwatch_models } = require("../database/models/");

module.exports = {
  getSmartwatchModelsFromRepo: async () => {
    const models = await Smartwatch_models.find({})
    return models;
  },
};
