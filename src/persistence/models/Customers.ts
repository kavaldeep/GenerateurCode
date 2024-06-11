import mongoose, { Schema,   } from "mongoose";
import { IRedemption , redemptionSchema } from "./Redemption";

export type OptionalICustomer = Partial<ICustomer>;

export interface ICustomer{
    _id: mongoose.Types.ObjectId;
    object: "customer";
    source_id: string;
    name: string;
    email: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
    //TODO repalce by there shitty object
    loyalty : number | 0;
    summary:  IRedemption[]  ;
    metadata: Record<string, unknown>;
}


const customerSchema: Schema = new Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		default: new mongoose.Types.ObjectId(),
	},
	name: { type: String, required: true },
	source_id: { type: String, required: false },
	email: { type: String, required: false },
	phone: { type: String, required: false },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	loyalty: { type: Number, default: 0 },
	summary: { type: Array, default: [] },
	metadata: { type: Object, default: {} },
});

export const CustomerModel = mongoose.model<ICustomer>("Customer", customerSchema);
