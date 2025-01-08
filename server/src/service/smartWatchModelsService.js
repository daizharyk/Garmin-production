const NotImplementedError = require("../infrastructure/errors/NotImplementedError");
const smartWatchRepository = require("../repository/smartWatchRepository");

module.exports = {
  getSmartwatchModels: async () => {
    try {
      const models = await smartWatchRepository.getSmartwatchModelsFromRepo();
      if (!models || models.length === 0) {
        throw new NotImplementedError("Models not found");
      }
      return models;
    } catch (error) {
      console.error("Ошибка при получении моделей в сервисе:", error);
      throw error;
    }
  },
  addSmartwatchModel: async (modelName) => {
    try {
      const newModel =
        await smartWatchRepository.addSmartwatchModelToRepo(modelName);
      return newModel;
    } catch (error) {
      console.error("Ошибка при добавлении новой модели в сервисе:", error);
      throw error;
    }
  },
  getModelById: async (id) => {
    try {
      const model = await smartWatchRepository.getModelById(id);
      return model;
    } catch (error) {
      console.error("Model not found");
      throw error;
    }
  },
};
