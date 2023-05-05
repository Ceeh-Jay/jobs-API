const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .joim(". ");
    customError.StatusCode = 400;

    return res.status(customError.statusCode).json({ msg: customError.msg });
  }
  if(err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`;
    customeError.statusCode = 404;

    return res.status(customError.statusCode).json({ msg: customError.msg });
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field please choose another value`;

    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ msg: customeError.msg });
};

module.exports = errorHandlerMiddleware;
