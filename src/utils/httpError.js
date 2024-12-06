const errorObject = require('./errorObject');

const httpError = (nextFunc, err, req, errorStatusCode = 500) => {
  const errorObj = errorObject(err, req, errorStatusCode);
  return nextFunc(errorObj);
};

module.exports = httpError;
