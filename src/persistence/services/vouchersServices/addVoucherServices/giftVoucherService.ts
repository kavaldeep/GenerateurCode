import mongoose from 'mongoose';
import { VoucherServices , IResponseAddVoucherServices } from '../voucherServices';
import { CampaignModel } from '../../../models/Campaing';
import { IGiftVoucher  } from '../../../models/voucherModels/GiftVoucher';


export class GiftVoucherServices extends VoucherServices{

    /**
     * Add a gift voucher to a campaign
     */

    public addGiftVoucher = async (campaign_id: string , amount : number ) : Promise<IResponseAddVoucherServices> => {
        return new Promise<IResponseAddVoucherServices>(async (resolve, reject) => {
            this.addVoucher(this.giftVoucherify(campaign_id , amount)).then((result : IResponseAddVoucherServices) => {
                resolve(result);
            } ).catch((error) => {
                reject(error);
            } )
        });
    }


    /**
     * Turns a camgaignId and amount into a gift voucher
     * @param campaign_id Id of the campaign
     * @param amount amount point
     * @returns
     * 
     */

    public giftVoucherify (campaign_id : string , amount : number  ) : IGiftVoucher{
        var giftVoucher : IGiftVoucher = {
            _id : new mongoose.Types.ObjectId(),
            campaignId : campaign_id,
            type : "GIFT",
            active : true,
            category : "DeveloppementCategory",
            code : this.generateCode(),
            currency : "euros",  
            balance : amount,
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
        return giftVoucher;
    }
}


const giftVoucherServices = new GiftVoucherServices();

export default giftVoucherServices;