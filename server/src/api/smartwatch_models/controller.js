const smartWatchModelsService = require("../../service/smartWatchModelsService");
module.exports = {
  getSmartwatchModels: async (req, res, next) => {
    try {
      const smartwatchModels =
        await smartWatchModelsService.getSmartwatchModels();
      console.log(smartwatchModels);
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
};
