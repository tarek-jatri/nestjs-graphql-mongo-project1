import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import * as contextService from "request-context";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class ActivityLogGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    contextService.set("request:activityLog", ctx.getContext().req);
    return ctx.getContext().req;
  }
}