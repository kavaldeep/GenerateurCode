import  mongoose from "mongoose";
import { IGiftVoucher } from "../../models/voucherModels/GiftVoucher";
import { IRedemption } from "../../models/Redemption";
import {  RedemptionServices }from "./RedemptionServices";
import {  ValidateGiftVoucherSerivce  } from "../validateServices/validGiftVoucherSerivce";
import { connectToDatabase } from "../db";


export default class GiftVoucherRedemptionServices extends RedemptionServices {

    public redeem = (voucherCode : string ,  customer_id : string , amount?:number) => 
  {
    var validateGift = new ValidateGiftVoucherSerivce();
    
    validateGift.validatePromise(voucherCode, customer_id, amount).then((result ) => {
    if(result.isValid && result.voucher && result.customer ){
      this.redeemObject(result.voucher , result.customer , this.getRedemption(result.voucher as IGiftVoucher , result.customer._id.toString() , amount));
    } else {
      console.log("The result is " + result.failureReason);
    }
    }).catch((err) => {
      console.log("The error is " + err + " " ); 
    });
  }

    private getRedemption( reedemObject : IGiftVoucher , customer_id : string , amount ?: number) : IRedemption{
		  return {
					_id: new mongoose.Types.ObjectId(),
					object: "redemption",
					voucher_id: reedemObject._id.toString(),
					type: "GIFT",
					date: new Date(),
					customer_id: customer_id,
					gift: {
						amount: amount ? amount : reedemObject.balance,
					},
					result: "SUCCESS",
					failure_reason: null,
					tracking_id: null,
					order_id: null,
					version : 0 ,
					metadata: {},
				};
      }
 }

/* connectToDatabase().subscribe({
  next: () => {
     console.log("Connected to database");
     var giftVoucherRedemptionServices = new GiftVoucherRedemptionServices();
     giftVoucherRedemptionServices.redeem("dukAKdm5T8Oaztyi" , "6475e410cc82355f2e4aed4f" );

  }
}); */
