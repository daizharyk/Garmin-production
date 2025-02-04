const ExistingEntityError = require("../infrastructure/errors/ExistingEntityError");
const InvalidDataError = require("../infrastructure/errors/InvalidDataError");
const userRepository = require("../repository/userRepository");
const { sendRecoveryEmail } = require("../utils/emailRecovery");
const jwt = require("jsonwebtoken");

const { generateJWToken } = require("../utils/jwtWebToken");
const bcrypt = require("bcryptjs");

function isPasswordSecure(password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

module.exports = {
  findAllUsers: async () => {
    const users = await userRepository.findAllUser();
    return users;
  },
  createNewUser: async (userData) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);

    if (existingUser) {
      throw new ExistingEntityError("User with this email already exist");
    }
    if (!isPasswordSecure(userData.password)) {
      throw new Error(
        "Password must be at least 8 characters long, contain letters, numbers, and special characters"
      );
    }

    const newUser = await userRepository.createUser(userData);
    return newUser;
  },

  loginUser: async (userData) => {
    const { email, password } = userData;
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser && (await existingUser.matchPasswords(password))) {
      const jwtToken = generateJWToken(existingUser._id);

      return {
        _id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        token: jwtToken,
      };
    } else {
      throw new InvalidDataError("Email or password is wrong!");
    }
  },
  requestPasswordReset: async (email) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new ExistingEntityError("User with this email does not exist");
    }

    const resetToken = await userRepository.createPasswordResetToken(user._id);

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3002"
        : process.env.BASE_URL || "http://localhost:3002";

    const resetLink = `${baseUrl}/pages/reset-password.html?token=${resetToken}`;

    await sendRecoveryEmail(user.email, resetLink);
  },
  resetPassword: async (token, newPassword) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("decoded from service", decoded);

    const userId = decoded.userId;

    await userRepository.validatePasswordResetToken(userId, token);
    await userRepository.updatePassword(userId, newPassword);

    return true;
  },
  findUser: async (userId) => {
    const user = await userRepository.findUser(userId);
    return user;
  },
  findUserWithItems: async (userId) => {
    const userWithItems = await userRepository.findUserWithItems(userId);
    return userWithItems;
  },
  updateUser: async (userId, userData) => {
    if (userData.email !== undefined) {
      const existingUser = await userRepository.findUserByEmail(userData.email);
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        throw new ExistingEntityError("This email is already used");
      }
    }

    const updateUser = await userRepository.updateUser(userId, userData);
    return updateUser;
  },
  updatePassword: async (userId, { currentPassword, newPassword }) => {
    const user = await userRepository.findUser(userId);

    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new InvalidDataError("Old password is incorrect");
    }
    await userRepository.updatePassword(userId, newPassword);
  },
  deleteUser: async (userIdFromParams, userIdFromToken) => {
    if (userIdFromParams !== userIdFromToken.toString()) {
      throw new InvalidDataError("You can only delete your own account");
    }
    await userRepository.deleteUser(userIdFromParams);
  },
  deleteUserForce: async (userIdFromParams, userIdFromToken) => {
    if (userIdFromParams !== userIdFromToken.toString()) {
      throw new InvalidDataError("You can only delete your own account");
    }
    await userRepository.deleteUserForce(userIdFromParams);
  },
};
