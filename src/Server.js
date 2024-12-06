'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createServer } = require('node:http');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const { connectMongodb } = require('./database/DataBaseController');
const { swaggerSpec } = require('./config/Swagger');

// Import Routes
const HealthRoute = require('./routes/HealthRoute');
const logger = require('./utils/logger');
const responseMessages = require('./constants/responseMessages');
const httpError = require('./utils/httpError');
const globalErrorhandler = require('./middlewares/globalErrorHandler');

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

    // Handling not for API endpoints
    this.api.use((req, res, next) => {
      try {
        throw new Error(responseMessages.NOT_FOUND('route'));
      } catch (error) {
        httpError(next, error, req, 404);
      }
    });

    // Global error handler
    this.api.use(globalErrorhandler);

    // Start server
    this.httpServer.listen(this.options.port, async () => {
      logger.info('APPLICATION_STARTED', {
        meta: {
          PORT: this.options.port,
          SERVER_URL: this.options.server_url,
        },
      });
      this.options.db_url && (await connectMongodb(this.options.db_url));
    });

    // Handle user interrupts eg: CTRL+C, CTRL+Z
    const shutdown = (signal) => {
      logger.info('RECEIVED SIGNAL', {
        meta: {
          signal: signal,
        },
      });
      this.httpServer.close(() => {
        logger.info('Shutting down server gracefully!');
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
    process.on('SIGTSTP', shutdown);
  }
}

module.exports = Server;
