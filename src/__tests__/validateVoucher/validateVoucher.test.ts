import { IValidateResponse } from "../../persistence/services/validateServices/validateServices";
import   validateLoyaltyVoucher  from "../../persistence/services/validateServices/validateLoyalVoucherService";
import validateDiscountVoucherService from "../../persistence/services/validateServices/validateDIscountVoucherService";
import { connectToDatabase } from "../../persistence/services/db";
import validateGiftVoucherService from "../../persistence/services/validateServices/validGiftVoucherSerivce";



describe("test validate voucher", () => {

    const loyalVoucherCode  = "dl9Gn7Jp5s9E0ck8";
    const intactiveCampaignCode = "HAOuR12JpFV8bluR";
    const giftVoucherCode = "5O6OccrNemf0BCns";
    const discountVoucherCode = "VzxlWBjwomzrkPNq";
    const customerId = "64661a9c51419902d167d53a"
    const customerDoesntExist = "5f8b8b3b9d1f3b1c6c9d1f3b";
    const customerNotExistError = "CUSTOMER_NOT_FOUND";

     beforeAll(async () => {
    
        connectToDatabase().subscribe({}); // Connect to database
    });


    it("should validate a loyal voucher", async () => {
       var response : IValidateResponse = await validateLoyaltyVoucher.validatePromise(loyalVoucherCode , customerId) as IValidateResponse; 
       expect(response.isValid).toBe(true);

    });

     it("shouldnot validate the loyal voucher because the customer doesn't exit" , async () => {
        try{
            var response : IValidateResponse = await validateLoyaltyVoucher.validatePromise("dl9Gn7Jp5s9E0ck8" , customerDoesntExist ); 
        }catch(error : any ){
            expect(error).toBe(customerNotExistError);
        }
    })


    it("shouldnot validate the voucher because the campaign is not active " , async () => {
        var response : IValidateResponse = await validateLoyaltyVoucher.validatePromise( intactiveCampaignCode  , customerId );
        expect(response.isValid).toBe(false);
    })

    it("should validate a discount voucher", async () => {
        
        var response  = await validateDiscountVoucherService.validatePromise(discountVoucherCode , customerId , 30);
        //check if reponse contains the property discount 
        expect(response.hasOwnProperty("discount")).toBe(true);
        expect(response.isValid).toBe(true);
    });


    it("should not validate a discount voucher because of amount not reached", async () => {
        var response  = await validateDiscountVoucherService.validateVoucher(discountVoucherCode , customerId ,  1) ;
        expect(response.isValid).toBe(false);
        expect(response.failureReason).toBe("MIN_AMOUNT_NOT_REACHED");
    });

    it("should not validate a discount voucher because of amount exceeded", async () => {
        var response  = await validateDiscountVoucherService.validateVoucher(discountVoucherCode , customerId ,  2000) ;
        expect(response.isValid).toBe(false);
        expect(response.failureReason).toBe("MAX_AMOUNT_EXCEEDED");
    });

    it("should validate a gift voucher", async () => {
         var reponse = await validateGiftVoucherService.validatePromise(giftVoucherCode , customerId , 30);
        expect(reponse.isValid).toBe(true); 
        
    });

    it("should not validate a gift voucher because of amount exceeded", async () => {
        var reponse = await validateGiftVoucherService.validatePromise(giftVoucherCode , customerId , 3000);
        expect(reponse.isValid).toBe(false); 
        expect(reponse.failureReason).toBe("VOUCHER_BALANCE_EXCEEDED");
    }); 

});
