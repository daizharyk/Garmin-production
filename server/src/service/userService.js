const ExistingEntityError = require("../infrastructure/errors/ExistingEntityError");
const InvalidDataError = require("../infrastructure/errors/InvalidDataError");
const userRepository = require("../repository/userRepository");
const { generateJWToken } = require("../utils/jwtWebToken");
const bcrypt = require("bcryptjs");
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
