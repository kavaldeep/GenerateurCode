import { Schema , Model} from "mongoose";
import { VoucherModel  , IVoucher}   from "../Voucher";


export interface IGiftVoucher extends IVoucher {
    currency : string;
    balance : number;
}

const giftVoucherSchema : Schema = new Schema({
    currency : {type : String , default : "euros"},
    balance : {type : Number , default : true } 
});


export const GiftVoucherModel : Model<IGiftVoucher> = VoucherModel.discriminator<IGiftVoucher>("gift", giftVoucherSchema);