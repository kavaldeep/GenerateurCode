import { ICampaign } from "../../models/Campaing";
import { ICustomer } from "../../models/Customers";
import { IDiscountVoucher } from "../../models/voucherModels/DiscountVoucher";
import ValidateVoucherService , { IValidateResponse  , VoucherTypes , ResponseTypes} from "./validateServices";


export interface IValidateDiscountResponse extends IValidateResponse{
    discount : number;
}

export class ValidateDiscountVoucherService extends ValidateVoucherService{

    validator(voucher: VoucherTypes, campaign: ICampaign, customer: ICustomer , amount ?: number): ResponseTypes{
        
        
        let voucher1 = JSON.parse(JSON.stringify(voucher)) as IDiscountVoucher;
        var failureReason ="";
        var totalAmount  = amount  ? amount : voucher.amount;
        
        const isValid =  voucher1.active 
        && voucher1.redemption.length < voucher1.redemptionLimit
        && !(voucher1.expiration_date > new Date())
        && totalAmount >= voucher1.minAmount
        && totalAmount <= voucher1.maxAmount;
        const campaignValid = campaign.active ;

        if(!isValid){
                if(!voucher.active){
                    failureReason = "VOUCHER_NOT_ACTIVE";
                  //  console.log( "Voucher is not active");
                }
                 if(voucher.redemption.length > voucher.redemptionLimit){
                    failureReason = "VOUCHER_ALREADY_REDEEMED"
                    //console.log("Voucher is already redeemed");
                }
                 if(voucher.expiration_date >  new Date()){
                    failureReason = "VOUCHER_EXPIRED";
                 //   console.log("Voucher is expired " + voucher1.expiration_date + " " + new Date());
                }
                if(totalAmount <= voucher1.minAmount){
                    failureReason = "MIN_AMOUNT_NOT_REACHED";
                 //   console.log("Min amount not reached");
                }
                if(totalAmount >= voucher1.maxAmount){
                    failureReason = "MAX_AMOUNT_EXCEEDED";
                 //   console.log("Max amount exceeded");
                }   
            
         }
        const response : IValidateDiscountResponse = {
            isValid : isValid && campaignValid,
            voucher : voucher1,
            campaign : campaign,
            customer : customer,
            failureReason : failureReason,
            discount : voucher1.discountType == "PERCENTAGE" ? totalAmount * voucher1.amount / 100 : voucher1.discountType == "FIXED_AMOUNT" ? voucher1.amount : 0
        }
        return response ;
    }   
}

const validateDiscountVoucherService = new ValidateDiscountVoucherService();

export default validateDiscountVoucherService;