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
  addModelEdition: async (modelId, editionName) => {
    try {
      return await smartWatchRepository.addModelEdition(modelId, editionName);
    } catch (error) {
      console.error("Ошибка при добавлении издания в сервисе:", error);
      throw error;
    }
  },
  addModelVersion: async (modelId, versionName) => {
    try {
      return await smartWatchRepository.addModelVersionToRepo(
        modelId,
        versionName
      );
    } catch (error) {
      console.error("Ошибка при добавлении издания в сервисе:", error);
      throw error;
    }
  },
  getModelById: async (id) => {
    try {
      const model = await smartWatchRepository.getModelById(id);
      return model;
    } catch (error) {
      console.error("Model not found", error);
      throw error;
    }
  },
  getEditionsName: async (ModelId) => {
    try {
      const edition = await smartWatchRepository.getEditionsName(ModelId);
      return edition;
    } catch (error) {
      console.error("Editons not found", error);
      throw error;
    }
  },
};
