import {VoucherModel} from "../../models/Voucher";
import {VoucherAnalytics} from "../../models/VoucherAnalytics";
import {CampaignAnalyticsNew} from "../../models/CampaignAnalyticsNew";
import {CustomerAnalytics} from "../../models/CustomerAnalytics";
import {getCustomerAnalyticsPayload} from "../../mongoAggregation/customerAnalyticsAggregation";
import {getCampaignAnalyticsPayload} from "../../mongoAggregation/campaignAnalyticsAggregation";

class AnalyticsServices {

    /**
     * Method to get the analytics for specific campaign id. Analytics will be requested with MongoDB aggregation.
     *
     * @param campaign_id - campaign id for the analytics
     * @param begin_date - begin date of data analytics
     * @param end_date - end date of data analytics
     */
    public getCampaignAnalytics(campaign_id: string, begin_date: Date, end_date: Date): Promise<CampaignAnalyticsNew> {

        return new Promise<CampaignAnalyticsNew>(async (resolve, reject) => {
            try {
                VoucherModel.aggregate(getCampaignAnalyticsPayload(campaign_id, begin_date, end_date))
                    .then((response: any) => {

                    response = response[0];

                    let total_redemption_date_count: Record<string, number> = {};
                    let total_redemption_date_point: Record<string, number> = {};

                    response["total_redemption_date_count"].forEach((value: any) => {
                        total_redemption_date_count[value["_id"]["day"]] = value["count"];
                    });

                    response["total_redemption_date_point"].forEach((value: any) => {
                        total_redemption_date_point[value["_id"]["day"]] = value["count"];
                    });
                    resolve({
                        campaign_id: campaign_id,
                        total_number_voucher_code: response["total_number_voucher_code"]?.[0]?.["total_number_voucher_code"] ?? 0,
                        total_redeem_voucher: response["total_redeem_voucher"]?.[0]?.["total_redeem_voucher"] ?? 0,
                        total_number_customers: response["total_number_customers"]?.[0]?.["total_number_customers"] ?? 0,
                        total_redemption_date_count: total_redemption_date_count,
                        total_redemption_date_point: total_redemption_date_point,
                        total_redeems_point: response["total_redeems_point"]?.[0]?.["count"] ?? 0,
                    });
                });
            } catch (error) {
                console.log("Error occured while analytics for campaign with id: " + campaign_id);
                console.log("Following error occured: " + error);
                reject(error);
            }
        });
    }

    /**
     * Method to get the analytics for specific customer id. Analytics will be requested with MongoDB aggregation.
     *
     * @param customer_Id - customer id for the analytics
     */
    public getCustomerAnalytics(customer_Id: string): Promise<CustomerAnalytics> {
        return new Promise<CustomerAnalytics>(async (resolve, reject) => {
            try {
                VoucherModel.aggregate(getCustomerAnalyticsPayload(customer_Id)).then((response: any) => {

                    let total_redeems_amount_by_customers: Record<string, number> = {};
                    let total_type_voucher_bought_by_customers: Record<string, number> = {};
                    let total_redemption_date_count_by_customers: Record<string, number> = {};
                    let total_redemption_date_amount_by_customers: Record<string, number> = {};

                    response = response[0];

                    let total_count_redeems_by_customers = response["total_count_redeems_by_customers"][0]["total_count_redeems_by_customers"];

                    response["total_redeems_amount_by_customers"].forEach((entry: any) => {
                        total_redeems_amount_by_customers[entry["_id"]["day"]] = entry["count"];
                    });

                    response["total_type_voucher_bought_by_customers"].forEach((entry: any) => {
                        total_type_voucher_bought_by_customers[entry["_id"]] = entry["count"];
                    });

                    response["total_redemption_date_count_by_customers"].forEach((entry: any) => {
                        total_redemption_date_count_by_customers[entry["_id"]["day"]] = entry["count"];
                    });

                    response["total_redemption_date_amount_by_customers"].forEach((entry: any) => {
                        total_redemption_date_amount_by_customers[entry["_id"]["day"]] = entry["count"];
                    });

                    resolve({
                        customer_id: customer_Id,
                        total_count_redeems_by_customers: total_count_redeems_by_customers,
                        total_redeems_amount_by_customers: total_redeems_amount_by_customers,
                        total_type_voucher_bought_by_customers: total_type_voucher_bought_by_customers,
                        total_redemption_date_count_by_customers: total_redemption_date_count_by_customers,
                        total_redemption_date_amount_by_customers: total_redemption_date_amount_by_customers
                    });
                });
            } catch (error) {
                console.log("Error occured while analytics for campaign with id: " + customer_Id);
                console.log("Following error occured: " + error);
                reject(error);
            }
        });
    }

    public getVoucherAnalystics(voucher_id: string): Promise<VoucherAnalytics> {
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
}

const analyticsServices = new AnalyticsServices();

export default analyticsServices;
