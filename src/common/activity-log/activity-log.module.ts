import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityLogService } from './activity-log.service';
import { Log, LogSchema } from './activity-log.schema';
import { ActivityLogPluginService } from './activity-log-plugin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [ActivityLogPluginService, ActivityLogService],
  exports: [ActivityLogService, ActivityLogPluginService],
})
export class ActivityLogModule {}
