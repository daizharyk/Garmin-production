const userService = require("../../service/userService");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findAllUsers();
      res.send(users);
    } catch (error) {
      next(error);
    }
  },
  registerUser: async (req, res, next) => {
    try {
      const userData = req.body;
      const newUser = await userService.createNewUser(userData);
      res.send(newUser);
    } catch (error) {
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const data = req.body;
      const user = await userService.loginUser(data);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const userId = req.user;
      const user = await userService.findUser(userId);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },
  getMe: async (req, res, next) => {
    try {
      const user = req.user;
      const me = await userService.findUserWithItems(user._id);
      res.send(me);
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const data = req.body;
      const userIdFromParams = req.params.id;
      const userIdFromToken = req.user._id;

      const updatedUser = await userService.updateUser(
        userIdFromParams,
        userIdFromToken,
        data
      );
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const userIdFromParams = req.params.id;
      const userIdFromToken = req.user._id;
      await userService.deleteUser(userIdFromParams, userIdFromToken);
      res.send("User deleted!");
    } catch (error) {
      next(error);
    }
  },
  deleteUserForce: async (req, res, next) => {
    try {
      const userid = req.params.id;
      await userService.deleteUserForce(userid);
      res.send("User marked as deleted!");
    } catch (error) {
      next(error);
    }
  },
};
