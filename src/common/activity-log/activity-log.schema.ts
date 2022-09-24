import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({ type: Object, required: true })
  difference: object;
}

export const LogSchema = SchemaFactory.createForClass(Log);
