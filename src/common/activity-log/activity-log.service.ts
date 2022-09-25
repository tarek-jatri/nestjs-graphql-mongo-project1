import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from './activity-log.schema';
import { Model } from 'mongoose';
import { CreateLogInput } from './dto/create-activity-log.input';
import { detailedDiff } from 'deep-object-diff';

@Injectable()
export class ActivityLogService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async createActivityLog(createActivityLogDto: CreateLogInput) {
    let { current, previous, model } = createActivityLogDto;
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
      // @ts-ignore
      Object.keys(after.added).length ||
      // @ts-ignore
      Object.keys(after.deleted).length ||
      // @ts-ignore
      Object.keys(after.updated).length
    ) {
      const activityLog = new this.logModel({
        difference: {
          before,
          after,
        },
        model,
      });
      return await activityLog.save();
    }
  }
}
