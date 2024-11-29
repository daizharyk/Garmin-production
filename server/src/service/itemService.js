const NotImplementedError = require("../infrastructure/errors/NotImplementedError");
const itemRepository = require("../repository/itemRepository");
const axios = require("axios");
const FormData = require("form-data");

const uploadImagesToImgbb = async (files) => {
  try {
    const uploadedUrls = [];
    for (const file of files) {
      const formData = new FormData();

      formData.append("image", file.buffer.toString("base64"));

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

    let videoThumbUrl = null;
    let mainBannerUrl = null;
    let adaptiveBannerUrl = null;
    let mainAdditionImgUrl = null;
    let adaptiveAdditionalUrl = null;
    let mainImageUrl = null;

    if (bannerImages) {
      if (bannerImages.mainImage) {
        try {
          const [uploadMainImageUrl] = await uploadImagesToImgbb([
            bannerImages.mainImage,
          ]);
          mainImageUrl = uploadMainImageUrl;
        } catch (error) {
          console.error(
            "Ошибка при загрузке основного изображения:",
            error.message
          );
        }
      }

      if (bannerImages.main) {
        try {
          const [uploadedMainUrl] = await uploadImagesToImgbb([
            bannerImages.main,
          ]);
          mainBannerUrl = uploadedMainUrl;
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
          // console.log("URL для миниатюры видео:", videoThumbUrl);
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
    const watchFeatureUrls = await Promise.all(
      (itemData.watch_features || []).map(async (feature) => {
        let imageUrl = null;

        // Проверка, есть ли изображение и его буфер
        if (feature.image && feature.image.buffer) {
          console.log(
            `Загружается изображение для watch feature: ${feature.image.originalname}`
          );
          try {
            const [uploadedImageUrl] = await uploadImagesToImgbb([
              { buffer: feature.image.buffer },
            ]);
            imageUrl = uploadedImageUrl;
            console.log(`Изображение загружено: ${imageUrl}`);
          } catch (error) {
            console.error(
              `Ошибка при загрузке изображения для watch feature:`,
              error.message
            );
          }
        }

        // Возвращаем объект, но если данных нет, пропускаем или ставим дефолтные значения
        return {
          image: imageUrl || "", // Если изображения нет, ставим пустую строку
          title: feature.title || null, // Если нет названия, ставим null
          description: feature.description || null, // Если нет описания, ставим null
        };
      })
    );

    console.log("Watch features to save:", watchFeatureUrls);
    const newItemData = {
      ...itemData,
      image: mainImageUrl,
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
      watch_features: watchFeatureUrls,
    };

    // console.log("newItemData before saving:", newItemData);

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
  updateItem: async (
    itemId,
    userId,
    itemData,
    carouselImages,
    bannerImages
  ) => {
    const item = await itemRepository.findUsersItem(itemId, userId);

    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    let carouselImageUrls = item.carousel_images || [];
    if (carouselImages.length > 0) {
      const newImageUrls = await uploadImagesToImgbb(carouselImages);
      carouselImageUrls = [...carouselImageUrls, ...newImageUrls];
    }

    let videoThumbUrl = item.video_section?.thumbnail || null;
    let mainBannerUrl = item.banner_text?.banner_images?.main_banner || null;
    let adaptiveBannerUrl =
      item.banner_text?.banner_images?.adaptive_banner || null;
    let mainAdditionImgUrl = item.additional_images?.main_image || null;
    let adaptiveAdditionalUrl = item.additional_images?.adaptive_image || null;

    if (bannerImages) {
      if (bannerImages.main) {
        try {
          const [uploadedMainUrl] = await uploadImagesToImgbb([
            bannerImages.main,
          ]);
          mainBannerUrl = uploadedMainUrl;
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
          console.error("Ошибка при загрузке main addition:", error.message);
        }
      }

      if (bannerImages.addition_adaptive) {
        try {
          const [uploadedAdditionAdaptiveUrl] = await uploadImagesToImgbb([
            bannerImages.addition_adaptive,
          ]);
          adaptiveAdditionalUrl = uploadedAdditionAdaptiveUrl;
        } catch (error) {
          console.error(
            "Ошибка при загрузке adaptive addition:",
            error.message
          );
        }
      }
    }
    const watchFeatureUrls = await Promise.all(
      (itemData.watch_features || []).map(async (feature, index) => {
        let imageUrl = item.watch_features?.[index]?.image || null;
        if (feature.image && feature.image.buffer) {
          try {
            const [uploadedImageUrl] = await uploadImagesToImgbb([
              { buffer: feature.image.buffer },
            ]);
            imageUrl = uploadedImageUrl;
          } catch (error) {
            console.error(
              `Ошибка при загрузке изображения для watch feature:`,
              error.message
            );
          }
        }
        return {
          image: imageUrl || "",
          title: feature.title || null,
          description: feature.description || null,
        };
      })
    );
    const updatedItemData = {
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
      watch_features: watchFeatureUrls,
    };
    const updatedItem = await itemRepository.updateItem(
      itemId,
      updatedItemData
    );

    if (!updatedItem) {
      throw new NotImplementedError("Ошибка при обновлении элемента");
    }
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
    const item = await itemRepository.findUsersDeletedItem(itemId, userId);
    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    await itemRepository.deleteItemForce(itemId);
  },
  restoreItem: async (itemId, userId) => {
    const item = await itemRepository.findUsersDeletedItem(itemId, userId);

    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    await itemRepository.restoreItem(itemId);
  },
};
