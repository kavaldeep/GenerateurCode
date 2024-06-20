import { Observable } from "rxjs";
import mongoose, { connect, Connection, model, Schema, Document } from 'mongoose';


//export const MONGODB_URI = "mongodb://localhost:27017/vouchers";
export const MONGODB_URI = "mongodb://localhost:27017/vouchers?directConnection=true&serverSelectionTimeoutMS=2000";
const COLLECTION_NAME = 'vouchers';

export const connectToDatabase = (): Observable<Connection> => {
  return new Observable<Connection>((observer) => {
    connect(MONGODB_URI)
    .then((connection) => {
        observer.next(connection.connection);
    })
    .catch((error) => {
        observer.error(error);
    })
    .finally(() => {
        observer.complete();
    });
  });
};

export const disconnectFromDatabase = () => {
  mongoose.disconnect().then(r => {
      console.log(r);
  });
}


/*
// Example of usage
connectToDatabase().subscribe({
    next: async (connection) => {
        const myCollection = connection.db.collection(COLLECTION_NAME);
        const result = await myCollection.find().toArray();
        console.log(result);
    },
});
*/