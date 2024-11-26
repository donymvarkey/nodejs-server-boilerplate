'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createServer } = require('node:http');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const { connectMongodb } = require('./database/DataBaseController');
const { logger } = require('./logger/Logger');
const { swaggerSpec } = require('./config/Swagger');

// Import Routes
const HealthRoute = require('./routes/HealthRoute');

class Server {
  constructor(options) {
    this.options = options;
    this.api = null;
    this.httpServer = null;
  }

  async configServer() {
    const api = express();
    const httpServer = createServer(api);

    api.use(express.urlencoded({ limit: '10mb', extended: true }));
    api.use(express.json({ limit: '10mb', extended: true }));
    api.use(
      cors({
        origin: ['*'],
        credentials: true,
      }),
    ); //allow cross domain requesting of urls
    api.options('*', cors());
    api.use(morgan('dev'));
    api.set('x-powered-by', false);
    api.use(helmet());

    this.api = api;
    this.httpServer = httpServer;

    return true;
  }

  async mountRoutes() {
    this.api.use('/api/health', HealthRoute);

    // Swagger Setup
    this.api.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    return true;
  }

  async startServer() {
    await this.configServer();
    await this.mountRoutes();

    this.api.use((req, res) => {
      logger.error('Route not found');
      res.status(404).json({
        msg: 'Route not found',
        status: false,
      });
    });

    this.api.use((error, req, res, next) => {
      const msg = error.message || 'Internal Server Error';
      logger.error(
        `Host: ${req?.hostname} :: Protocol: ${req?.protocol} :: URL: ${req?.originalUrl} :: Error: ${msg}`,
      );
      res.status(500).json({
        msg: 'Internal server error',
        status: false,
      });
      next();
    });

    this.httpServer.listen(this.options.port, async () => {
      logger.info(`Listening on port ${this.options.port}`);
      await connectMongodb(this.options.mongodb.uri);
    });

    const shutdown = (signal) => {
      logger.info(`Received signal ${signal}. Shutting down gracefully`);
      this.httpServer.close(() => {
        logger.info('Closed out remaining connections');
        process.exit(0);
      });

      // Force close server after 5 seconds
      setTimeout(() => {
        logger.error(
          'Could not close connections in time, forcefully shutting down',
        );
        process.exit(1);
      }, 5000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  }
}

module.exports = Server;
