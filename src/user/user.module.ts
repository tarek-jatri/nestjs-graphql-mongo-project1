import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import {
  ActivityLogModule,
  // ActivityLogService,
} from '../common/activity-log/activity-log.module';
import { ActivityLogService } from '../common/activity-log/activity-log.service';
import { ActivityLogPluginService } from '../common/activity-log/activity-log-plugin.service';

@Module({
  imports: [
    ActivityLogModule,
    MongooseModule.forFeatureAsync([
      {
        imports: [ActivityLogModule],
        inject: [ActivityLogService, ActivityLogPluginService],
        name: User.name,
        useFactory: (
          activityLogService: ActivityLogService,
          activityLogPluginService: ActivityLogPluginService,
        ) => {
          const schema = UserSchema;
          schema.plugin(
            activityLogPluginService.activityLogPlugin(activityLogService),
          );
          return schema;
        },
      },
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
