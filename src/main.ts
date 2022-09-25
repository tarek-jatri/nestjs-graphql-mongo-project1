import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as contextService from "request-context";
import { ActivityLogGuard } from "./common/activity-log/guards/activity-log.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new ActivityLogGuard());
  app.use(contextService.middleware("request"));
  await app.listen(3001);
}

bootstrap();
