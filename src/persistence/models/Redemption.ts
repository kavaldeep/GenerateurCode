import mongoose, { Schema, Document } from "mongoose";

export type OptionalIRedemption = Partial<IRedemption>;

export interface IRedemption {
	_id: mongoose.Types.ObjectId;
	voucher_id?: string;
	reward_id?: string;
	object: "redemption";
	type: "DISCOUNT" | "GIFT" | "LOYALTY" | "REWARD"; 
	date: Date;
	customer_id: string | null;
	tracking_id: string | null;
	gift: {
		amount: number;
	};
	order_id: string | null;
	metadata: Record<string, unknown>;
	result: "SUCCESS" | "FAILED";
	failure_reason: string | null;
	version: number | 0 ;
}

export const redemptionSchema: Schema = new Schema({
	_id: { type: mongoose.Types.ObjectId, required: true , default: new mongoose.Types.ObjectId() },
    voucher_id: { type: String , required: false ,  default: "null" },
	object : { type: String , enum : [ 'redemption' ] , default: "redemption"  },
    type: { type: String , enum : [ 'DISCOUNT', 'GIFT' , "LOYALTY" , "REWARD"] , required: true },
    date: { type: Date , required: true },
    customer_id: { type: String , default: null },
    tracking_id: { type: String , default: null },
    gift: {
        amount: { type: Number , required: true },
    },
    order_id: { type: String , default: null },
    metadata: { type: Object , default: {} },
    result: { type: String , enum : [ 'SUCCESS', 'FAILED' ] , required: true },
    failure_reason: { type: String , default: null },
	version: { type: Number , default: 0 },
});

export const RedemptionModel = mongoose.model<IRedemption>(
	"Redemption",
	redemptionSchema
);
