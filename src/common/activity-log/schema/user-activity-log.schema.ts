import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Log } from "./activity-log.schema";

export type UserActivityLogDocument = UserActivityLog & Document;

@Schema()
export class UserActivityLog extends Log {
}

export const UserActivityLogSchema = SchemaFactory.createForClass(UserActivityLog);
