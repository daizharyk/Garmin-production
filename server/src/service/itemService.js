const NotImplementedError = require("../infrastructure/errors/NotImplementedError");
const itemRepository = require("../repository/itemRepository");
const axios = require("axios");
const FormData = require("form-data");

const uploadImagesToImgbb = async (files) => {
  try {
    const uploadedUrls = [];
    for (const file of files) {
      const formData = new FormData();
      console.log("Тип файла:", file);
      formData.append("image", file.buffer.toString("base64"));
      console.log("Проверка файла перед отправкой:", file);
      console.log("Ключ API:", process.env.IMGBB_API_KEY);
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
        uploadedUrls.push(response.data.data.url);
      } else {
        throw new NotImplementedError("Не удалось получить URL изображения");
      }
    }
    return uploadedUrls;
  } catch (error) {
    console.error(
      "Ошибка при отправке изображения на imgbb:",
      error.response ? error.response.data : error.message
    );
    throw new NotImplementedError("Ошибка при загрузке изображения на imgbb");
  }
};
console.log("uploadImagesToImgbb", uploadImagesToImgbb);

module.exports = {
  getAllItems: async () => {
    const items = await itemRepository.findAllItems();
    return items;
  },
  getMyItems: async (userId) => {
    const myItems = await itemRepository.findUsersItems(userId);
    return myItems;
  },
  createNewItem: async (itemData, carouselImages, bannerImages) => {
    // Загрузка изображений для карусели

    const carouselImageUrls = await uploadImagesToImgbb(carouselImages);
    console.log("carouselImageUrls", carouselImageUrls);

    let videoThumbUrl = null;
    let mainBannerUrl = null;
    let adaptiveBannerUrl = null;
    let mainAdditionImgUrl = null;
    let adaptiveAdditionalUrl = null;
    if (bannerImages) {
      console.log("Загружается изображение баннера...");

      if (bannerImages.main) {
        try {
          const [uploadedMainUrl] = await uploadImagesToImgbb([
            bannerImages.main,
          ]);
          mainBannerUrl = uploadedMainUrl;
          console.log("URL для основного баннера:", mainBannerUrl);
        } catch (error) {
          console.error(
            "Ошибка при загрузке основного баннера:",
            error.message
          );
        }
      }

      if (bannerImages.adaptive) {
        try {
          const [uploadedAdaptiveUrl] = await uploadImagesToImgbb([
            bannerImages.adaptive,
          ]);
          adaptiveBannerUrl = uploadedAdaptiveUrl;
          console.log("URL для адаптивного баннера:", adaptiveBannerUrl);
        } catch (error) {
          console.error(
            "Ошибка при загрузке адаптивного баннера:",
            error.message
          );
        }
      }

      if (bannerImages.videoThumb) {
        try {
          const [uploadedVideoThumbUrl] = await uploadImagesToImgbb([
            bannerImages.videoThumb,
          ]);
          videoThumbUrl = uploadedVideoThumbUrl;
          console.log("URL для миниатюры видео:", videoThumbUrl);
        } catch (error) {
          console.error("Ошибка при загрузке миниатюры видео:", error.message);
        }
      }
      if (bannerImages.addition_main) {
        try {
          const [uploadedAdditionMainUrl] = await uploadImagesToImgbb([
            bannerImages.addition_main,
          ]);
          mainAdditionImgUrl = uploadedAdditionMainUrl;
        } catch (error) {
          console.error("Ошибка при загрузке main addition :", error.message);
        }
      }
      if (bannerImages.addition_adaptive) {
        try {
          const [uploadedAdditionAdaptiveUrl] = await uploadImagesToImgbb([
            bannerImages.addition_adaptive,
          ]);
          adaptiveAdditionalUrl = uploadedAdditionAdaptiveUrl;
        } catch (error) {
          console.error("Ошибка при загрузке main addition :", error.message);
        }
      }
    }

    const newItemData = {
      ...itemData,
      carousel_images: carouselImageUrls,
      banner_text: {
        banner_images: {
          main_banner: mainBannerUrl || "",
          alt: itemData.alt || "",
          adaptive_banner: adaptiveBannerUrl || "",
        },
        title: itemData.bannerText?.title || "",
        text: itemData.bannerText?.text || "",
      },
      video_section: {
        thumbnail: videoThumbUrl || "",
        video_url: itemData.video_url || "",
      },
      additional_images: {
        main_image: mainAdditionImgUrl || "",
        adaptive_image: adaptiveAdditionalUrl || "",
      },
    };

    console.log("newItemData", newItemData);

    const newItem = await itemRepository.createItem(newItemData); // Сохранение нового элемента
    console.log("newItem", newItem);
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