import { CreateLogInput } from "./dto/create-activity-log.input";
import * as contextService from "request-context";

export class ActivityLogPluginService {
  activityLogPlugin(activityLogService) {
    const createActivityLogDto: CreateLogInput = {
      model: "",
      action: "",
      operationName: "",
      query: "",
      documentId: "",
      requestedBy: "",
      previous: {},
      current: {}
    };
    return (schema) => {
      //=> CREATE
      schema.pre("save", function(next) {
        const gqlCtx = contextService.get("request:activityLog").body;
        createActivityLogDto.action = "CREATE";
        createActivityLogDto.operationName = gqlCtx.operationName;
        createActivityLogDto.query = gqlCtx.query;
        createActivityLogDto.requestedBy = gqlCtx.req?.user._id ? gqlCtx.req.user._id : undefined;
        next();
      });
      schema.post("save", async (doc) => {
        createActivityLogDto.documentId = doc._id;
        createActivityLogDto.current = doc;
        createActivityLogDto.model = doc.constructor.modelName;
        await activityLogService.createActivityLog(createActivityLogDto);
      });


      //=> UPDATE
      schema.pre("findOneAndUpdate", async function(next) {
        const gqlCtx = contextService.get("request:activityLog").body;
        createActivityLogDto.action = "UPDATE";
        createActivityLogDto.operationName = gqlCtx.operationName;
        createActivityLogDto.query = gqlCtx.query;
        createActivityLogDto.requestedBy = gqlCtx.req?.user._id ? gqlCtx.req.user._id : undefined;
        createActivityLogDto.model = this.model.modelName;
        createActivityLogDto.previous = await this.model
          .findOne(this.getQuery())
          .select({ __v: 0 })
          .lean();
        next();
      });
      schema.post("findOneAndUpdate", async (doc) => {
        createActivityLogDto.documentId = doc._id;
        createActivityLogDto.current = doc;
        await activityLogService.createActivityLog(createActivityLogDto);
      });

      //=> DELETE
      // findOneAndDelete
      schema.pre("findOneAndDelete", async function(next) {
        const gqlCtx = contextService.get("request:activityLog").body;
        createActivityLogDto.action = "DELETE";
        createActivityLogDto.operationName = gqlCtx.operationName;
        createActivityLogDto.query = gqlCtx.query;
        createActivityLogDto.requestedBy = gqlCtx.req?.user._id ? gqlCtx.req.user._id : undefined;
        createActivityLogDto.model = this.model.modelName;
        createActivityLogDto.previous = await this.model
          .findOne(this.getQuery())
          .select({ __v: 0 })
          .lean();
        next();
      });
      schema.post("findOneAndDelete", async (doc) => {
        createActivityLogDto.documentId = doc._id;
        await activityLogService.createActivityLog(createActivityLogDto);
      });

      // findByIdAndRemove
      schema.pre("findOneAndRemove", async function(next) {
        const gqlCtx = contextService.get("request:activityLog").body;
        createActivityLogDto.action = "DELETE";
        createActivityLogDto.operationName = gqlCtx.operationName;
        createActivityLogDto.query = gqlCtx.query;
        createActivityLogDto.requestedBy = gqlCtx.req?.user._id ? gqlCtx.req.user._id : undefined;
        createActivityLogDto.model = this.model.modelName;
        createActivityLogDto.previous = await this.model
          .findOne(this.getQuery())
          .select({ __v: 0 })
          .lean();
        next();
      });
      schema.post("findOneAndRemove", async (doc) => {
        createActivityLogDto.documentId = doc._id;
        await activityLogService.createActivityLog(createActivityLogDto);
      });
    };
  }
}
