import { Schema , Model } from 'mongoose';
import { IVoucher , VoucherModel } from '../Voucher';



export interface IDiscountVoucher extends IVoucher {
    currency : string;
    discountType : "PERCENTAGE" | "FIXED_AMOUNT";
    maxAmount : number;
    minAmount : number;

}

 
const discountVoucherSchema : Schema = new Schema({
    currency : {type : String , default : "euros"},
    discountType : {type : String , default : "FIXED_AMOUNT"},
    maxAmount : {type : Number , default : 999999999999},
    minAmount : {type : Number , default : 0},
});




export const DiscountVoucherModel : Model<IDiscountVoucher> = VoucherModel.discriminator<IDiscountVoucher>("discount", discountVoucherSchema);