import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityLogService } from './activity-log.service';
import { Log, LogSchema } from './schema/activity-log.schema';
import { ActivityLogPluginService } from './activity-log-plugin.service';
import {
  UserActivityLog,
  UserActivityLogSchema,
} from './schema/user-activity-log.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest_log', {
      connectionName: 'nest_log',
    }),
    MongooseModule.forFeature(
      [
        {
          name: Log.name,
          schema: LogSchema,
        },
        {
          name: UserActivityLog.name,
          schema: UserActivityLogSchema,
        },
      ],
      'nest_log',
    ),
  ],
  providers: [ActivityLogPluginService, ActivityLogService],
  exports: [ActivityLogService, ActivityLogPluginService],
})
export class ActivityLogModule {}
