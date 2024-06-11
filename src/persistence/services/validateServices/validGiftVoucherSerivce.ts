import { ICampaign } from "../../models/Campaing";
import { ICustomer } from "../../models/Customers";
import { IGiftVoucher } from "../../models/voucherModels/GiftVoucher";
import  ValidateVoucherServices , { IValidateResponse, ResponseTypes, VoucherTypes } from "./validateServices";


export interface IValidateGiftResponse extends IValidateResponse{
    balance : number;
}

export class ValidateGiftVoucherSerivce extends ValidateVoucherServices {

    validator(voucher: VoucherTypes, campaign : ICampaign, customer: ICustomer , amount?: number): ResponseTypes {
    
        var voucher1 = JSON.parse(JSON.stringify(voucher)) as IGiftVoucher;
        var totalAmount = amount ? amount : voucher1.balance;
        var failureReason = "";
        const isValid =  voucher1.active
        && voucher1.redemption.length < voucher1.redemptionLimit
        && !(voucher1.expiration_date > new Date())
        && totalAmount<= voucher1.balance
        && voucher1.balance > 0
        ; 

        if(!isValid){
            if(!voucher.active){
                failureReason = "VOUCHER_NOT_ACTIVE";
              //  console.log( "Voucher is not active");
            }
            if(voucher.redemption.length > voucher.redemptionLimit){
                failureReason = "VOUCHER_ALREADY_REDEEMED"
                //console.log("Voucher is already redeemed");
            }
            if(voucher.expiration_date >new Date()){
                failureReason = "VOUCHER_EXPIRED";
                //   console.log("Voucher is expired " + voucher1.expiration_date + " " + new Date());
            }
            if(totalAmount > voucher1.balance){
                failureReason = "VOUCHER_BALANCE_EXCEEDED_THE_CURRENT_BALANCE_IS_" + voucher1.balance + "_AND_THE_AMOUNT_IS_" + totalAmount;
            }
            if(voucher1.balance <= 0){
                failureReason = "VOUCHER_BALANCE_IS_ZERO";
            }
        }
        const response : IValidateResponse = {
            isValid : isValid && campaign.active ,
            voucher : voucher1,
            campaign : campaign,
            customer : customer,
            failureReason :failureReason
        }

        return response;
    }
}



const validateGiftVoucherService = new ValidateGiftVoucherSerivce();

export default validateGiftVoucherService;