const returnResponse = ({ code, message, data }, res) => {
  res.status(code).json({
    code,
    message,
    data,
  });
};

module.exports = returnResponse;
