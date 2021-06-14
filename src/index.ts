import {Firestore, DocumentSnapshot} from '@google-cloud/firestore';

export interface BatchItem {
  docPath: string;
  data: any;
}

export interface BatchInsertResult {
  inserted: number;
  iterations: number;
}

export async function batchInsert(
  db: Firestore,
  data: BatchItem[]
): Promise<BatchInsertResult> {
  // Validation
  const paths: string[] = [];
  if (data.length === 0) {
    return {iterations: 0, inserted: 0};
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
    batch.set(db.doc(item.docPath), item.data, {merge: true});
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

export async function betchGet(
  db: Firestore,
  docPaths: string[]
): Promise<DocumentSnapshot[]> {
  const docRefs = docPaths.map(path => db.doc(path));
  const res = await db.getAll(...docRefs);
  return res;
}
