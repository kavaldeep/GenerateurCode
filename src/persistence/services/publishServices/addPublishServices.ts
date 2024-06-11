import mongoose from "mongoose";
import { VoucherRepository } from "../../repositories/voucherRepos";
import { IVoucher } from "../../models/Voucher";
import  { IPublish , PublishModel, channelTypes } from "../../models/Publish";
import { connectToDatabase } from "../db";
import { PublishRepository } from "../../repositories/publishRepost";


interface IResponse {
    isPublished : boolean ,
    voucher : IVoucher
    publish : IPublish
}

interface IPublishInfos{
    channel : channelTypes ,
    customer_id?:string  ,
    mail ?: string ,
    web ?: string
}

/**
 * when a voucher is published it should be 
 * voucher collection , publish collection
 * and customer collection if neccecary
 */
export class PublishServices{

    public addPublish(voucher : IVoucher , publish  : IPublish) : Promise<IResponse>{
        return new Promise<IResponse>( async (resolve , reject) => {
            const session = await mongoose.startSession();
            session.startTransaction();
            try{
                console.log("Adding publish to voucher" , publish);
                VoucherRepository.addPublish( voucher._id.toString() , publish , session).subscribe(
                    {

                        next : ( voucher ) => {
                            if(!voucher || voucher.publish_id.length >  1 ){
                                console.log("Error adding publish to voucher ");
                                if(voucher && voucher.publish_id.length > 1  ){
                                    console.log("Voucher already has a publish" );
                                }
                                session.abortTransaction();
                                reject({
                                    isPublished : false,
                                    voucher : voucher,
                                    publish : publish
                                });
                            }else{
                                PublishRepository.addPublishObserver(publish , session)
                                .subscribe({
                                    next : (publish) => {
                                        if(!publish){
                                            console.log("Error adding publish to publish collection");
                                            session.abortTransaction();
                                            reject({
                                                isPublished : false,
                                                voucher : voucher,
                                                publish : publish
                                            });
                                        }else{
                                            console.log("Publish added successfully");
                                            session.commitTransaction();
                                            resolve({
                                                isPublished : true,
                                                voucher : voucher,
                                                publish : publish
                                            });
                                        }
                                    }
                                })
                            }
                        },

                        error : (error) => {
                            console.log("Error adding publish to voucher" , error);
                        }
                    }
                )
            }
            catch(error : any){
                console.log("Error adding publish to voucher" ,error );
                session.endSession();
            }
            finally{
            }
        });
    }


    publishify(voucher : IVoucher , publishInfos ?: IPublishInfos) : IPublish{ 
    
        return {
            _id: new mongoose.Types.ObjectId(),
            voucher_id: voucher._id,
            channel: publishInfos?.channel,
            publishDate: new Date(),
            version: 0,
            mail: publishInfos?.mail,
            web: publishInfos?.web,
            published: false,
        } as unknown  as IPublish; // try to resolve this later 
    }

    public publishPromise( voucher_id : string , publishInfos  :  IPublishInfos ){
        console.log("Publishing voucher" , voucher_id , publishInfos);
        return new Promise<IResponse>(
            (resolve , reject) => {
                VoucherRepository.getVoucherById(voucher_id).subscribe(
                    {
                        next : (voucher) => {
                            if(!voucher){
                                reject(null);
                            }else{
                                this.addPublish(voucher[0] , this.publishify(voucher[0] , publishInfos))
                                .then(( response : IResponse) => {
                                    resolve({
                                        isPublished : response.isPublished,
                                        publish : response.publish,
                                        voucher : response.voucher
                                    });
                                })
                                .catch((error) => {
                                    reject(null);
                                });
                            }
                        },
                    }
                )
            }
        )
        
    }
 
}

const addPublishServices = new PublishServices();

export default addPublishServices;