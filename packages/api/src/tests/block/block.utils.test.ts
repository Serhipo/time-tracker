import {
  adjustEndTimestamp,
  randomBreakLength,
  randomDateWithinLast60Days,
} from '@modules/block/block.utils';

describe('Block Utils', () => {
  it('should return a random timestamp within the last 60 days for 100 calls', () => {
    for (let i = 0; i < 100; i++) {
      const timestamp = randomDateWithinLast60Days();
      const now = new Date().getTime();
      const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000;
      expect(timestamp).toBeGreaterThanOrEqual(sixtyDaysAgo);
      expect(timestamp).toBeLessThanOrEqual(now);
    }
  });

  it('should return an end timestamp with a duration between 15 minutes and 10 hours, rounded to the nearest 15 minutes for 100 calls', () => {
    for (let i = 0; i < 100; i++) {
      const start = new Date().getTime();
      const end = adjustEndTimestamp(start);

      const minDuration = 15 * 60 * 1000;
      const maxDuration = 10 * 60 * 60 * 1000;
      const duration = end - start;

      expect(duration).toBeGreaterThanOrEqual(minDuration);
      expect(duration).toBeLessThanOrEqual(maxDuration);
      expect(duration % (15 * 60 * 1000)).toBe(0);
    }
  });

  it('should return a random break length between 0 and the given duration, rounded to the nearest minute for 100 calls', () => {
    for (let i = 0; i < 100; i++) {
      const duration = 2 * 60 * 60 * 1000; // 2 hours
      const breakLength = randomBreakLength(duration);

      expect(breakLength).toBeGreaterThanOrEqual(0);
      expect(breakLength).toBeLessThanOrEqual(duration);
      expect(breakLength % (60 * 1000)).toBe(0);
    }
  });
});
