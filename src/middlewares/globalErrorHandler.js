const responseMessages = require('../constants/responseMessages');
const httpResponse = require('../utils/httpResponse');

// eslint-disable-next-line no-unused-vars
const globalErrorhandler = (err, req, res, _next) => {
  //   res.status(err.statusCode).json(err);
  httpResponse(
    req,
    res,
    err.statusCode,
    responseMessages.SOMETHING_WENT_WRONG,
    err,
  );
};

module.exports = globalErrorhandler;
