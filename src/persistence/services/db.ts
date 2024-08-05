import { Observable } from "rxjs";
import mongoose, { connect, Connection, model, Schema, Document } from 'mongoose';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


//export const MONGODB = "mongodb://mongo1:27017/vouchers?directConnection=true&serverSelectionTimeoutMS=2000";
const COLLECTION_NAME = 'vouchers';

const argv = yargs(hideBin(process.argv)).option('dbUri' , {
  alias : 'd' , 
  description : "The mongodb database uri",
  type : 'string',
  default : "mongodb://mongo1:27017/vouchers?directConnection=true&serverSelectionTimeoutMS=2000"
}).help().alias('help' , 'h').parseSync();

const MONGODB_URI = argv.dbUri as string;

console.log("MONGODB_URI: ", MONGODB_URI);
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