import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    // MongooseModule.forFeatureAsync([
    //   {
    //     imports: [ActivityLogModule],
    //     inject: [ActivityLogService, ActivityLogPluginService],
    //     name: User.name,
    //     useFactory: (
    //       activityLogService: ActivityLogService,
    //       activityLogPluginService: ActivityLogPluginService,
    //     ) => {
    //       const schema = UserSchema;
    //       // console.log(
    //       //   schema.plugin(
    //       //     activityLogPluginService.activityLogPlugin(activityLogService),
    //       //   ),
    //       // );
    //       console.log(schema);
    //       return schema;
    //     },
    //   },
    // ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
