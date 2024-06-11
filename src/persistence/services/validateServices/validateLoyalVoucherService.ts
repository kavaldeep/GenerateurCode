import { ICampaign } from "../../models/Campaing";
import { ICustomer } from "../../models/Customers";
import { IVoucher } from "../../models/Voucher";
import ValidateVoucherService , { IValidateResponse } from "./validateServices";


class ValidateLoyaltyVoucherService extends ValidateVoucherService{

    validator<T extends IVoucher, U extends IValidateResponse>(voucher: T, campaign: ICampaign, customer: ICustomer): U {
        
        const voucherValid = voucher.active &&(voucher.expiration_date > new Date())
                             && voucher.redemption.length == 0;

 
        const campaignValid = campaign.active ;
        const response : IValidateResponse = {
            isValid : voucherValid && campaignValid,
            voucher : voucher,
            campaign : campaign,
            customer : customer,
            failureReason : ""
        }
        return response as U;
    }   
}

const validateLoyaltyVoucherService = new ValidateLoyaltyVoucherService();

export default validateLoyaltyVoucherService;