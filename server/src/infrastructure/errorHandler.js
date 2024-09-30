const NotImplementedError = require("./errors/NotImplementedError");

const errorHandler = (err, req, res, next) => {
  console.error("Error-", err);
  if (err instanceof NotImplementedError) {
    res.send(404);
  } else {
    res.status(500).send("Something goes wrong");
  }
};

module.exports = errorHandler;
