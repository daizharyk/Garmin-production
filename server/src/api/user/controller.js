const userService = require("../../service/userService");

const ExistingEntityError = require("../../infrastructure/errors/ExistingEntityError");

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
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
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
      const userId = req.user._id;

      const updatedUser = await userService.updateUser(userId, data);
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  updatePassword: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { currentPassword, newPassword } = req.body;
      await userService.updatePassword(userId, {
        currentPassword,
        newPassword,
      });
      res.send({ message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  },
  recoverPassword: async (req, res, next) => {
    const { email } = req.body;
    console.log("email", email);

    try {
      await userService.requestPasswordReset(email);
      res.status(200).json({
        message:
          "If this email is associated with an account, you will receive a recovery email shortly.",
      });
    } catch (error) {
      console.error("Error in recoverPassword:", error);
      if (error instanceof ExistingEntityError) {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    const { token, newPassword } = req.body;

    try {
      await userService.resetPassword(token, newPassword);
      res.status(200).send({  message: "Password has been reset successfully" });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const userIdFromParams = req.params.id;
      const userIdFromToken = req.user._id;
      await userService.deleteUser(userIdFromParams, userIdFromToken);
      res.send("User marked as deleted!");
    } catch (error) {
      next(error);
    }
  },

  deleteUserForce: async (req, res, next) => {
    try {
      const userIdFromParams = req.params.id;
      const userIdFromToken = req.user._id;
      await userService.deleteUserForce(userIdFromParams, userIdFromToken);
      res.send("User deleted!");
    } catch (error) {
      next(error);
    }
  },
};
