const userService = require("../../service/userService");

module.exports = {
  getAllUsers: (req, res, next) => {
    try {
      const users = userService.getAllUsers();
      res.send(users);
    } catch (error) {
      next(error);
    }
  },
  creatNewUser: (req, res, next) => {
    try {
      const user = req.user;
    
      const newUser = userService.creatNewUser();
      res.send(newUser);
    } catch (error) {
      next(error);
    }
  },
};
