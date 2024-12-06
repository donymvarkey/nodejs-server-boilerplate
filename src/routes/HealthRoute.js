const express = require('express');
const { healthController } = require('../controllers/HealthController');
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
router.get('/', async (req, res) => {
  await healthController(req, res);
});

module.exports = router;
