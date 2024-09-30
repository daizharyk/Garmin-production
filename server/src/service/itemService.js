const itemsRepository = require("../repository/itemsRepository");

module.exports = {
  getAllItems: async () => {
    const items = await itemsRepository.findAllItems();
    return items;
  },
  creatNewItem: async (userid, itemdata) => {
    const newItem = await itemsRepository.creatItem(userid, itemdata);
    return newItem;
  },
  findItem: async (itemid) => {
    const item = await itemsRepository.findItem(itemid);
    return item;
  },
  updateItem: async (itenid, itendata) => {
    const updatedItem = await itemsRepository.updateItem(itemid, itendata);
    return updatedItem;
  },
  deleteItem: async (itemid) => {
    await itemsRepository.deletItem(itemid);
  },
  deleteItemForce: async (itemid) => {
    await itemsRepository.deletItemForce(itemid);
  },
};