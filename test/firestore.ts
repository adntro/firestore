import {Firestore} from '@google-cloud/firestore';
import * as assert from 'assert';
import {BatchInsertResult, batchInsert} from '../src';

const db = new Firestore();

describe('Firestore Utils', () => {
  it('assert true', () => {
    assert(true);
  });
  it('Fails without data', async () => {
    const r = await batchInsert(db, []);
    assert.deepStrictEqual(r, {
      inserted: 0,
      iterations: 0,
    } as BatchInsertResult);
  });
});
