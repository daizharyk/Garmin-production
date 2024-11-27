const ExistingEntityError = require("../infrastructure/errors/ExistingEntityError");
const InvalidDataError = require("../infrastructure/errors/InvalidDataError");
const userRepository = require("../repository/userRepository");
const { generateJWToken } = require("../utils/jwtWebToken");

module.exports = {
  findAllUsers: async () => {
    const users = await userRepository.findAllUser();
    return users;
  },
  createNewUser: async (userData) => {
    console.log("Received user data:", userData); // Логируем входящие данные
    const existingUser = await userRepository.findUserByEmail(userData.email);
    console.log("Existing user:", existingUser); // Логируем результат поиска
    if (existingUser) {
      throw new ExistingEntityError("User with this email already exist");
    }
    const newUser = await userRepository.createUser(userData);
    console.log("New user created:", newUser); // Логируем результат создания нового пользователя
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
    const existingUser = await userRepository.findUserByEmail(userData.email);
    console.log("existingUser", existingUser);

    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      throw new ExistingEntityError("This email is already used");
    }
    const updateUser = await userRepository.updateUser(userId, userData);
    return updateUser;
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
