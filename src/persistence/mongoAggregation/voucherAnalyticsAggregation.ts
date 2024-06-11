import {VoucherAnalytics} from "../models/VoucherAnalytics";

export const getVoucherAnalystics = (voucher_id: string): Promise<VoucherAnalytics> => {
    console.log("starting getting voucher analytics");
    return new Promise<VoucherAnalytics>(async (resolve, reject) => {
        let total_vouchers = 0;
        let total_voucher_codes = 0;
        let total_active_vouchers = 0;
        let total_campaign_vouchers = 0;
        let total_category_vouchers = 0;
        let total_type_vouchers = 0;

        try {
            //TODO: use properly lol
        } catch (error) {
            console.log("error has occured while getting the analytics.");
            reject(error);
        }
    });
}