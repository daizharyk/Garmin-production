const { Item } = require("../database/models");

module.exports = {
  creatItem: async (item) => {
    const newItem = new Item(item);
    const result = await newItem.save();
    return result;
  },
  findAllItems: async () => {
    const items = await Item.find();
    return items;
  },
  findItem: async (itemid) => {
    const item = await Item.findById(itemid);
    return item;
  },
  updateItem: async (itemid, data) => {
    const updatedItem = await Item.findByIdAndUpdate(itemid, data, {
      new: true,
    });
    return updatedItem;
  },
  deletItem: async (itemid) => {
    await Item.findByIdAndUpdate(itemid, {
      isDeleted: true,
    });
  },
  deletItemForce: async (itemid) => {
    await Item.findByIdAndDelete(itemid);
  },
};
