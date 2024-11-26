const express = require('express');
const router = express.Router();

/**
 * @openapi
 * '/api/health':
 *  get:
 *     tags:
 *     - Health
 *     summary: Server Health
 *     responses:
 *      200:
 *        description: Server running
 */
router.get('/', (req, res, next) => {
  res.status(200).json({
    status: true,
    msg: 'Server is running',
  });
  next();
});

module.exports = router;
