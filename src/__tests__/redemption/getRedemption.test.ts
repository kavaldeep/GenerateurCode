import { connectToDatabase } from "../../persistence/services/db";
import getRedemptions from "../../persistence/services/getRedemptionServices/getRedemptionServices";
import { IGetRedemptionResponse } from "../../persistence/services/getRedemptionServices/getRedemptionServices";

var limit = 10;
var customerTestId = "64661a9c51419902d167d53a";  
var page = 0 ; 
var voucherCode = "6466171712e7366359fc6959";


beforeAll(async () => {
    connectToDatabase().subscribe({
        next: (message) => {
            console.log("Connected to database");
        },
    });
});

describe("Get Redemption by client" ,  ()=>{
    
    var redemptions : IGetRedemptionResponse;
    beforeAll(async () => {
     redemptions = await getRedemptions.getRedemptions( {customer_id : customerTestId} , limit ,  page);
    });

    it("should get a redemption array > 0 " , async () => {
        expect(redemptions.redemptionArray.length).toBeGreaterThan(0);
    });

    it("should get the redemption only for a specific client" , async () => {
        redemptions.redemptionArray.forEach((redemption) => {
            expect(redemption.customer_id).toBe(customerTestId);
        })
    });

})

describe("Get Redemption by voucher_id" ,  ()=>{

    var clientRemdemption : IGetRedemptionResponse;
    beforeAll(async () => {
        clientRemdemption = await getRedemptions.getRedemptions( {voucher_id : voucherCode} , limit ,  page);
    });

    
    it("should get the redemptionArray >  0", async () => {
        expect(clientRemdemption.redemptionArray.length).toBeGreaterThan(0);
    });

    it("should get the redemption only for a specific voucher" , async () => {
        clientRemdemption.redemptionArray.forEach((redemption) => {
            expect(redemption.voucher_id).toBe(voucherCode);
        })
    });
})