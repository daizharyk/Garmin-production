const { pluginName } = require("mini-css-extract-plugin");
const smartWatchModelsService = require("../../service/smartWatchModelsService");
module.exports = {
  getSmartwatchModels: async (req, res, next) => {
    try {
      const smartwatchModels =
        await smartWatchModelsService.getSmartwatchModels();

      res.json(smartwatchModels);
    } catch (error) {
      next(error);
    }
  },

  addSmartwatchModel: async (req, res, next) => {
    try {
      const { name } = req.body;

      const newModel = await smartWatchModelsService.addSmartwatchModel(name);
      res.send(newModel);
    } catch (error) {
      next(error);
    }
  },
  gethModelById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const model = await smartWatchModelsService.getModelById(id);

      res.send(model);
    } catch (error) {
      next(error);
    }
  },
  addModelEdition: async (req, res, next) => {
    try {
      const { modelId, name } = req.body;
      const updatedModel = await smartWatchModelsService.addModelEdition(
        modelId,
        name
      );

      res.json(updatedModel);
    } catch (error) {
      next(error);
    }
  },
  addModelVersion: async (req, res, next) => {
    try {
      const { modelId, name } = req.body;
      const updatedModel = await smartWatchModelsService.addModelVersion(
        modelId,
        name
      );
      res.json(updatedModel);
    } catch (error) {
      next(error);
    }
  },
};
