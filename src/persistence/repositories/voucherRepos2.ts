import { IRedemption } from "../models/Redemption";
import { IVoucher, VoucherModel } from "../models/Voucher";
import { ICampaign, CampaignModel } from "../models/Campaing";
import { from, Observable } from "rxjs";

interface VoucherRepository {
	test(): Observable<string>;
	getAllVouchers(): Observable<IVoucher[]>;
	getVoucherByCode(id: string): Observable<IVoucher[] | null>;
	getVouchersByCampaignId(id: string): Observable<IVoucher[] | null>;
	addVoucher(voucher: IVoucher): Observable<IVoucher | null>;
	addRedemption(
		voucher_id: string,
		redemption: IRedemption
	): Observable<IVoucher | null>;

	// added by manu
	deleteVoucherById(id: string): Observable<IVoucher | null>;
	toggleVoucherStatus(id: string, active: boolean): Observable<IVoucher | null>;
	searchVoucherByCode(code: string): Observable<IVoucher[] | null>;
}

export const VoucherRepository: VoucherRepository = {
	test: () => from(["Hello World"]),
	getAllVouchers: (): Observable<IVoucher[]> =>
		from(VoucherModel.find().exec()),
	getVoucherByCode: (code: string): Observable<IVoucher[] | null> => {
		return from(VoucherModel.find({ code: code }).exec());
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
				{ new: false }
			).exec()
		);
	},

	// added by manu
	deleteVoucherById: (id: string): Observable<IVoucher | null> =>
		from(VoucherModel.findOneAndRemove({ id: id }).exec()),
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
			VoucherModel.find({ code: new RegExp("^" + code + "$", "i") }).exec()
		);
	},
};
