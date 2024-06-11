import  { Schema   , Model} from "mongoose";
import { IVoucher , VoucherModel } from "../Voucher";


const loyaltyVoucherSchema : Schema = new Schema({
       currency : {type : String , default : "points"},
});


export interface ILoyaltyVoucher extends IVoucher {
    currency : string;
}


export const LoyaltyVoucherModel : Model<ILoyaltyVoucher> = VoucherModel.discriminator<ILoyaltyVoucher>("loyalty", loyaltyVoucherSchema);