const NotImplementedError = require("../infrastructure/errors/NotImplementedError");
const itemRepository = require("../repository/itemRepository");
const axios = require("axios");
const FormData = require("form-data");

const uploadImagesToImgbb = async (files) => {
  try {
    const uploadedUrls = [];
    const deleteUrls = [];
    for (const file of files) {
      const formData = new FormData();

      formData.append("image", file.buffer.toString("base64"));

      console.log(
        "IBB API",
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`
      );

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
      if (response.data && response.data.data) {
        const { url, delete_url } = response.data.data;
        uploadedUrls.push(url);
        deleteUrls.push(delete_url);
      } else {
        throw new NotImplementedError("Не удалось получить URL изображения");
      }
    }

    return { uploadedUrls, deleteUrls };
  } catch (error) {
    console.error(
      "JSON.stringify(error, null, 2)",
      JSON.stringify(error, null, 2)
    );
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
    const { uploadedUrls, deleteUrls } =
      await uploadImagesToImgbb(carouselImages);

    const carouselImageUrls = uploadedUrls;
    const carouselDeleteUrls = deleteUrls;

    let videoThumbUrl = null;
    let videoThumbDeleteUrl = null;
    let mainBannerUrl = null;
    let mainBannerDeleteUrl = null;
    let adaptiveBannerUrl = null;
    let adaptiveBannerDeleteUrl = null;

    let mainAdditionImgUrl = null;
    let mainAdditionImgDeleteUrl = null;
    let adaptiveAdditionalUrl = null;
    let adaptiveAddDeleteUrl = null;
    let mainImageUrl = null;
    let mainImageDeleteUrl = null;

    if (bannerImages) {
      if (bannerImages.mainImage) {
        try {
          const {
            uploadedUrls: [uploadMainImageUrl],
            deleteUrls: [deleteMainImageUrl],
          } = await uploadImagesToImgbb([bannerImages.mainImage]);
          mainImageUrl = uploadMainImageUrl;
          mainImageDeleteUrl = deleteMainImageUrl;
        } catch (error) {
          console.error(
            "Ошибка при загрузке основного изображения:",
            error.message
          );
        }
      }
      if (bannerImages.main) {
        try {
          const {
            uploadedUrls: [uploadMainBannerUrl],
            deleteUrls: [mainBannerDeleteUrlValue],
          } = await uploadImagesToImgbb([bannerImages.main]);
          mainBannerUrl = uploadMainBannerUrl;
          mainBannerDeleteUrl = mainBannerDeleteUrlValue;
        } catch (error) {
          console.error(
            "Ошибка при загрузке основного баннера:",
            error.message
          );
        }
      }
      if (bannerImages.adaptive) {
        try {
          const {
            uploadedUrls: [uploadAdaptiveBannerUrl],
            deleteUrls: [adaptiveBannerDelete],
          } = await uploadImagesToImgbb([bannerImages.adaptive]);
          adaptiveBannerUrl = uploadAdaptiveBannerUrl;
          adaptiveBannerDeleteUrl = adaptiveBannerDelete;
        } catch (error) {
          console.error(
            "Ошибка при загрузке адаптивного баннера:",
            error.message
          );
        }
      }

      if (bannerImages.videoThumb) {
        try {
          const {
            uploadedUrls: [uploadedVideoThumbUrl],
            deleteUrls: [deleteVideoThumbUrl],
          } = await uploadImagesToImgbb([bannerImages.videoThumb]);
          videoThumbUrl = uploadedVideoThumbUrl;
          videoThumbDeleteUrl = deleteVideoThumbUrl;
        } catch (error) {
          console.error("Ошибка при загрузке миниатюры видео:", error.message);
        }
      }
      if (bannerImages.addition_main) {
        try {
          const {
            uploadedUrls: [uploadedAdditionMainUrl],
            deleteUrls: [deleteAdditionMainUrl],
          } = await uploadImagesToImgbb([bannerImages.addition_main]);
          mainAdditionImgUrl = uploadedAdditionMainUrl;
          mainAdditionImgDeleteUrl = deleteAdditionMainUrl;
        } catch (error) {
          console.error("Ошибка при загрузке main addition :", error.message);
        }
      }
      if (bannerImages.addition_adaptive) {
        try {
          const {
            uploadedUrls: [uploadedAdditionAdaptiveUrl],
            deleteUrls: [deleteAdditionAddaptiveUrl],
          } = await uploadImagesToImgbb([bannerImages.addition_adaptive]);
          adaptiveAdditionalUrl = uploadedAdditionAdaptiveUrl;
          adaptiveAddDeleteUrl = deleteAdditionAddaptiveUrl;
        } catch (error) {
          console.error("Ошибка при загрузке main addition :", error.message);
        }
      }
    }
    const watchFeatureUrls = await Promise.all(
      (itemData.watch_features || []).map(async (feature) => {
        let imageUrl = null;
        if (feature.image && feature.image.buffer) {
          console.log(
            `Загружается изображение для watch feature: ${feature.image.originalname}`
          );
          try {
            const {
              uploadedUrls: [uploadedImageUrl],
            } = await uploadImagesToImgbb([{ buffer: feature.image.buffer }]);
            imageUrl = uploadedImageUrl;
            console.log(`Изображение загружено: ${imageUrl}`);
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

    console.log("Результаты загрузки watch features:", watchFeatureUrls);

    const watchFeatureDeleteUrls = await Promise.all(
      (itemData.watch_features || []).map(async (feature) => {
        let deleteUrl = null;

        if (feature.image && feature.image.buffer) {
          try {
            const {
              deleteUrls: [uploadedDeleteUrl],
            } = await uploadImagesToImgbb([{ buffer: feature.image.buffer }]);
            deleteUrl = uploadedDeleteUrl;
          } catch (error) {
            console.error(
              `Ошибка при загрузке изображения для watch feature:`,
              error.message
            );
          }
        }
        return deleteUrl || "";
      })
    );
    console.log(
      "Результаты загрузки delete_urls для watch features:",
      watchFeatureDeleteUrls
    );

    const deleteUrlsObject = {
      mainImageDeleteUrl: mainImageDeleteUrl || "",
      carouselDeleteUrls: carouselDeleteUrls || [],
      mainBannerDeleteUrl: mainBannerDeleteUrl || "",
      adaptiveBannerDeleteUrl: adaptiveBannerDeleteUrl || "",
      videoThumbDeleteUrl: videoThumbDeleteUrl || "",
      mainAdditionImgDeleteUrl: mainAdditionImgDeleteUrl || "",
      adaptiveAddDeleteUrl: adaptiveAddDeleteUrl || "",
      watchFeatureDeleteUrls: watchFeatureDeleteUrls || [],
    };
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
      delete_urls: deleteUrlsObject,
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
    let carouselDeleteUrls = Array.isArray(item.delete_urls)
      ? item.delete_urls
      : [];

    // Убедимся, что carouselImages является массивом
    if (carouselImages.length > 0) {
      const { uploadedUrls, deleteUrls } =
        await uploadImagesToImgbb(carouselImages);
      carouselImageUrls = [...carouselImageUrls, ...uploadedUrls];
      carouselDeleteUrls = [...carouselDeleteUrls, ...deleteUrls];
    }

    let videoThumbUrl = item.video_section?.thumbnail || null;
    let videoThumbDeleteUrl = item.delete_urls.videoThumbDeleteUrl || null;
    let mainBannerUrl = item.banner_text?.banner_images?.main_banner || null;
    let mainBannerDeleteUrl = item.delete_urls.mainBannerDeleteUrl || null;
    let adaptiveBannerUrl =
      item.banner_text?.banner_images?.adaptive_banner || null;
    let adaptiveBannerDeleteUrl =
      item.delete_urls.adaptiveBannerDeleteUrl || null;
    let mainAdditionImgUrl = item.additional_images?.main_image || null;
    let mainAdditionImgDeleteUrl =
      item.delete_urls.mainAdditionImgDeleteUrl || null;
    let adaptiveAdditionalUrl = item.additional_images?.adaptive_image || null;
    let adaptiveAddDeleteUrl = item.delete_urls.adaptiveAddDeleteUrl || null;
    let mainImageUrl = item.image || null;
    let mainImageDeleteUrl = item.delete_urls.mainImageDeleteUrl || null;

    if (bannerImages) {
      if (bannerImages.mainImage) {
        try {
          const {
            uploadedUrls: [uploadMainImageUrl],
            deleteUrls: [deleteMainImageUrl],
          } = await uploadImagesToImgbb([bannerImages.mainImage]);
          mainImageUrl = uploadMainImageUrl;
          mainImageDeleteUrl = deleteMainImageUrl;
        } catch (error) {
          console.error(error.message);
        }
      }

      if (bannerImages.main) {
        try {
          const {
            uploadedUrls: [uploadMainBannerUrl],
            deleteUrls: [mainBannerDeleteUrlValue],
          } = await uploadImagesToImgbb([bannerImages.main]);
          mainBannerUrl = uploadMainBannerUrl;
          mainBannerDeleteUrl = mainBannerDeleteUrlValue;
        } catch (error) {
          console.error(
            "Ошибка при загрузке основного баннера:",
            error.message
          );
        }
      }

      if (bannerImages.adaptive) {
        try {
          const {
            uploadedUrls: [uploadAdaptiveBannerUrl],
            deleteUrls: [adaptiveBannerDelete],
          } = await uploadImagesToImgbb([bannerImages.adaptive]);
          adaptiveBannerUrl = uploadAdaptiveBannerUrl;
          adaptiveBannerDeleteUrl = adaptiveBannerDelete;
        } catch (error) {
          console.error(
            "Ошибка при загрузке адаптивного баннера:",
            error.message
          );
        }
      }

      if (bannerImages.videoThumb) {
        try {
          const {
            uploadedUrls: [uploadedVideoThumbUrl],
            deleteUrls: [deleteVideoThumbUrl],
          } = await uploadImagesToImgbb([bannerImages.videoThumb]);
          videoThumbUrl = uploadedVideoThumbUrl;
          videoThumbDeleteUrl = deleteVideoThumbUrl;
        } catch (error) {
          console.error("Ошибка при загрузке миниатюры видео:", error.message);
        }
      }
      if (bannerImages.addition_main) {
        try {
          const {
            uploadedUrls: [uploadedAdditionMainUrl],
            deleteUrls: [deleteAdditionMainUrl],
          } = await uploadImagesToImgbb([bannerImages.addition_main]);
          mainAdditionImgUrl = uploadedAdditionMainUrl;
          mainAdditionImgDeleteUrl = deleteAdditionMainUrl;
        } catch (error) {
          console.error("Ошибка при загрузке main addition :", error.message);
        }
      }

      if (bannerImages.addition_adaptive) {
        try {
          const {
            uploadedUrls: [uploadedAdditionAdaptiveUrl],
            deleteUrls: [deleteAdditionAddaptiveUrl],
          } = await uploadImagesToImgbb([bannerImages.addition_adaptive]);
          adaptiveAdditionalUrl = uploadedAdditionAdaptiveUrl;
          adaptiveAddDeleteUrl = deleteAdditionAddaptiveUrl;
        } catch (error) {
          console.error("Ошибка при загрузке main addition :", error.message);
        }
      }
    }
    const watchFeatureUrls = await Promise.all(
      (itemData.watch_features || []).map(async (feature, index) => {
        let imageUrl = item.watch_features?.[index]?.image || null;
        if (feature.image && feature.image.buffer) {
          try {
            const {
              uploadedUrls: [uploadedImageUrl],
            } = await uploadImagesToImgbb([{ buffer: feature.image.buffer }]);
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
    const watchFeatureDeleteUrls = await Promise.all(
      (itemData.watch_features || []).map(async (feature, index) => {
        let deleteUrl = null;

        if (feature.image && feature.image.buffer) {
          try {
            const {
              deleteUrls: [uploadedDeleteUrl],
            } = await uploadImagesToImgbb([{ buffer: feature.image.buffer }]);
            deleteUrl = uploadedDeleteUrl;
          } catch (error) {
            console.error(
              `Ошибка при загрузке изображения для watch feature:`,
              error.message
            );
          }
        }
        return deleteUrl || "";
      })
    );
    console.log(
      "Результаты загрузки delete_urls для watch features:",
      watchFeatureDeleteUrls
    );

    const deleteUrlsObject = {
      mainImageDeleteUrl: mainImageDeleteUrl || "",
      carouselDeleteUrls: carouselDeleteUrls || [],
      mainBannerDeleteUrl: mainBannerDeleteUrl || "",
      adaptiveBannerDeleteUrl: adaptiveBannerDeleteUrl || "",
      videoThumbDeleteUrl: videoThumbDeleteUrl || "",
      mainAdditionImgDeleteUrl: mainAdditionImgDeleteUrl || "",
      adaptiveAddDeleteUrl: adaptiveAddDeleteUrl || "",
      watchFeatureDeleteUrls: watchFeatureDeleteUrls || [],
    };

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
      image: mainImageUrl,
      delete_urls: deleteUrlsObject,
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
