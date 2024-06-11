/* import { Observable, Subject, tap } from "rxjs";
import { VoucherRepository } from "../../repositories/voucherRepos";
import { RedemptionRepository } from "../../repositories/redemptionRepos";
import { CustomerRepository } from "../../repositories/customersRepos";
import { IRedemption } from "../../models/Redemption";
import { IVoucher } from "../../models/Voucher";

class RedemptionServices {
	private userRedeemVoucherSubject = new Subject<IRedemption>();
	public userRedeemVoucher$ = this.userRedeemVoucherSubject.asObservable();

	private userRedeemVoucherErrorSubject = new Subject<Error>();
	public userRedeemVoucherError$ =
		this.userRedeemVoucherErrorSubject.asObservable();

	private userRedeemVoucherSuccessSubject = new Subject<IVoucher>();
	public userRedeemVoucherSuccess$ =
		this.userRedeemVoucherSuccessSubject.asObservable();

	redeemLoyalityVoucher(
		voucherId: string,
		customer_id: string
	): Observable<  IVoucher[] | null> {
		let redemption: IRedemption = {
			voucher_id: voucherId,
			type: "LOYALTY",
			date: new Date(),
			customer_id: customer_id,
			gift: {
				amount: 0,
			},
			result: "SUCCESS",
			failure_reason: null,
			tracking_id: null,
			order_id: null,
			metadata: {},
		};
		VoucherRepository.addRedemption(voucherId, redemption).subscribe({
			next: (voucher) => {
				if (voucher) {
					redemption.gift.amount = voucher?.loyalty_card || 0;
					console.log("redeemLoyalityVoucher", redemption);
					RedemptionRepository.addRedemption(redemption);
					this.userRedeemVoucherSubject.next(redemption);
					this.userRedeemVoucherSuccessSubject.next(voucher);
					return voucher;
				} else {
					this.userRedeemVoucherSubject.error("Voucher not found");
					this.userRedeemVoucherErrorSubject.next(
						new Error("Voucher not found kavaldeep "  + voucherId) 
					);
				}
			},
		});
		return new Observable<null>();
	}
}

const redemptionServices = new RedemptionServices();

redemptionServices.userRedeemVoucher$.subscribe({
	next: (redemption) => {
		CustomerRepository.redeemAndLoyalty(redemption).subscribe({
			next: (customer) => {
				console.log(" The loyalty points are updated" , customer?.loyalty)
			},
		});

		
		
	},
});

redemptionServices.userRedeemVoucherError$.subscribe({
	next: (Eroor) => {
		console.log("voucher not found", Eroor );
	},
});

export default redemptionServices;
 */