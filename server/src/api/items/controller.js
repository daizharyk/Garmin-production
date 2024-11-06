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

      const data = { ...req.body, user: user._id };
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Файл не загружен" });
      }
      const carouselImages = req.files.carouselImages || [];

      const mainBanner = req.files.mainBanner ? req.files.mainBanner[0] : null;
      const adaptiveBanner = req.files.adaptiveBanner
        ? req.files.adaptiveBanner[0]
        : null;
      const videoThumbnail = req.files.videoThumbnail
        ? req.files.videoThumbnail[0]
        : null;
      const mainAdditionImg = req.files.mainAdditionImg
        ? req.files.mainAdditionImg[0]
        : null;
      const adaptiveAdditionImg = req.files.adaptiveAdditionImg
        ? req.files.adaptiveAdditionImg[0]
        : null;

  

      const item = await itemService.createNewItem(data, carouselImages, {
        main: mainBanner,
        adaptive: adaptiveBanner,
        videoThumb: videoThumbnail,
        addition_main: mainAdditionImg,
        addition_adaptive: adaptiveAdditionImg,
      });
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
