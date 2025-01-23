const userService = require("../../service/userService");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const userRepository = require("../../repository/userRepository");

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
    console.log("email-from controler", email);

    try {
      const user = await userRepository.findUserByEmail(email);
      console.log("user from controler", user);

      if (!user) {
        return res
          .status(400)
          .send({ message: "User with this email does not exist" });
      }
      

      const resetToken = crypto.randomBytes(32).toString("hex");
    

      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();
      console.log("user from controler--2", user);
      const resetLink = `http://your-site.com/reset-password?token=${resetToken}`;


      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your-email@gmail.com",
          pass: "your-email-password",
        },
      });

      await transporter.sendMail({
        to: user.email,
        subject: "Password Reset Request",
        html: `
          <h2>Password Reset Request</h2>
          <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
        `,
      });

      res.status(200).send({ message: "Password reset email sent" });
    } catch (error) {
      next(error);
    }
  },

  // Новый метод для сброса пароля
  resetPassword: async (req, res, next) => {
    const { token, newPassword } = req.body;

    try {
      const user = await userService.findUserByResetToken(token);
      if (!user || user.resetTokenExpiration < Date.now()) {
        return res.status(400).send({ message: "Invalid or expired token" });
      }

      // Хэшируем новый пароль
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      user.resetToken = undefined; // Удаляем токен
      user.resetTokenExpiration = undefined; // Удаляем срок действия токена
      await user.save();

      res.status(200).send({ message: "Password has been reset successfully" });
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
