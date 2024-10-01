const NotImplementedError = require("../infrastructure/errors/NotImplementedError");
const usersRepository = require("../repository/usersRepository");

module.exports = {
  findAllUsers: async () => {
    const users = await usersRepository.findAllUser();
    return users;
  },
  createNewUser: async (userdata) => {
    const newUser = await usersRepository.createUser(userdata);
    return newUser;
  },
  findUser: async (userid) => {
    const user = await usersRepository.findUser(userid);
    return user;
  },
  updateUser: async (userid, userdata) => {
    const updateUser = await usersRepository.updateUser(userid, userdata);
    return updateUser;
  },
  deleteUser: async (userid) => {
    await usersRepository.deleteUser(userid);
  },
  deleteUserForce: async (userid) => {
    await usersRepository.deleteUserForce(userid);
  },
};
