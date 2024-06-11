import {connectToDatabase, disconnectFromDatabase} from "../../persistence/services/db";
import bulkVoucherService from "../../persistence/services/vouchersServices/bulkVoucherAddSerivces";


beforeAll(async () => {
    connectToDatabase().subscribe({});
});

afterAll(async () => {
    disconnectFromDatabase();
});

describe('bulk voucher add services test', function () {

    it('should add 3 vouchers with amount of 10 at a time to a campaign', async () => {
        const campaignId = "64b14afa9558541a24b5771c";
        const voucherAmount = 10;
        const voucherCount = 3;
        const response = await bulkVoucherService.addBulkLoyalVouchers(campaignId, voucherAmount, voucherCount);
        expect(response.total).toStrictEqual(voucherCount);
    });


});