import mongoose from 'mongoose';

import { Block } from '@modules/block/block.model';
import ReportController from '@modules/report/report.controller';

const userId = 'test-user-id';

const startOfMonth = new Date();
startOfMonth.setDate(1);
startOfMonth.setUTCHours(0, 0, 0, 0);

const createBlock = (offsetHours: number) => ({
  userId,
  start: startOfMonth.getTime() + offsetHours * 60 * 60 * 1000,
  end: startOfMonth.getTime() + (offsetHours + 2) * 60 * 60 * 1000,
  breakLength: 15 * 60 * 1000,
});

const blockData = [createBlock(0), createBlock(4), createBlock(8)];

describe('ReportController', () => {
  beforeAll(async () => {
    await mongoose.connect((global as any).__MONGO_URI__);
    await Block.deleteMany({});
    await Block.insertMany(blockData);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  it('should return this month report for a given user', async () => {
    const report = await ReportController.thisMonthReport(userId);

    expect(report).toHaveProperty('length');
    expect(report).toHaveProperty('maxLength');
    expect(report).toHaveProperty('blockCount');
    expect(report).toHaveProperty('avgLength');

    const totalLength = 3 * (2 * 60 * 60 * 1000 - 15 * 60 * 1000);
    expect(report.length).toBe(totalLength);
    expect(report.maxLength).toBe(2 * 60 * 60 * 1000 - 15 * 60 * 1000);
    expect(report.blockCount).toBe(3);
    expect(report.avgLength).toBe(totalLength / report.blockCount);
  });
});
