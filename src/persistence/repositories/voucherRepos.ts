import {IRedemption} from "../models/Redemption";
import {IPublish} from "../models/Publish";
import {IVoucher, OptionalIVoucher, VoucherModel} from "../models/Voucher";
import {from, Observable} from "rxjs";
import {ClientSession} from "mongoose";

export interface IVoucherCriteria {
	code?: string;
	campaignId?: string ;
	category?: string;
	type?: "DISCOUNT" | "GIFT" | "LOYALTY";
	amount?: number;
	start_date?: Date;
	redemptionLimit?: number;
	active?: boolean;
	additional_info?: string | null;
}

interface VoucherRepository {
	test(): Observable<string>;

	getAllVouchers(): Observable<IVoucher[]>;
	getVoucherByPage: (
		page: number,
		limit: number,
		campaignId?: string
	) => Observable<IVoucher[]>;

	getVoucherByCode(id: string): Observable<IVoucher[] | null>;
	getVouchersByCampaignId(id: string): Observable<IVoucher[] | null>;

	addVoucher(voucher: IVoucher): Observable<IVoucher | null>;
	addRedemption(
		voucher_id: string,
		redemption: IRedemption
	): Observable<IVoucher | null>;
	addPublish(voucher_id: string, publish:  IPublish, session ?: ClientSession) : Observable<IVoucher | null>;



	// added by manu
	deleteVoucherById(id: string): Observable<IVoucher | null>;
	toggleVoucherStatus(id: string, active: boolean): Observable<IVoucher | null>;
	searchVoucherByCode(code: string): Observable<IVoucher[] | null>;
	getVoucherById(id: string): Observable<IVoucher[] | null>;

	updateVoucherById(id: string, updateVoucher: OptionalIVoucher): Observable<IVoucher | null>;
	getVoucherByCriteria(criteria: IVoucherCriteria, limit: number , page: number ): Observable<IVoucher[]>;
	updateVoucherAmountById(id: string, amount: number): Observable<IVoucher | null>;
}

export const VoucherRepository: VoucherRepository = {
	test: () => from(["Hello World"]),
	getAllVouchers: (): Observable<IVoucher[]> =>
		from(VoucherModel.find().exec()),
	getVoucherByCode: (code: string): Observable<IVoucher[] | null> => {
		return from(VoucherModel.find({ code: code }).exec());
	},
	getVoucherByPage: (
		page: number,
		limit: number,
		campaignId?: string
	): Observable<IVoucher[]> => {
		//sort in descending order (-1)
		if(campaignId){
			return from(VoucherModel.find({campaignId : campaignId}).sort({ _id: -1 }).skip(page * limit).limit(limit).exec());
		}else{
			return from(VoucherModel.find().sort({ _id: -1 }).skip(page * limit).limit(limit).exec());
		}
	},
	getVouchersByCampaignId: (id: string): Observable<IVoucher[] | null> =>
		from(VoucherModel.find({ campaignId: id }).exec()),
	addVoucher: (voucher: IVoucher): Observable<IVoucher | null> =>
		from(VoucherModel.create(voucher)),
	addRedemption: (
		code: string,
		redemption: IRedemption
	): Observable<IVoucher | null> => {
		return from(
			VoucherModel.findOneAndUpdate(
				{ code: code },
				{ redemption: redemption },
				{ new: true }
			).exec()
		);
	},

	addPublish: ( _id: string, publish: IPublish , session ?: ClientSession): Observable<IVoucher | null> => {
		return from(
			VoucherModel.findOneAndUpdate(
				{ _id : _id },
				 { $push : { publish_id :  publish._id.toString()} },
				{ new: true  , 
					session : session
				}
			).exec()
		);
	},
	// added by manu
	deleteVoucherById: (id: string): Observable<IVoucher | null> =>
		from(VoucherModel.findByIdAndDelete(id).exec()),
	toggleVoucherStatus: (
		id: string,
		active: boolean
	): Observable<IVoucher | null> =>
		from(
			VoucherModel.findByIdAndUpdate(
				id,
				{ active: active },
				{ new: false }
			).exec()
		),
	searchVoucherByCode: (code: string): Observable<IVoucher[] | null> => {
		return from(
			VoucherModel.find({ code: { $regex: "^" + code, $options: "i" } }).exec()
		);
	},
	getVoucherById: (id: string): Observable<IVoucher[] | null> => {
		return from(VoucherModel.find({ _id: id }).exec());

	},
	updateVoucherById: (voucher_id: string, voucher: OptionalIVoucher): Observable<IVoucher | null> => {
		return from(VoucherModel.findByIdAndUpdate(voucher_id, voucher).exec());
	},
	getVoucherByCriteria: (criteria: IVoucherCriteria, limit: number , page: number): Observable<IVoucher[]> => {
		return from(VoucherModel.find(criteria).skip( page * limit ).limit(limit).exec());
	},
	updateVoucherAmountById: (id: string, amount: number): Observable<IVoucher | null> => {
		return from(VoucherModel.findByIdAndUpdate(id, {amount: amount}));
	}
};
