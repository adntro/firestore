import { Firestore, DocumentSnapshot } from '@google-cloud/firestore';
export interface BatchItem {
    docPath: string;
    data: any;
}
export interface BatchInsertResult {
    inserted: number;
    iterations: number;
}
export declare function batchInsert(db: Firestore, data: BatchItem[]): Promise<BatchInsertResult>;
export declare function betchGet(db: Firestore, docPaths: string[]): Promise<DocumentSnapshot[]>;
