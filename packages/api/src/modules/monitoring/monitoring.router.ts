import express from 'express';

import MonitoringController from './monitoring.controller';

const router = express.Router();

router.get('/', async (_, res, next) => {
  try {
    const isApiAvailable = MonitoringController.servicesHealthProbe();
    return res
      .status(200)
      .json({ code: isApiAvailable ? 200 : 500, message: 'pong' });
  } catch (err) {
    next(err);
  }
});

export default router;
