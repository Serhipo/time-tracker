import { Block, BlockModel } from './block.model';
import {
  adjustEndTimestamp,
  randomBreakLength,
  randomDateWithinLast60Days,
} from './block.utils';

export default class BlockController {
  /**
   * createBlocks - Creates an array of BlockModels and saves them to the database
   * @param userId - The ID of the user for whom the blocks are created
   * @param count - The number of blocks to create (default is 100)
   * @returns An array of BlockModels that have been saved to the database
   */
  public static async createBlocks(
    userId: string,
    count = 100,
  ): Promise<BlockModel[]> {
    const blocks: BlockModel[] = [];
    // Generate "count" number of BlockModels
    for (let i = 0; i < count; i++) {
      // Generate a random start date within the last 60 days
      const start = randomDateWithinLast60Days();
      const end = adjustEndTimestamp(start);
      const breakLength = randomBreakLength(end - start);

      const block: BlockModel = new Block({
        userId,
        start,
        end,
        breakLength,
      });

      blocks.push(block);
    }
    // Save all of the generated BlockModels to the database
    const savedBlocks = await Block.insertMany(blocks);
    return savedBlocks;
  }
}
