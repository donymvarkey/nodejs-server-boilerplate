const { getApplicationHealth, getSystemHealth } = require('../utils/common');

const getServerHealthDetails = () => {
  return {
    application: getApplicationHealth(),
    system: getSystemHealth(),
    timestamp: Date.now(),
  };
};

module.exports = getServerHealthDetails;
