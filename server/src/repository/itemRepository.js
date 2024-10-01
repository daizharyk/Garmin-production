const { Item } = require("../database/models");

module.exports = {
  createItem: async (item) => {
    const newItem = new Item(item);
    const result = await newItem.save();
    return result;
  },
  findAllItems: async () => {
    const items = await Item.find({
      isDeleted: { $ne: true },
    });
    return items;
  },
  findItem: async (itemid) => {
    const item = await Item.findById({ _id: itemid, isDeleted: { $ne: true } });
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
