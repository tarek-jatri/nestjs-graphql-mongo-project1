import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../user/user.schema";

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  userId: string;
  @Prop({ required: true })
  dateTime: Date;
  @Prop({ required: true })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
