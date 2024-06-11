import mongoose from "mongoose";
import { VoucherServices  , IResponseAddVoucherServices} from "../voucherServices";
import { ILoyaltyVoucher }from "../../../models/voucherModels/LoyaltyVoucher";


export class LoyaltyVoucherServices extends VoucherServices{
    
 
    /**
     * Add a loyalty voucher to a campaign 
     * @param campaign_id 
     * @param amount 
     * @returns 
     */
    public addLoyalVoucher = async (campaign_id: string , amount : number ) : Promise<IResponseAddVoucherServices> => {
        return new Promise<IResponseAddVoucherServices>(async (resolve, reject) => {
            this.addVoucher(this.loyalvoucherify(campaign_id , amount)).then((result : IResponseAddVoucherServices) => {
                resolve(result);
            } ).catch((error) => {
                reject(error);
            } )
        });
    }


    /**
     * Turns a camgaignId and amount into a loyalty voucher
     * @param campaign_id Id of the campaign
     * @param amount amount point
     * @returns 
     */
    public loyalvoucherify (campaign_id : string , amount : number  ) : ILoyaltyVoucher{
        var loyalVoucher : ILoyaltyVoucher = {
            _id : new mongoose.Types.ObjectId(),
            campaignId : campaign_id,
            type : "LOYALTY",
            active : true,
            category : "DeveloppementCategory",
            code : this.generateCode(),
            currency : "RewardPoints",  
            redemption : [],
            amount : amount,
            redemptionLimit : 1,
            publish_id : [], 
            expiration_date : new Date('December 31, 9999 23:59:59.999') ,
            start_date : new Date(),
            version: 0.2 ,
            assets : {
                qr :{
                    id : "test",
                    url : "test"
                }
            } ,
            additional_info : "For now we don't have any additional info",
            metadata : {
                "" : ""
            },
        }
       
        return loyalVoucher;
    }

    // public generateCode() : string{
    //     var code = "";
    //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     for (var i = 0; i < 16 ;  i++)
    //       code += possible.charAt(Math.floor(Math.random() * possible.length));
    //     return code;
    // }
}



const loyaltyVoucherServices = new LoyaltyVoucherServices();

export default loyaltyVoucherServices;