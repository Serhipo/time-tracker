import express from 'express';
import { body, validationResult } from 'express-validator';

import ReportController from './report.controller';

const router = express.Router();

router.post(
  '/thisMonthReport',
  body('userId').exists(),
  async (req, res, next) => {
    try {
      // Check the request for validation errors
      const validationRes = validationResult(req);

      if (!validationRes.isEmpty()) {
        const errors = validationRes.array();
        return res.status(400).json({ code: 400, message: errors });
      }
      const { userId } = req.body;
      // Generate the report for the user and return it to the client
      const report = await ReportController.thisMonthReport(userId);
      res.status(200).json(report);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
