import {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: { collection: 'Block' },
  options: { allowMixed: Severity.ALLOW },
})
export class BlockClass extends TimeStamps {
  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public start!: number;

  @prop({ required: true })
  public end!: number;

  @prop({ required: true })
  public breakLength!: number;
}

export type BlockModel = DocumentType<BlockClass>;

export const Block = getModelForClass(BlockClass);
