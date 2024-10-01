const { User } = require("../database/models");

module.exports = {
  createUser: async (user) => {
    const newUser = new User(user);
    const result = await newUser.save();
    return { _id: result._id, name: result.name, email: result.email };
  },
  findAllUser: async () => {
    const users = await User.find({
      isDeleted: { $ne: true },
    });
    return users;
  },
  findUser: async (userid) => {
    const user = await User.findOne({ _id: userid, isDeleted: { $ne: true } });
    return user;
  },
  findUserByEmail: async (email) => {
    const user = await User.findOne({ email:email, isDeleted: { $ne: true } });
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
