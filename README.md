# PormotionEngine
This is a MYC private repos



A urgent problem the need to be resolved 
Error updating campaign MongoServerError: Plan executor error during findAndModify :: caused by :: WriteConflict error: this operation conflicted with another operation. Please retry your operation or multi-document transaction.


Error updating campaign MongoServerError: Plan executor error during findAndModify :: caused by :: WriteConflict error: this operation conflicted with another operation. Please retry your operation or multi-document transaction.
    at Connection.onMessage (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\cmap\connection.ts:393:20)
    at MessageStream.<anonymous> (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\cmap\connection.ts:224:56)
    at MessageStream.emit (node:events:527:28)
    at MessageStream.emit (node:domain:475:12)
    at processIncomingData (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\cmap\message_stream.ts:189:12)
    at MessageStream._write (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\cmap\message_stream.ts:70:5)
    at writeOrBuffer (node:internal/streams/writable:390:12)
    at _write (node:internal/streams/writable:331:10)
    at MessageStream.Writable.write (node:internal/streams/writable:335:10)
    at TLSSocket.ondata (node:internal/streams/readable:766:22) {
  ok: 0,
  code: 112,
  codeName: 'WriteConflict',
  '$clusterTime': {
    clusterTime: new Timestamp({ t: 1684311431, i: 6 }),
    signature: {
      hash: new Binary(Buffer.from("08e17e52e262087d7f7853acd59ac3e708694a25", "hex"), 0),
      keyId: new Long("7168840629420556291")
    }
  },
  operationTime: new Timestamp({ t: 1684311431, i: 6 }),
  [Symbol(errorLabels)]: Set(1) { 'TransientTransactionError' }
}
Error is  MongoServerError: Plan executor error during findAndModify :: caused by :: WriteConflict error: this operation conflicted with another operation. Please retry your operation or multi-document transaction.
    at Connection.onMessage (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\cmap\connection.ts:393:20)
    at MessageStream.<anonymous> (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\cmap\connection.ts:224:56)
    at MessageStream.emit (node:events:527:28)
    at MessageStream.emit (node:domain:475:12)
    at processIncomingData (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\cmap\message_stream.ts:189:12)
    at MessageStream._write (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\cmap\message_stream.ts:70:5)
    at writeOrBuffer (node:internal/streams/writable:390:12)
    at _write (node:internal/streams/writable:331:10)
    at MessageStream.Writable.write (node:internal/streams/writable:335:10)
    at TLSSocket.ondata (node:internal/streams/readable:766:22) {
  ok: 0,
  code: 112,
  codeName: 'WriteConflict',
  '$clusterTime': {
    clusterTime: new Timestamp({ t: 1684311431, i: 6 }),
    signature: {
      hash: new Binary(Buffer.from("08e17e52e262087d7f7853acd59ac3e708694a25", "hex"), 0),
      keyId: new Long("7168840629420556291")
    }
  },
  operationTime: new Timestamp({ t: 1684311431, i: 6 }),
  [Symbol(errorLabels)]: Set(1) { 'TransientTransactionError' }
}
C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\transactions.ts:168
    throw new MongoRuntimeError(
          ^
MongoRuntimeError: Attempted illegal state transition from [TRANSACTION_ABORTED] to [TRANSACTION_ABORTED]
    at Transaction.transition (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\transactions.ts:168:11)
    at commandHandler (C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\sessions.ts:714:27)
    at C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\sessions.ts:784:7
    at C:\Users\skava\Documents\myc\PormotionEngine\node_modules\mongodb\src\utils.ts:389:14
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  [Symbol(errorLabels)]: Set(0) {}
}