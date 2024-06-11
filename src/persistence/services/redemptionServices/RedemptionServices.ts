import { ICustomer , CustomerModel} from "../../models/Customers";
import { IRedemption, RedemptionModel } from "../../models/Redemption";
import { IVoucher, VoucherModel } from "../../models/Voucher";
import { IReward } from "../../models/Rewards";
import { ILoyaltyVoucher } from "../../models/voucherModels/LoyaltyVoucher";
import { GiftVoucherModel, IGiftVoucher } from "../../models/voucherModels/GiftVoucher";
import { DiscountVoucherModel , IDiscountVoucher } from "../../models/voucherModels/DiscountVoucher";
import mongoose, { Model } from "mongoose";
import { error } from "console";



export interface RedemptionReponse {
    redemption : IRedemption;
    reedemObject : RedeemObject;
    customer : ICustomer;

}

export type RedeemObject= IVoucher| ILoyaltyVoucher | IGiftVoucher  | IDiscountVoucher | IReward;

export class RedemptionServices {

    redeemObject = ( redeemObject : RedeemObject , customer : ICustomer , redemption : IRedemption) => {
        
    //check the name of the interface 
  
    return new Promise<RedemptionReponse>(async (resolve, reject) => { 
        var model = this.getModel(redeemObject);
        if(model){
            const session = await mongoose.startSession();
            session.startTransaction();
            const isVoucherPersist  = await model.findByIdAndUpdate(redeemObject._id ,
            { $push : {redemption : redemption } , $inc : { balance : -redemption.gift.amount  } }, {session : session , new : true})
            .then((voucher) => {
                console.log("The voucher is " + voucher);
                return true;
            }).catch((err) => {
                return false;
            });
        
            const isRedemptionPersist = await new RedemptionModel(redemption).save({session : session})
            .then((redemption) => {
                console.log("The redemption is " + redemption);
                return true;
            } )
            .catch((err) => {
              //  console.log("The error is " + err);
                return false;
            });

            const isCustomerPersist = await CustomerModel.findByIdAndUpdate(customer._id , 
                { $push : {summary : redemption } , },
                {session : session , new : true})
            .then((customer) => {
                //console.log("The customer is " + customer);
                return true;
            })
            .catch((err) => {
                // console.log("The error is " + err);
                return false;

            });
            if( isVoucherPersist && isRedemptionPersist && isCustomerPersist){
                console.log(" ALL TRANSCATION ARE SUCCESSFULL");
                session.commitTransaction();
            }else{
                session.abortTransaction();
            }
        }
        else {
            throw error("The model is not defined");
        }

    });
    }


    getModel = (redeemObject : RedeemObject) : Model<RedeemObject> | null=> {
        if("balance" in redeemObject){
            return  GiftVoucherModel as Model<RedeemObject>;

        }
        if("maxAmount" in redeemObject){
            return  DiscountVoucherModel as Model<RedeemObject>;

        }
        else return null;
    }

    
}