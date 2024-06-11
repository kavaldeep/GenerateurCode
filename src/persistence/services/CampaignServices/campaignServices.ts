import { Observable , Subject } from "rxjs";
import mongoose from "mongoose";
import { CampaignRepository } from "../../repositories/campaignRepo";
import { ICampaign  , CampaignModel} from "../../models/Campaing";
import { connectToDatabase } from "../db";


class CampaignServices{

    private campaignCreatedSubject = new Subject<ICampaign>();
    public campaignCreated$ = this.campaignCreatedSubject.asObservable();

    private campaignCreatedErrorSubject = new Subject<Error>();
    public campaignCreatedError$ = this.campaignCreatedErrorSubject.asObservable();

    private createCampaign(campaign: ICampaign) : Promise<ICampaign> {
        
        return new Promise<ICampaign>((resolve, reject) => {
            CampaignModel.create(campaign).then((campaign) => {
                resolve(campaign);
                this.campaignCreatedSubject.next(campaign);
            }).catch((error) => {
                this.campaignCreatedErrorSubject.next(error);
                reject(error);
            });
        });
    }

    private campaignify(campaignName : string , type : "AUTO_UPDATE" | "STATIC" , description : string) : ICampaign {
        return {
            //@ts-ignore
            _id : new mongoose.Types.ObjectId(),
            name : campaignName,
            object : "campaign",
            type : type,
            description : description,
            active : true,
            voucher_count : 0,
            validation_rules_assignments : null,
            vouchers_generation_status : null,
            vouchers : [],
            metadata : {},
            creation_date : new Date()
        };
    } 
    
    
    /**
     * createCampaignRequest 
     */
    public createCampaignRequest( campaignName : string , type : "AUTO_UPDATE" | "STATIC" , description : string ) {
        return new Promise<ICampaign>((resolve, reject) => {
            this.createCampaign(this.campaignify(campaignName, type, description)).then((campaign) => {
                resolve(campaign);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}


const campaignServices = new CampaignServices();



export default campaignServices;