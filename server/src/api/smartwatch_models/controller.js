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
      console.log("id", id);
      const model = await smartWatchModelsService.getModelById(id);
      console.log("model", model);
      res.send(model);
    } catch (error) {
      next(error);
    }
  },
};
