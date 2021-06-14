"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betchGet = exports.batchInsert = void 0;
async function batchInsert(db, data) {
    // Validation
    const paths = [];
    if (data.length === 0) {
        return { iterations: 0, inserted: 0 };
    }
    data.forEach(item => {
        const path = item.docPath;
        if (!path || ('' + path).trim().length === 0) {
            throw new Error('Invalid empty or undefined path');
        }
        if (paths.indexOf(path) > -1) {
            throw new Error('Duplicated path ' + path);
        }
        paths.push(path);
        if (!item.data) {
            throw new Error('Invalid data for path ' + path);
        }
    });
    // Write
    let batch = db.batch();
    let iterations = 0;
    for (let idx = 0; idx < data.length; idx++) {
        const item = data[idx];
        batch.set(db.doc(item.docPath), item.data, { merge: true });
        if (idx > 0 && idx % 450 === 0) {
            await batch.commit();
            batch = db.batch();
            iterations++;
        }
    }
    await batch.commit();
    iterations++;
    return {
        inserted: data.length,
        iterations,
    };
}
exports.batchInsert = batchInsert;
async function betchGet(db, docPaths) {
    const docRefs = docPaths.map(path => db.doc(path));
    const res = await db.getAll(...docRefs);
    return res;
}
exports.betchGet = betchGet;
//# sourceMappingURL=index.js.map