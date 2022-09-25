import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "../../../user/user.schema";

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({ required: true })
  model: string;
  @Prop({ required: true })
  action: string;
  @Prop({ required: true })
  operationName: string;
  @Prop({ required: true })
  query: string;
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  documentId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  requestedBy: string;
  @Prop({ type: Object, required: true })
  difference: object;
}

export const LogSchema = SchemaFactory.createForClass(Log);
