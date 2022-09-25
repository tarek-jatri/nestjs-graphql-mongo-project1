const {detailedDiff} = require("deep-object-diff");
const Log = require("../../models/Logger");

async function logger({current, previous, method, action, ip, apiUrl, model, documentId, requestedBy}) {
    try {
        // console.log(current, previous, method, action, ip, apiUrl, model, documentId)

        // console.log("current: ", current, "\nprevious: ", previous)

        delete current.__v;
        delete previous.__v;
        delete current.createdAt;
        delete previous.createdAt;
        delete current.updatedAt;
        delete previous.updatedAt;


        current = JSON.parse(JSON.stringify(current));
        previous = JSON.parse(JSON.stringify(previous));

        const before = detailedDiff(current, previous);
        const after = detailedDiff(previous, current);


        // console.log(before, after);

        if (Object.keys(after.added).length || Object.keys(after.deleted).length || Object.keys(after.updated).length) {
            const data = new Log({
                method,
                action,
                model,
                documentId,
                requestedBy,
                ip,
                apiUrl,
                diff: {
                    before: Object.keys(previous).length === 0 ? null : before,
                    after: Object.keys(current).length === 0 ? null : after,
                }
            });
            await data.save();
        }
    } catch {
    }
}

module.exports = logger;