import {connectToDatabase, disconnectFromDatabase} from "../../persistence/services/db";
import analyticsServices from "../../persistence/services/analyitcsSerivces/analyticsServices";

beforeAll(async () => {
    connectToDatabase().subscribe({});
});

afterAll(async () => {
    disconnectFromDatabase();
});

describe("get campaign analytics data test", () => {
/*
    it('should get campaign analytics data', async () => {
        const response = await analyticsServices.getCampaignAnalytics("6466170512e7366359fc4252");
        expect(response.campaign_id).toEqual("6466170512e7366359fc4252");
        expect(response.total_number_voucher_code > 0);
        expect(response.total_redeem_voucher > 0);
        expect(response.total_number_customers > 0);
        expect(Object.keys(response.total_redemption_date_count).length > 0);
        expect(Object.keys(response.total_redemption_date_point).length > 0);
        expect(response.total_redeems_point > 0);
    });
*/
    it('should get customer analytics data', async () => {
        const response = await analyticsServices.getCustomerAnalytics("64661a9c51419902d167d53a");
        expect(response.customer_id).toEqual("64661a9c51419902d167d53a");
        expect(response.total_count_redeems_by_customers > 0);
        expect(Object.keys(response.total_redeems_amount_by_customers).length > 0);
        expect(Object.keys(response.total_type_voucher_bought_by_customers).length > 0);
        expect(Object.keys(response.total_redemption_date_count_by_customers).length > 0);
        expect(Object.keys(response.total_redemption_date_amount_by_customers).length > 0);
    });

    //implement when getVoucherAnalytics is done
    // it('should get voucher analytics data', async () => {
    //     const response = await analyticsServices.getVoucherAnalystics("");
    //     // expect(response.voucher_id).toEqual("64661a9c51419902d167d53a");
    //     // expect(response.total_vouchers > 0);
    //     // expect(response.total_voucher_codes > 0);
    //     // expect(response.total_active_vouchers > 0);
    //     // expect(response.total_campaign_vouchers > 0);
    //     // expect(response.total_category_vouchers > 0);
    //     // expect(response.total_type_vouchers > 0);
    // });
})