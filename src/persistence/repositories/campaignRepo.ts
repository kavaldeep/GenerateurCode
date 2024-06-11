import { from, Observable } from "rxjs";
import {CampaignModel, ICampaign, OptionalICampaign} from "../models/Campaing";
import { IVoucher, VoucherModel } from "../models/Voucher";

export interface ICampaignCriteria {
	name?: string;
	object?: string;
	type?: "STATIC" | "AUTO_UPDATE";
	description?: string | null;
	active?: boolean;
	voucher_count? : number;
	creation_date? : Date;
}

interface CampaignRepository {
	test(): Observable<string>;
	addCampaign(campaign: ICampaign): Observable<ICampaign | null>;
	updateCampaignVoucherCampaign(
		campaignId: string,
		voucherCode: string
	): Observable<ICampaign | null>;

	// added by manu modified by kaval
	getAllCampaigns(fieldsToExclude?: string): Observable<ICampaign[]>;
	getCampaignById(
		id: string,
		fieldsToExclude?: string
	): Observable<ICampaign | null>;
	deleteCampaignById(id: string): Observable<ICampaign | null>;
	getVouchersByCampaignId(id: string): Observable<IVoucher[] | null>;
	deleteCampaignById(id: string): Observable<ICampaign | null>;
	toggleCampaignStatus(
		id: string,
		active: boolean
	): Observable<ICampaign | null>;
	searchCampaignByName(
		name: string,
		fieldsToExclude?: string
	): Observable<ICampaign[]>;
	updateCampaignById(id: string, campaign: OptionalICampaign): Observable<ICampaign | null>;
	getCampaignsByCriteria(criteria: ICampaignCriteria, limit : number , page : number) : Observable<ICampaign[] | null>;
}

export const CampaignRepository: CampaignRepository = {
	test: () => from(["Hello World"]),
	addCampaign: (campaign: ICampaign): Observable<ICampaign | null> =>
		from(CampaignModel.create(campaign)),
	updateCampaignVoucherCampaign: (
		campaignId: string,
		voucherCode: string
	): Observable<ICampaign | null> => {
		return from(
			CampaignModel.findByIdAndUpdate(
				campaignId,
				{ $inc: { voucher_count: 1 }, $push: { vouchers: voucherCode } },
				{ new: false }
			)
		);
	},

	// added  kaval
	getAllCampaigns: (fieldsToExclude?: string): Observable<ICampaign[]> => {
		return from(
			CampaignModel.find({})
				.select(fieldsToExclude ?? "")
				.exec()
		);
	},
	getCampaignById: (
		id: string,
		fieldsToExclude?: string
	): Observable<ICampaign | null> =>
		from(
			CampaignModel.findById(id)
				.select(fieldsToExclude ?? "")
				.exec()
		),
	deleteCampaignById: (id: string): Observable<ICampaign | null> =>
		from(CampaignModel.findOneAndRemove({ id: id }).exec()),
	getVouchersByCampaignId: (id: string): Observable<IVoucher[] | null> =>
		from(VoucherModel.find({ campaignId: id }).exec()),
	toggleCampaignStatus: (
		id: string,
		active: boolean
	): Observable<ICampaign | null> =>
		from(
			CampaignModel.findByIdAndUpdate(
				id,
				{ active: active },
				{ new: false }
			).exec()
		),
	searchCampaignByName: (
		name: string,
		fieldsToExclude?: string
	): Observable<ICampaign[]> => {
		return from(
			CampaignModel.find({ name: { $regex: "^" + name, $options: "i" } })
				.select(fieldsToExclude ?? "")
				.exec()
		);
	},

	updateCampaignById: (campaign_id: string, campaign: OptionalICampaign): Observable<ICampaign | null> => {
		return from(CampaignModel.findByIdAndUpdate(campaign_id, campaign).exec());
	},
	getCampaignsByCriteria: (criteria: ICampaignCriteria, limit : number , page : number) : Observable<ICampaign[] | null> => {
		return from(CampaignModel.find(criteria).skip(page * limit).limit(limit).exec());
	}
};
