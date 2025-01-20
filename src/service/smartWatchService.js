import { getRequest, postRequest } from "./service";

const API_URL = "smartwatch_models";

export async function getSmartwatchModels() {
  const smartwatchModels = await getRequest(`${API_URL}/models`);
  return smartwatchModels;
}
export async function creatSmartwatchModel(modelName) {
  const smartwatchModels = await postRequest(`${API_URL}/models`, {
    name: modelName,
  });
  console.log("smartwatchModels", smartwatchModels);

  return smartwatchModels;
}

export async function getModelById(modelId) {
  try {
    const model = await getRequest(`${API_URL}/models/${modelId}`); // Предполагается эндпоинт API
    console.log("model", model);

    return model;
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    return null;
  }
}
export async function getEditionsByModelId(modelId) {
  try {
    const modelEditions = await getRequest(
      `${API_URL}/models/edition/${modelId}`
    );

    return modelEditions;
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    return null;
  }
}
export async function getVersionsByModelId(modelId) {
  try {
    const modelVersions = await getRequest(
      `${API_URL}/models/version/${modelId}`
    );
console.log("modelVersions",modelVersions);

    return modelVersions;
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    return null;
  }
}
