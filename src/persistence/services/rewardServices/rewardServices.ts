import mongoose  from "mongoose";
import { IRedemption , RedemptionModel } from "../../models/Redemption";
import { CustomerModel, ICustomer } from "../../models/Customers";
import  RewardModel , {  IReward } from "../../models/Rewards";
import validateRewardServices, { IValidRewardResponse } from "./validateRewardServices";



export  class RedeemRewardServices {

    public redeemReward( redemption : IRedemption , customer : ICustomer , reward : IReward){

        return new Promise<boolean>(async (resolve, reject) => {
            const session = await  mongoose.startSession();
            console.log("Redeeming reward");
            session.startTransaction();
            try {
                new RedemptionModel(redemption).save({session : session  }).
                then((redemption : IRedemption) => {
                    CustomerModel.findByIdAndUpdate(customer._id , { $push : { summary : redemption} , $inc : { loyalty : -redemption.gift.amount }}, {session : session , new : true})
                    .then((customer : ICustomer | null) => {
                        if(!customer){
                            session.abortTransaction();
                            session.endSession();
                            console.log("Error redeeming reward session aborted because no customer "  );
                            reject("Error redeeming reward session aborted because no customer");
                        }else{
                            
                            RewardModel.findByIdAndUpdate(reward._id , { $inc : { stock : -1 } , $push : { redemption}}, {session : session , new : true})
                            .then((reward : IReward | null) => {
                                if(!reward){
                                    session.abortTransaction();
                                    session.endSession();
                                    console.log("Error redeeming reward session aborted because no reward "  );
                                    reject("Error redeeming reward session aborted because no reward");
                                }else{
                                    session.commitTransaction();
                                    resolve(true);
                                }
                            })
                            .catch((error : any) => {
                                session.abortTransaction();
                                session.endSession();
                                console.log("Error redeeming reward session aborted" , error);
                                reject(error);
                            })
                        }
                    }).catch((error : any) => {
                        session.abortTransaction();
                        session.endSession();
                        console.log("Error redeeming reward session aborted" , error);
                        reject(error);
                    });
                }).catch((error : any) => {
                    session.abortTransaction();
                    session.endSession();
                    console.log("Error redeeming reward session aborted" , error);
                    reject(error);

                });
            }catch(error : any){
                session.abortTransaction();
                console.log("Error redeeming reward session aborted" , error);
                session.endSession();
                resolve(false)
            }
        });
    }


    public redeemRewardPromise(
        reward_id : string,
        customer_id : string
    ) : Promise<boolean>{
        return new Promise<boolean >((resolve, reject) => {
            console.log("lets go redeem reward");
            validateRewardServices.validateReward(reward_id , customer_id , validateRewardServices.validateRewardRules)
            .then(( response : IValidRewardResponse )  => {
                 if(response.isValid && (response.customer !== undefined)  && ( response.reward !== undefined)) 
                { 
                        redeemRewardServices.redeemReward(
                        this.redeemify(response.reward , response.customer),
                        response.customer ,
                        response.reward
                        ).then((result : boolean) => {
                            resolve(result);
                        }).catch((error : any) => {
                            reject(false);
                        }
                        );
                }else{
                    console.log("the code is not valid")
                    reject(false);
                }  
            }).catch((error : any) => {
                reject(error);
            })
        });
    }

    public redeemify( reward : IReward , customer : ICustomer) : IRedemption{
        return {
            _id : new mongoose.Types.ObjectId(),
            reward_id : reward._id.toString(),
            object : "redemption",
            type : "REWARD",
            date : new Date(),
            customer_id : customer._id.toString(),
            tracking_id : null,
            gift : {
                amount : reward.parameters.amount,
            },
            order_id : null,
            metadata : {},
            result : "SUCCESS",
            failure_reason : null,
            version : 0
        };
    }
}


const redeemRewardServices = new RedeemRewardServices();




export default redeemRewardServices;