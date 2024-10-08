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
  updateUser: async (userIdFromParams, userIdFromToken, userData) => {
    if (userIdFromParams !== userIdFromToken.toString()) {
      throw new InvalidDataError("You can only update your own account");
    }

    const updateUser = await userRepository.updateUser(
      userIdFromParams,
      userData
    );
    return updateUser;
  },
  deleteUser: async (userIdFromParams, userIdFromToken) => {
    if (userIdFromParams !== userIdFromToken.toString()) {
      throw new InvalidDataError("You can only delete your own account");
    }
    await userRepository.deleteUser(userIdFromParams);
  },
  deleteUserForce: async (userId) => {
    await userRepository.deleteUserForce(userId);
  },
};
