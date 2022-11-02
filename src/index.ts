import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import glob from 'glob';
import { promisify } from 'util';

import { alert, error, success, warn } from './utils/loggers';
import { generateNum } from './utils/generator/number';

const globPromise = promisify(glob);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/v1', require('./routes/v1/main'));

const PORT = process.env.PORT ? process.env.PORT : 3001;
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(PORT, () => success('Listening to requests at: http://127.0.0.1:' + PORT, ' Notification'));

mongoose.connect(`${MONGODB_URI}`, { retryWrites: true, w: 'majority' });
mongoose.connection
  .on('connected', () => {
    success(' To MongoDB', 'Db Connected');
  })
  .on('error', (err) => {
    error(err, 'DB Error');
  })
  .on('disconnected', () => {
    error('From MongoDB', 'Db Disconnected');
  })
  .on('reconnected', () => {
    warn('To MongoDB', 'DB reconnected');
  })
  .on('timeout', () => {
    error('MongoDB Connection', 'Db Timeout');
  })
  .on('close', () => {
    warn('MongoDB Connection', 'Db closed');
  });

// LOADED ENDPOINTS

(async () => {
  const endpoints = await globPromise(`${process.cwd()}/src/routes/v1/**/*.ts`);
  endpoints.map((value) => {
    const fileName = value.split('/endpoints/')[1];
    if (fileName === undefined) return;
    alert(' Success! Loaded: ' + fileName, 'Routes');
  });
})();
