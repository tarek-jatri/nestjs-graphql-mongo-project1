import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Log, LogDocument } from "./schema/activity-log.schema";
import { Model } from "mongoose";
import { CreateLogInput } from "./dto/create-activity-log.input";
import { detailedDiff } from "deep-object-diff";
import { UserActivityLog, UserActivityLogDocument } from "./schema/user-activity-log.schema";

@Injectable()
export class ActivityLogService {
  private models: object = {};

  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
    @InjectModel(UserActivityLog.name) private userActivityLogModel: Model<UserActivityLogDocument>
  ) {
    this.models[`${Log.name}`] = logModel;
    this.models[`${UserActivityLog.name.split("ActivityLog")[0]}`] = userActivityLogModel;
  }

  async createActivityLog(createActivityLogDto: CreateLogInput) {
    let { current, previous, model, action, operationName, query, documentId, requestedBy } = createActivityLogDto;

    // let { __v, createdAt, updatedAt, ...current } = current;
    // let { __v, createdAt, updatedAt, ...previous } = previous;

    // @ts-ignore
    delete current.__v;
    // @ts-ignore
    delete previous.__v;
    // @ts-ignore
    delete current.createdAt;
    // @ts-ignore
    delete previous.createdAt;
    // @ts-ignore
    delete current.updatedAt;
    // @ts-ignore
    delete previous.updatedAt;

    current = JSON.parse(JSON.stringify(current));
    previous = JSON.parse(JSON.stringify(previous));

    const before = detailedDiff(current, previous);
    const after = detailedDiff(previous, current);
    if (
      (// @ts-ignore
        Object.keys(after.added).length ||
        // @ts-ignore
        Object.keys(after.deleted).length ||
        // @ts-ignore
        Object.keys(after.updated).length
      ) && this.models[`${model}`]
    ) {
      const activityLog = new this.models[`${model}`]({
        model,
        action,
        operationName,
        query,
        documentId,
        requestedBy,
        difference: {
          before,
          after
        }
      });
      return await activityLog.save();
    }
  }
}
