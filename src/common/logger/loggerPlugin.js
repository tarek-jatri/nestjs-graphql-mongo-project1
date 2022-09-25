const contextService = require('request-context');
const logger = require("./logger")
let previous, current, data = {};

const plugin = function (schema) {
    //=> CREATE
    schema.pre('save', async function (next, previousData) {
        const req = contextService.get('request.req');
        if (!previousData?.save) {
            data = {
                method: req.method,
                action: "CREATE",
                ip: req.ip,
                apiUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
                requestedBy: req.user._id,
            }
        }
        if (this.isNew && !previousData?.save) {
            previous = {};
        } else {
            previous = previousData;
            data.action = "UPDATE"
        }
        next();
    });
    schema.post('save', doc => {
        data.model = doc.constructor.modelName;
        data.documentId = doc._id;
        current = doc.toObject({transform: false});
        if (!previous?.save) {
            logger({
                current,
                previous,
                ...data
            });
        }
    });

    //=> UPDATE
    schema.pre('findOneAndUpdate', async function (next) {
        const req = contextService.get('request.req');
        data = {
            method: req.method,
            action: "UPDATE",
            ip: req.ip,
            apiUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            requestedBy: req.user?._id,
            model: this.model.modelName,
        }
        previous = await this.model.findOne(this.getQuery()).select({__v: 0}).lean();
        next()
    });
    schema.post('findOneAndUpdate', doc => {
        data.documentId = doc._id;
        current = doc;
        logger({
            current,
            previous,
            ...data
        });

    });

    //=> DELETE
    // findOneAndDelete
    schema.pre('findOneAndDelete', async function (next) {
        const req = contextService.get('request.req');
        data = {
            method: req.method,
            action: "DELETE",
            ip: req.ip,
            apiUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            requestedBy: req.user._id,
            model: this.model.modelName,
        }
        previous = await this.model.findOne(this.getQuery()).select({__v: 0}).lean();
        next()
    });
    schema.post('findOneAndDelete', doc => {
        data.documentId = doc._id;
        logger({
            current: {},
            previous,
            ...data
        });
    });

    // findByIdAndRemove
    schema.pre('findOneAndRemove', async function (next) {
        const req = contextService.get('request.req');
        data = {
            method: req.method,
            action: "DELETE",
            ip: req.ip,
            apiUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            requestedBy: req.user._id,
            model: this.model.modelName,
        }
        previous = await this.model.findOne(this.getQuery()).select({__v: 0}).lean();
        next()
    });
    schema.post('findOneAndRemove', doc => {
        data.documentId = doc._id;
        logger({
            current: {},
            previous,
            ...data
        });
    });
}

module.exports = plugin