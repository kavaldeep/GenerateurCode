import mongoose, { Schema  , ObjectId } from "mongoose";
import { IRedemption  , redemptionSchema} from "./Redemption";


export interface IVoucher  {
  _id: mongoose.Types.ObjectId;
  code: string;
  campaignId: string ;
  category: string;
  type: "DISCOUNT" | "GIFT" | "LOYALTY";
  amount: number;
  start_date: Date;
  expiration_date: Date  ;
  redemption:  IRedemption[]  ;
  redemptionLimit: number;
  publish_id: [string] | [];
  active: boolean;
  additional_info: string | null;
  metadata: Record<string, unknown>;
  assets: {
    qr: {
      id: string;
      url: string;
    };
  };
  version: 0.2;
} 

export type OptionalIVoucher = Partial<IVoucher>;

const voucherSchema: Schema = new Schema({
	_id: { type: mongoose.Types.ObjectId , required: true , default : new mongoose.Types.ObjectId()},
	code: { type: String, required: true },
	campaignId: { type: String, default: null },
	category: { type: String, required: true },
  amount: { type: Number, default: 0 },
	type: { type: String , enum : [ 'DISCOUNT', 'GIFT' , "LOYALTY"] , required: true },
	start_date: { type: Date, required: true },
	expiration_date: { type: Date, default: new Date('December 31, 9999 23:59:59.999') },
	redemption:  [redemptionSchema],
  redemptionLimit: { type: Number, default: 1 },
  	publish_id: { type: [String] , default: [] },
	active: { type: Boolean, required: true },
	additional_info: { type: String, default: null },
	metadata: { type: Object, default: {} },
	assets: {
		qr: {
			id: { type: String, required: true },
			url: { type: String, required: true },
		},
	},
	version: { type: String, required: true },
});

const VoucherModel = mongoose.model<IVoucher>("Voucher", voucherSchema);

export { VoucherModel, voucherSchema };