import { Application } from 'express';

import blockRouter from '@modules/block/block.router';
import monitoringRouter from '@modules/monitoring/monitoring.router';
import reportRouter from '@modules/report/report.router';

export const registerRoutes = (app: Application) => {
  // API routes
  app.use('/ping', monitoringRouter);
  app.use('/block', blockRouter);
  app.use('/report', reportRouter);
};
