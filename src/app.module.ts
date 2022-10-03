import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { config } from './config';
import { ActivityLogModule } from './common/activity-log/activity-log.module';
import { ActivityLogService } from './common/activity-log/activity-log.service';
import { ActivityLogPluginService } from './common/activity-log/activity-log-plugin.service';

@Module({
  imports: [
    ActivityLogModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ActivityLogModule],
      inject: [ActivityLogService, ActivityLogPluginService],
      useFactory: (
        activityLogService: ActivityLogService,
        activityLogPluginService: ActivityLogPluginService,
      ) => ({
        uri: 'mongodb://localhost/nest',
        connectionFactory: (connection) => {
          connection.plugin(
            activityLogPluginService.activityLogPlugin(activityLogService),
          );
          return connection;
        },
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    AttendanceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
