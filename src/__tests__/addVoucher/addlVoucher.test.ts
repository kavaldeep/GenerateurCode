import voucherServices  from "../../persistence/services/vouchersServices/addVoucherServices/loyalVoucherServices"
import giftVoucherServices from "../../persistence/services/vouchersServices/addVoucherServices/giftVoucherService";
import discountVoucherServices from "../../persistence/services/vouchersServices/addVoucherServices/discountVoucherServices";
import { IResponseAddVoucherServices } from "../../persistence/services/vouchersServices/voucherServices";
import { connectToDatabase } from "../../persistence/services/db";
import  { IDiscountVoucher } from "../../persistence/models/voucherModels/DiscountVoucher";

describe("test add a  voucher", () => {

    const amount = 100;
    const testCampaignId = "64678a40584d2f79a72d0302";
         
    beforeAll(async () => {
    
        connectToDatabase().subscribe({}); // Connect to database
    });


    it("should add a voucher in both collections", async () => {
        
        
        var response : IResponseAddVoucherServices = await voucherServices.addLoyalVoucher(testCampaignId , amount);
        expect(response.campaign._id?.toString()).toBe(testCampaignId);
        expect(response.voucher.amount).toBe(amount);
        //@ts-ignore
        expect(response.voucher.__t).toBe("loyalty");
    }); 

    it("should add a gif voucher to the both collections", async () => {
        var reponse : IResponseAddVoucherServices = await giftVoucherServices.addGiftVoucher( testCampaignId , amount);
        expect(reponse.campaign._id?.toString()).toBe(testCampaignId);
        expect(reponse.voucher.amount).toBe(amount);
        //@ts-ignore
        expect(reponse.voucher.__t).toBe("gift");
    });

     it("should add a discount voucher to the both collections", async () => {
        var discountType = "FIXED_AMOUNT";
        var maxAmount = 100;
        var minAmount = 20 
        var response : IResponseAddVoucherServices = await discountVoucherServices.addDiscountVoucher(testCampaignId , amount ,"FIXED_AMOUNT", maxAmount , minAmount );
        expect(response.campaign._id?.toString()).toBe(testCampaignId);
        expect(response.voucher.amount).toBe(amount);
        
        var discount = response.voucher as IDiscountVoucher;
        expect(discount.discountType).toBe(discountType);
        expect(discount.maxAmount).toBe(maxAmount);
        expect(discount.minAmount).toBe(minAmount);
        //@ts-ignore
        expect(response.voucher.__t).toBe("discount");

    }); 
});