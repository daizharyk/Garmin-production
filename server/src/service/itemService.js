const itemRepository = require("../repository/itemRepository");

module.exports = {
  getAllItems: async () => {
    const items = await itemRepository.findAllItems();
    return items;
  },
  createNewItem: async ( itemdata) => {
    const newItem = await itemRepository.createItem( itemdata);
    return newItem;
  },
  findItem: async (itemid) => {
    const item = await itemRepository.findItem(itemid);
    return item;
  },
  updateItem: async (itemid, itendata) => {
    const updatedItem = await itemRepository.updateItem(itemid, itendata);
    return updatedItem;
  },
  deleteItem: async (itemid) => {
    await itemRepository.deletItem(itemid);
  },
  deleteItemForce: async (itemid) => {
    await itemRepository.deletItemForce(itemid);
  },
};
