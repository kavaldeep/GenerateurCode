import mongoose, { Schema, Document, ObjectId } from "mongoose";

/**
 * Added the voucher object later to the campaign object
 */
export interface ICampaign {
  _id: mongoose.Types.ObjectId;
  name: string;
  object: string;
  type: "STATIC" | "AUTO_UPDATE";
  description: string | null;
  active: boolean;
  vouchers : string[];
  voucher_count : number;
  creation_date : Date;
  validation_rules_assignments : null;
  vouchers_generation_status : null;
  metadata: Record<string, unknown>;
  
}

export type OptionalICampaign = Partial<ICampaign>;

const campaignSchema: Schema = new Schema({
  name: { type: String, required: true },
	object: { type: String, required: true },
	type: { type: String, required: true },
	description: { type: String, default: null },
	active: { type: Boolean, required: true },
  vouchers: { type: Array, default: [] },
	voucher_count: {type : Number , required : true},
  creation_date: { type: Date, default: Date.now },
  validation_rules_assignments: { type: Object, default: null },
  vouchers_generation_status: { type: Object, default: null },
  metadata: { type: Object, default: {} },
});

export const CampaignModel = mongoose.model<ICampaign>("Campaign", campaignSchema);
