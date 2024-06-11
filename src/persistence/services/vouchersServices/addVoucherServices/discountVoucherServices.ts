import mongoose from "mongoose";
import { IDiscountVoucher , DiscountVoucherModel } from "../../../models/voucherModels/DiscountVoucher";
import { IResponseAddVoucherServices, VoucherServices } from "../voucherServices";


export class DiscountVoucherServices extends VoucherServices{

    /**
     * Add a discount voucher to a campaign
     * @param campaignId
     * @param amount
     * @maxDiscount max discount
     * @minAmount min amount
     * @returns
     */
    public addDiscountVoucher = async (campaignId : string , amount : number , discountType : "PERCENTAGE" | "FIXED_AMOUNT" , maxDiscount : number , minAmount : number) 
                                : Promise<IResponseAddVoucherServices>=> {
   
        return new Promise<IResponseAddVoucherServices>(async (resolve , reject) => {
            this.addVoucher(this.discountVoucherify(campaignId , amount , discountType , maxDiscount , minAmount))
            .then((result : IResponseAddVoucherServices) => { resolve(result)})
            .catch((error) => { reject(error)})
        });
    }


    /**
     * Turns a camgaignId and amount into a discount voucher
     * @param campaignId Id of the campaign
     * @param amount amount point
     * @returns
     */

    public discountVoucherify = (campaignId : string , amount : number , discountType : "PERCENTAGE" | "FIXED_AMOUNT" , maxDiscount : number , minAmount : number) 
    : IDiscountVoucher => {
        var discountVoucher : IDiscountVoucher = {
            _id : new mongoose.Types.ObjectId(),
            campaignId : campaignId,
            type : "DISCOUNT",
            category : "DeveloppementCategory",
            discountType : discountType,
            maxAmount : maxDiscount,
            minAmount : minAmount,
            active : true,
            code : this.generateCode(),
            currency : "euros",
            redemption : [],
            amount : amount,
            redemptionLimit : 1,
            publish_id : [],
            expiration_date : new Date('December 31, 9999 23:59:59.999') ,
            start_date : new Date(),
            version: 0.2 ,
            assets : {
                qr :{
                    id : "test",
                    url : "test"
                }
            } ,
            additional_info : "For now we don't have any additional info",
            metadata : {
                "" : ""
            },

        }
        return discountVoucher;
    }
}

const discountVoucherServices = new DiscountVoucherServices();
export default discountVoucherServices;