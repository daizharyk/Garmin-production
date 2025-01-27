const { User } = require("../database/models");
const crypto = require("crypto");
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
  findUser: async (userId) => {
    const user = await User.findOne({
      _id: userId,
      isDeleted: { $ne: true },
    });
    return user;
  },
  findUserWithItems: async (userId) => {
    const user = await User.findOne({
      _id: userId,
      isDeleted: { $ne: true },
    })
      .select("-password")
      .populate("items");
    return user;
  },
  findUserByEmail: async (email) => {
    const user = await User.findOne({ email: email, isDeleted: { $ne: true } });
    return user;
  },
  updateUser: async (userId, userData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  },
  createPasswordResetToken: async (userId) => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 3600000; // 1 час

    await User.findByIdAndUpdate(userId, {
      passwordResetToken: resetToken,
      passwordResetTokenExpire: resetTokenExpire,
    });

    return resetToken;
  },
  validatePasswordResetToken: async (userId, token) => {
    const user = await User.findById(userId);
    console.log("user from repos", user);

    if (
      !user ||
      user.passwordResetToken !== token ||
      user.passwordResetTokenExpire < Date.now()
    ) {
      throw new Error("Invalid or expired reset token");
    }
    return true;
  },

  updatePassword: async (userId, newPassword) => {
    const user = await User.findById(userId);
    user.password = newPassword;

    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();
    return user;
  },
  deleteUser: async (userId) => {
    await User.findByIdAndUpdate(userId, {
      isDeleted: true,
    });
    return;
  },
  deleteUserForce: async (userId) => {
    await User.findByIdAndDelete(userId, {
      isDeleted: true,
    });
    return;
  },
};
