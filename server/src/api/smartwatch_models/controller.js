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
};
