const NotImplementedError = require("../infrastructure/errors/NotImplementedError");

module.exports = {
  getAllUsers: () => {
    throw new NotImplementedError("Error");
    return "All user from service";
  },
  creatNewUser: () => {
    return "Cresat user from service";
  },
};
