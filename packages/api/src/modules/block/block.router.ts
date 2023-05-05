import express from 'express';
import { body, validationResult } from 'express-validator';

import BlockController from './block.controller';

const router = express.Router();

router.post(
  '/makeData',
  body('userId').exists(),
  body('count').exists().isNumeric(),
  async (req, res, next) => {
    try {
      // Check the request for validation errors
      const validationRes = validationResult(req);

      if (!validationRes.isEmpty()) {
        const errors = validationRes.array();
        return res.status(400).json({ code: 400, message: errors });
      }
      const { userId, count } = req.body;
      // Create the specified number of blocks for the given user
      await BlockController.createBlocks(userId, count);
      res.status(200).json({ code: 200, message: 'ok' });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
