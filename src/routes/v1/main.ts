import express from 'express';
import chalk from 'chalk';
import { alert } from '../../utils/loggers';
import rateLimit from 'express-rate-limit';

const router = express.Router();

module.exports = router;

router.use((req, res, next) => {
  alert(
    `${req.originalUrl} ${chalk.yellowBright('-')} ${req.method} ${chalk.yellowBright(
      '-',
    )} ${new Date().toISOString()}`,
    'Request Info',
  );
  next();
});

const limiter = rateLimit({
  max: 5,
  windowMs: 300000,
});

router.get('/health', require('./endpoints/health'));
// BIN
router.post('/bin', limiter, require('./bin/create'));
router.get('/bin', require('./bin/show'));
router.get('/bin/:code', require('./bin/view'));
