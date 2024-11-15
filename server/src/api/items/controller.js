const itemService = require("../../service/itemService");
module.exports = {
  getAllItems: async (req, res, next) => {
    try {
      const items = await itemService.getAllItems();
      res.send(items);
    } catch (error) {
      next(error);
    }
  },
  getMyItems: async (req, res, next) => {
    try {
      const user = req.user;
      const items = await itemService.getMyItems(user._id);
      res.send(items);
    } catch (error) {
      next(error);
    }
  },
  createNewItem: async (req, res, next) => {
    try {
      const user = req.user;
  
      const data = {
        ...req.body,
        user: user._id,
        bannerText: {
          title: req.body.banner_title || "",
          text: req.body.banner_text || "",
        },
        video_url: req.body.video_url || "",
      };

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Файл не загружен" });
      }
      const carouselImages = req.files.filter(
        (file) => file.fieldname === "carouselImages"
      );
      const mainBanner = req.files.find(
        (file) => file.fieldname === "mainBanner"
      );
      const adaptiveBanner = req.files.find(
        (file) => file.fieldname === "adaptiveBanner"
      );
      const videoThumbnail = req.files.find(
        (file) => file.fieldname === "videoThumbnail"
      );
      const mainAdditionImg = req.files.find(
        (file) => file.fieldname === "mainAdditionImg"
      );
      const adaptiveAdditionImg = req.files.find(
        (file) => file.fieldname === "adaptiveAdditionImg"
      );

      const watchFeatures = [];
      console.log("Watch features from body:", req.body.watch_features);
      req.files.forEach((file) => {
        console.log("Processing file:", file);
        const match = file.fieldname.match(/watch_features_image_(\d+)/);
        if (match) {
          const index = parseInt(match[1], 10);
          console.log("Extracted index:", index);
          if (!watchFeatures[index]) {
            watchFeatures[index] = {};
          }
          watchFeatures[index] = {
            buffer: file.buffer,
            originalname: file.originalname,
          };
          console.log(
            "Saved image buffer and original name for itemService:",
            watchFeatures[index].buffer,
            watchFeatures[index].originalname
          );
        }
      });
      console.log("watchFeaturesto save:", watchFeatures);
      data.watch_features = req.body.watch_features.map((feature, index) => ({
        image: watchFeatures[index] ? watchFeatures[index] : "",
        title: feature.title,
        description: feature.description,
      }));


      const item = await itemService.createNewItem(data, carouselImages, {
        main: mainBanner,
        adaptive: adaptiveBanner,
        videoThumb: videoThumbnail,
        addition_main: mainAdditionImg,
        addition_adaptive: adaptiveAdditionImg,
      });
      console.log(item);

      res.send(item);
    } catch (error) {
      next(error);
    }
  },
  getItem: async (req, res, next) => {
    try {
      const itemid = req.params.id;
      const item = await itemService.findItem(itemid);
      res.send(item);
    } catch (error) {
      next(error);
    }
  },
  updateItem: async (req, res, next) => {
    try {
      const user = req.user;
      const itemid = req.params.id;
      const data = req.body;
      const updatedItem = await itemService.updateItem(itemid, data, user._id);
      res.send(updatedItem);
    } catch (error) {
      next(error);
    }
  },
  deleteItem: async (req, res, next) => {
    try {
      const user = req.user;
      const itemid = req.params.id;
      await itemService.deleteItem(itemid, user._id);
      res.send("Item deleted");
    } catch (error) {
      next(error);
    }
  },
  deleteItemForce: async (req, res, next) => {
    try {
      const user = req.user;
      const itemid = req.params.id;
      await itemService.deleteItemForce(itemid, user._id);
      res.send("Item deleted");
    } catch (error) {
      next(error);
    }
  },
};
