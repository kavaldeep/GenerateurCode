import {IRedemptionRepsonse} from "../vouchersServices/redemptionSerivces";
import RedemptionServices from "../vouchersServices/redemptionSerivces";

class WcCouponServices {
    public parseBody(requestBody: any) {
        let redemptionServices = new RedemptionServices();
        requestBody["coupon_lines"].forEach((voucher: any) => {
            redemptionServices
                .redeemLoyalityVoucher(voucher["code"], "wordpress_customer")
                .then((result: any) => {
                    console.log(result);
                })
                .catch((error : IRedemptionRepsonse) => {
                    console.log("Something went wrong while redeeming WordPress Coupons!");
                    console.log(error);
                });
        });
    }
}

const wcCouponServices = new WcCouponServices();

export default wcCouponServices;