import mongoose from "mongoose";
import { Observable  , Subject} from "rxjs";
import { VoucherRepository } from "../../repositories/voucherRepos";
import { CampaignRepository } from "../../repositories/campaignRepo";
import { IVoucher } from "../../models/Voucher";
import { connectToDatabase } from "../db";

class VoucherServices {

    private voucherCreatedSubject = new Subject<IVoucher>();
    public voucherCreated$ = this.voucherCreatedSubject.asObservable();

    private voucherCreatedErrorSubject = new Subject<Error>();
    public voucherCreatedError$ = this.voucherCreatedErrorSubject.asObservable();

    createLoyalityVoucher(campaignId : string , voucherCode : string  , loyaltyPoint : number)
        : Observable<null> {
        const voucher : IVoucher = {
            //@ts-ignore
            _id :  new mongoose.mongo.ObjectId(),
            code : voucherCode,
            campaignId : campaignId,
            category : "testLoyality",
            discount : null,
            gift : null,
            loyalty_card : loyaltyPoint,
            redemption : [],
            type : "LOYALTY",
            start_date : new Date(),
            expiration_date : new Date(),
            active : true,
            additional_info : null,
            assets : {  
                qr : {
                    id : "test",
                    url : "test"
                }
            },
            version : 0.2,
            metadata : {}
        };
        VoucherRepository.addVoucher(voucher).subscribe({
            next: (voucher) => {
                if(voucher) {
                    console.log("voucher created" , voucher);
                    this.voucherCreatedSubject.next(voucher );
                } else {
                    this.voucherCreatedErrorSubject.next(new Error("Voucher not created"));
                }
            },
        });

        return  new Observable<null>;
    }
}

const voucherServices = new VoucherServices();



/**
 * Voucher Created Listners
 */
voucherServices.voucherCreated$.subscribe({
    next: (voucher) => {
        if(voucher) {
            console.log("Voucher created" , voucher);
            CampaignRepository.updateCampaignVoucherCampaign(voucher.campaignId, voucher.code).subscribe({
                next: (campaign) => {
                    if(campaign) {
                        console.log(campaign);
                    } else {
                        console.log("Campaign not updated");
                    }
                },
            });
        } else {
            console.log("Voucher not created");
        }        
    },
});

/* connectToDatabase().subscribe({
    next: (db) => {
        new VoucherServices().createLoyalityVoucher("testCampaignId", "testVoucherCode", 100);
    },
});
 */
export default voucherServices;