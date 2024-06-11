import { ClientSession } from "mongoose";
import { PublishModel , IPublish } from "../models/Publish";
import { from, Observable } from "rxjs";
import { VoucherModel } from "../models/Voucher";


interface PublishRepository {
    test(): Observable<string>;
    addPublishObserver(publish: IPublish , session ?:  ClientSession): Observable<IPublish | null>;
}


export const PublishRepository: PublishRepository = {
    test: () => from(["Hello World"]),
    addPublishObserver: (publish: IPublish , session ?: ClientSession): Observable<IPublish | null> =>{
      return from(new PublishModel(publish).save({session : session}))
    }
     
};