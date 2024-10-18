const ExistingEntityError = require("./errors/ExistingEntityError");
const InvalidDataError = require("./errors/InvalidDataError");
const NotImplementedError = require("./errors/NotImplementedError");

const errorHandler = (err, req, res, next) => {
  console.error("Error-", err);

  switch (true) {
    case err instanceof NotImplementedError:
      res.status(404).json({ message: err.message });
      break;
    case err instanceof ExistingEntityError:
      res.status(400).json({ message: err.message });
      break;
    case err instanceof InvalidDataError:
      res.status(401).json({ message: err.message });
      break;
    default:
      res.status(500).send("Something goes wrong");
  }
};

module.exports = errorHandler;
