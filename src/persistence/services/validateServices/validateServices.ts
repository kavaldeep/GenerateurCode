import { IVoucher } from "../../models/Voucher";
import { IDiscountVoucher } from "../../models/voucherModels/DiscountVoucher";
import { ILoyaltyVoucher } from "../../models/voucherModels/LoyaltyVoucher";
import { IGiftVoucher } from "../../models/voucherModels/GiftVoucher";
import { VoucherRepository} from "../../repositories/voucherRepos";
import { ICustomer } from "../../models/Customers";
import { ICampaign } from "../../models/Campaing";
import { CustomerRepository } from "../../repositories/customersRepos";
import { CampaignRepository } from "../../repositories/campaignRepo";
import { IValidateDiscountResponse } from "./validateDIscountVoucherService";
import { IValidateGiftResponse } from "./validGiftVoucherSerivce";

export type LoyaltyValidator<T> = (voucher : ILoyaltyVoucher ) => T;
export type DiscountValidator<T> = (voucher : IDiscountVoucher , amount : number  ) => T;
export type GitfValidator<T> = (voucher : IGiftVoucher , amount : number  ) => T;

export interface IValidateResponse{
    isValid : boolean;
    failureReason : string;
    voucher : IVoucher | null;
    campaign : ICampaign | null;
    customer : ICustomer | null;
}   

export type VoucherTypes = ILoyaltyVoucher | IDiscountVoucher | IGiftVoucher;
export type ResponseTypes = IValidateResponse | IValidateDiscountResponse | IValidateGiftResponse;
/**
 * @class ValidateVoucher
 * validation rules for loyal vouchner
 * Not already redeemed
 * Not expired
 * campaign is active
 * customer exist 
    validateGift.validator(this.giftVoucher , this.customer);
 * version is right 
*/
export default abstract class ValidateVoucherService{
    
    abstract validator(voucher : VoucherTypes , campaign : ICampaign , customer : ICustomer , amount?:number) : ResponseTypes;

    validateVoucher( voucherCode : string , customerId : string , amount ?: number) : Promise<ResponseTypes> {

        return new Promise((resolve , reject) => {
            VoucherRepository.getVoucherByCode(voucherCode).subscribe({

                next : (voucher : IVoucher[] | null) => {
                    if(voucher && voucher.length > 0){
                      CustomerRepository.getCustomerById(customerId).subscribe({
                            next : (customer : ICustomer | null) => {
                                if(customer){
                                    CampaignRepository.getCampaignById(voucher[0].campaignId).subscribe({
                                        next : (campaign : ICampaign | null) => {
                                            if(campaign){
                                                resolve(this.validator(voucher[0] as VoucherTypes, campaign , customer , amount) );
                                            }
                                            else{
                                                reject("CAMPAIGN_NOT_FOUND_ID_IS_" + voucher[0].campaignId );
                                            }
                                        },
                                    });
                                }
                                else{
                                    reject("CUSTOMER_NOT_FOUND_ID_IS_" + customerId);
                                }
                            },
                      });
                    }
                    else{
                    reject("VOUCHER_NOT_FOUND");
                    }
                    
                } ,

                error : (error : any) => {
                    reject(error);
                }
            }    
            );
        });
    }

    

    public  validatePromise<T extends IValidateResponse>( voucherCode : string , customerId : string , amount? : number ) : Promise<T> {
        return new Promise((resolve , reject) => {
            this.validateVoucher(voucherCode , customerId  , amount).then((response : IValidateResponse) => {
                resolve(response as T);
            }).catch((error : any) => {
                reject(error);
            });
        });
     }
}


