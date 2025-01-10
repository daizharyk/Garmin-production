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
      console.log("name", name);

      const newModel = await smartWatchModelsService.addSmartwatchModel(name);
      res.send(newModel);
    } catch (error) {
      next(error);
    }
  },
  gethModelById: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("id", id);
      const model = await smartWatchModelsService.getModelById(id);
      console.log("model", model);
      res.send(model);
    } catch (error) {
      next(error);
    }
  },
  addModelEdition: async (req, res, next) => {
    console.log("edition name", req.body.name);

    try {
      const { modelId, name } = req.body;
      console.log("editionName", name);

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
      const { modelId, versionName } = req.body;
      const updatedModel = await smartWatchModelsService.addModelVersion(
        modelId,
        versionName
      );
      res.json(updatedModel);
    } catch (error) {
      next(error);
    }
  },
};
