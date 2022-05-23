const succesResponse = (res, msg) => {
  var data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

const succesResponseWithData = (res, msg, data) => {
  var resData = {
    status: 1,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

const ErrorResponse = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(500).json(data);
};

const notFoundResponse = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
};

const validationErrorWithData = (res, msg, data) => {
  var resData = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

const unAuthorizedResponse = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(401).json(data);
};
