import mongoose from 'mongoose';

import BlockController from '@modules/block/block.controller';
import { Block } from '@modules/block/block.model';

describe('BlockController', () => {
  beforeAll(async () => {
    await mongoose.connect((global as any).__MONGO_URI__);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  describe('createBlocks', () => {
    it('should create the specified number of blocks', async () => {
      const userId = 'testUserId';
      const count = 5;

      const createdBlocks = await BlockController.createBlocks(userId, count);
      expect(createdBlocks.length).toBe(count);

      const savedBlocks = await Block.find({ userId: userId }).exec();
      expect(savedBlocks.length).toBe(count);
    });
  });
});
