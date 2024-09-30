const itemService = require("../../service/itemService");
module.exports = {
  getAllItems: (req, res) => {
    const items = itemService.getAllItems();
    res.send(items);
  },
  creatNewItem: (req, res) => {
    const user = req.user;
    const data = req.body;

    const item = itemService.creatNewItem(user, data);
    res.send(item);
  },
};
