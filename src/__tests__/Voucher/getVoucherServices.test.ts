import {connectToDatabase, disconnectFromDatabase} from "../../persistence/services/db";
import getVoucherServices from "../../persistence/services/vouchersServices/getVoucherServices";

beforeAll(async () => {
    connectToDatabase().subscribe({});
});

afterAll(async () => {
    disconnectFromDatabase();
});

describe('VoucherServices test', function () {

    it('should get Voucher by Page', async () => {
        const limitNumber = 10;
        const response = await getVoucherServices.getVouchersByPage(0, limitNumber);
        expect(response.length).toBe(limitNumber);
        response.forEach((voucher) => {
            expect(voucher._id).not.toBeNull();
            expect(voucher.code).not.toBeNull();
            expect(voucher.campaignId).not.toBeNull();
        });
    });

    it('should get Voucher by Page with campaignId', async () => {
        const limitNumber = 10;
        const campaignId = "6466170512e7366359fc4252";
        const response = await getVoucherServices.getVouchersByPage(0, limitNumber, campaignId);
        expect(response.length).toBe(limitNumber);
        response.forEach((voucher) => {
            expect(voucher._id).not.toBeNull();
            expect(voucher.code).not.toBeNull();
            expect(voucher.campaignId).toStrictEqual(campaignId);
        });
    });

    it('should get vouchers by page by aggregation', async () => {
        const limitNumber = 10;
        const response = await getVoucherServices.getVouchersAggregationByPage(0, limitNumber);
        expect(response.length).toBe(limitNumber);
        response.forEach((voucher: any) => {
            expect(voucher._id).not.toBeNull();
            expect(voucher.code).not.toBeNull();
            expect(voucher.campaignId).not.toBeNull();
        });
    });

    it('should get the same response on get by page and by page by aggregation', async () => {
        const limitNumber = 10;
        const response1 = await getVoucherServices.getVouchersByPage(0, limitNumber);
        const response2 = await getVoucherServices.getVouchersAggregationByPage(0, limitNumber);
        expect(response1.length).toStrictEqual(limitNumber);
        expect(response1.length).toStrictEqual(response2.length);
        for (let i = 0; i < limitNumber; i++) {
            expect(response1[i]._id).toStrictEqual(response2[i]._id);
            expect(response1[i].code).toStrictEqual(response2[i].code);
            expect(response1[i].start_date).toStrictEqual(response2[i].start_date);
            expect(response1[i].redemption).toStrictEqual(response2[i].redemption);
            expect(response1[i].category).toStrictEqual(response2[i].category);
            expect(response1[i].active).toStrictEqual(response2[i].active);
        }
    });
});