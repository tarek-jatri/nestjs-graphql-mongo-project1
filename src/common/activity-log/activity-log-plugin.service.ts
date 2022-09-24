import { CreateLogInput } from './dto/create-activity-log.input';

export class ActivityLogPluginService {
  activityLogPlugin(activityLogService) {
    const createActivityLogDto: CreateLogInput = {
      current: {},
      previous: {},
    };
    return (schema) => {
      schema.pre('save', (next) => {
        next();
      });
      schema.post('save', async (doc) => {
        createActivityLogDto.current = doc;
        await activityLogService.createActivityLog(createActivityLogDto);
      });
      //=> UPDATE
      schema.pre('findOneAndUpdate', async function (next) {
        createActivityLogDto.previous = await this.model
          .findOne(this.getQuery())
          .select({ __v: 0 })
          .lean();
        next();
      });
      schema.post('findOneAndUpdate', async (doc) => {
        // data.documentId = doc._id;
        createActivityLogDto.current = doc;
        await activityLogService.createActivityLog(createActivityLogDto);
      });
    };
  }
}
