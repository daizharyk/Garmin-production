const NotImplementedError = require("../infrastructure/errors/NotImplementedError");
const itemRepository = require("../repository/itemRepository");
const axios = require("axios");
const FormData = require("form-data");

const uploadImageToImgbb = async (fileBuffer) => {
  try {
    const formData = new FormData();
    formData.append("image", fileBuffer.toString("base64"));
    console.log("Отправка изображения на imgbb...");
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );
    console.log("Ответ от imgbb:", response.data);
    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new NotImplementedError("Не удалось получить URL изображения");
    }
  } catch (error) {
    throw new NotImplementedError("Ошибка при загрузке изображения на imgbb");
  }
};

module.exports = {
  getAllItems: async () => {
    const items = await itemRepository.findAllItems();
    return items;
  },
  getMyItems: async (userId) => {
    const myItems = await itemRepository.findUsersItems(userId);
    return myItems;
  },
  createNewItem: async (itemData, fileBuffer) => {
    const imageUrl = await uploadImageToImgbb(fileBuffer);
    console.log("imageURL",imageUrl);
    
        const newItemData = { ...itemData, imageUrl };
        console.log("newItemData",newItemData);
    const newItem = await itemRepository.createItem(newItemData);
    console.log("newItem",newItem);
    if (!newItem) {
      throw new NotImplementedError("Ошибка при создании нового элемента");
    }
    return newItem;
  },

  findItem: async (itemId) => {
    const item = await itemRepository.findItem(itemId);
    return item;
  },
  updateItem: async (itemId, itemData, userId) => {
    const item = await itemRepository.findUsersItem(itemId, userId);
    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    const updatedItem = await itemRepository.updateItem(
      itemId,
      itemData,
      userId
    );
    return updatedItem;
  },
  deleteItem: async (itemId, userId) => {
    const item = await itemRepository.findUsersItem(itemId, userId);
    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    await itemRepository.deletItem(itemId);
  },
  deleteItemForce: async (itemId, userId) => {
    const item = await itemRepository.findUsersItem(itemId, userId);
    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    await itemRepository.deleteItemForce(itemId);
  },
};

