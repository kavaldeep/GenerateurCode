import mongoose from "mongoose";
import { CampaignModel, ICampaign } from "../../models/Campaing";
import { ILoyaltyVoucher,  LoyaltyVoucherModel }from "../../models/voucherModels/LoyaltyVoucher";
import { IVoucher } from "../../models/Voucher";
import { IDiscountVoucher , DiscountVoucherModel } from "../../models/voucherModels/DiscountVoucher";
import { IGiftVoucher , GiftVoucherModel  } from "../../models/voucherModels/GiftVoucher";

export interface IResponseAddVoucherServices {
    campaign : ICampaign,
    voucher : IVoucher
}
export class VoucherServices {
    public addVoucher = async (voucher :  ILoyaltyVoucher | IDiscountVoucher | IGiftVoucher ) : Promise<IResponseAddVoucherServices> => {
        
        //check the interface of the voucher and assign the right model
        var voucherModel : any;
        switch(voucher.type){
            case "LOYALTY" :
                voucherModel = new LoyaltyVoucherModel(voucher);
                break;
            case "DISCOUNT" :
                voucherModel = new DiscountVoucherModel(voucher);
                break;
            case "GIFT" :
                voucherModel = new GiftVoucherModel(voucher);
                break;
            default :
                throw new Error("The voucher type is not valid");
        }
        return new Promise<IResponseAddVoucherServices>(async (resolve, reject) => {
            const session = await  mongoose.startSession();
            
            session.startTransaction();
            try {
             CampaignModel.findByIdAndUpdate( voucher.campaignId , { $inc : { voucher_count : 1 }  , $push : { vouchers : voucher._id.toString ()}} , { session : session , new : true })
             .then( ( campaign ) => {
                if( campaign == null ){
                    throw new Error("The result of the campaign is null " + voucher.campaignId);
                }else{
                      voucherModel.save( {session : session}).then((voucher : any )  => {
                        console.log("Voucher created" , voucher);
                        session.commitTransaction()
                        resolve({campaign : campaign , voucher : voucher});
                    }).catch(( error : any  ) => {
                        
                        throw new Error("Error creating voucher session aborted"  + voucher  +  error);
                    }); 
                }
             }).catch((error) => {
                throw new Error(" And error occurred during updating the camapaign with the id  " + voucher.campaignId 
                + " the error is "
                + error);
             })
            }catch{
                session.abortTransaction();
                session.endSession();
                console.log("Error creating voucher session aborted" , voucher );
                reject({
                    campaign : null,
                    voucher : null
                })
            }finally{
            }
            
             
        });
    }
    
 
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
    

    public generateCode(possible?: string, codeLength = 16) : string{
        let code = "";
        if (typeof possible === 'undefined') {
            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        }
        for (var i = 0; i < codeLength ;  i++)
          code += possible.charAt(Math.floor(Math.random() * possible.length));
        return code;
    }
}



const voucherServices = new VoucherServices();

export default voucherServices;