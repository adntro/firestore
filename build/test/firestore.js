"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@google-cloud/firestore");
const assert = require("assert");
const src_1 = require("../src");
const db = new firestore_1.Firestore();
describe('Firestore Utils', () => {
    it('assert true', () => {
        assert(true);
    });
    it('Fails without data', async () => {
        const r = await src_1.batchInsert(db, []);
        assert.deepStrictEqual(r, {
            inserted: 0,
            iterations: 0,
        });
    });
});
//# sourceMappingURL=firestore.js.map