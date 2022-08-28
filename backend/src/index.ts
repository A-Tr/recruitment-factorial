import * as dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();

import cors from 'cors';
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import { getEnv } from './common/Env';
import { logger } from './common/Logger';
import { errorHandler } from './common/middleware/ErrorHandler';
import { RegisterRoutes } from './common/Routes';
import { connectToDb, disconnectFromDb } from './common/Database';

async function start() {
  logger.info(`Starting server...`);

  const app = express();
  await connectToDb()
  
  const port = getEnv('PORT', false) || 3000;
  
  app.use(express.json({ strict: false }));
  app.use(cors());
  
  const swaggerDocument = yaml.load(path.join(__dirname, '../api/openapi.yaml'));
  app.use(`/api/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  RegisterRoutes(app);
  
  app.use(errorHandler);
  
  http.createServer(app).listen(port, function () {
    logger.info(`Your server is listening on port ${port}`);
    logger.info(`Open API is available on route api/docs`);
  });
}

async function shutdown(signal: string) {
  logger.info(`Got Shutdown event type ${signal}. Graceful shutdown start at ${new Date().toISOString()}`)
  await disconnectFromDb()
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start()