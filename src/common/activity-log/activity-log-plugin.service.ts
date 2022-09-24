import { log } from 'console';
import { CreateLogInput } from './dto/create-activity-log.input';

export class ActivityLogPluginService {
  activityLogPlugin(activityLogService) {
    const createActivityLogDto: CreateLogInput = {
      current: {},
      previous: {},
      model: '',
    };
    return (schema) => {
      schema.pre('save', (next) => {
        next();
      });
      schema.post('save', async (doc) => {
        createActivityLogDto.current = doc;
        createActivityLogDto.model = doc.constructor.modelName;
        await activityLogService.createActivityLog(createActivityLogDto);
      });
      //=> UPDATE
      schema.pre('findOneAndUpdate', async function (next) {
        createActivityLogDto.model = this.model.modelName;
        createActivityLogDto.previous = await this.model
          .findOne(this.getQuery())
          .select({ __v: 0 })
          .lean();
        next();
      });
      schema.post('findOneAndUpdate', async (doc) => {
        // data.documentId = doc._id;
        createActivityLogDto.current = doc;
        console.log('-------> ', createActivityLogDto);
        await activityLogService.createActivityLog(createActivityLogDto);
      });
    };
  }
}
