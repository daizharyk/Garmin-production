const { User } = require("../database/models");

module.exports = {
  creatUser: async (user) => {
    const newUser = new User(user);
    const result = await newUser.save();
    return result;
  },
  findAllUser: async () => {
    const users = await User.find();
    return users;
  },
  findUser: async (userid) => {
    const user = await User.findById(userid);
    return user;
  },
  updateUser: async (userid, userdata) => {
    const updatedUser = await User.findByIdAndUpdate(userid, userdata, {
      new: true,
    });
    return updatedUser;
  },
  deleteUser: async (userid) => {
    await User.findByIdAndUpdate(userid, {
      isDeleted: true,
    });
    return;
  },
  deleteUserForce: async (userid) => {
    await User.findByIdAndDelete(userid, {
      isDeleted: true,
    });
    return;
  },
};
