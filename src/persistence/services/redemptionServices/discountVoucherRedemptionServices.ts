import mongoose from "mongoose";
import { IDiscountVoucher } from "../../models/voucherModels/DiscountVoucher";
import { IRedemption } from "../../models/Redemption";
import { RedemptionServices } from "./RedemptionServices";
import { ValidateDiscountVoucherService } from "../validateServices/validateDIscountVoucherService";
import { connectToDatabase } from "../db";


export default class DiscountVoucherRedemptionServices extends RedemptionServices {


    public redeem = (discountVoucherCode : string , customer_id : string , amount ?: number) => {

        var validateDiscount = new ValidateDiscountVoucherService();

        validateDiscount.validatePromise(discountVoucherCode , customer_id , amount).then((result) => {
            if(result.isValid && result.voucher &&  result.customer) {
                this.redeemObject(result.voucher , result.customer , this.getRedemption(result.voucher as IDiscountVoucher, result.customer._id.toString() , amount))    
            }else{
                console.log("The voucher is not valid " + result.failureReason);
            }
        }).catch((err) => {
            console.log("The error is " + err);
        });
    }


    private getRedemption( reedemObject : IDiscountVoucher , customer_id : string , amount ?: number) : IRedemption{
		  return {
					_id: new mongoose.Types.ObjectId(),
					object: "redemption",
					voucher_id: reedemObject._id.toString(),
					type: "DISCOUNT",
					date: new Date(),
					customer_id: customer_id,
					gift: {
						amount: amount ? amount : reedemObject.amount,
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


 connectToDatabase().subscribe({
  next: () => {
     console.log("Connected to database");
     var discountVoucherRedemptionServices = new DiscountVoucherRedemptionServices();
    discountVoucherRedemptionServices.redeem("aS9ieTjDII3Mtry7" , "6475e410cc82355f2e4aed4f" ,  30 );

  }
})