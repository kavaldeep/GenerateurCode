import mongoose from "mongoose";
import {IVoucher, OptionalIVoucher, VoucherModel} from "../../models/Voucher";
import  { ILoyaltyVoucher , LoyaltyVoucherModel } from "../../models/voucherModels/LoyaltyVoucher";
import { CampaignModel } from "../../models/Campaing";
import voucherServices from "./voucherServices";
import {from} from "rxjs";

export interface IVoucherBulkResponse  {
    total : Number,
}
class BulkVoucherService {

    public addBulkVouchers = async (vouchers: IVoucher[] | ILoyaltyVoucher[] ) : Promise<IVoucherBulkResponse> => {
        return new Promise<IVoucherBulkResponse>(async (resolve, reject) => {
            // show only the  _id in an string array
            console.log("The length of voucher to add is ", vouchers.length);
            const session = await mongoose.startSession();
           session.startTransaction();
           CampaignModel.findByIdAndUpdate(vouchers[0].campaignId, { $inc: { voucher_count: vouchers.length }, $push: { vouchers: { $each: vouchers.map((voucher) => voucher._id.toString()) } } }, { session: session, new: true })
           .then((campaign) => {
                if (campaign == null) {
                    console.log("Campaign not found session aborted", vouchers[0].campaignId);
                    throw new Error("CAMPAIGN_NOT_FOUND");
                } else {
                    LoyaltyVoucherModel.insertMany(vouchers, { session: session }).then((vouchers) => {
                        console.log("Voucher created", vouchers.length);
                        session.commitTransaction()
                        resolve({
                            total: vouchers.length
                        });
                    }).catch((error) => {
                        console.log("Error creating voucher session aborted", vouchers, error);
                        throw new Error("VOUCHER_CREATION_ERROR");
                    });
                }
           }).catch((error) => {
                console.log("Error updating campaign", error);
                session.abortTransaction();
                session.endSession();
                reject({
                    total: 0
                });
           });
        });
    }

    generateBlukVouchers = (campaign_id: string, amount: number, count: number) : IVoucher[] => {
        let vouchers: IVoucher[] = [];
        for (let i = 0; i < count; i++) {
            vouchers.push(voucherServices.loyalvoucherify(campaign_id, amount));
        }
        return vouchers;
    }

    public addBulkLoyalVouchers = async (campaign_id: string, amount: number, count: number) : Promise<IVoucherBulkResponse> => {
        return new Promise<IVoucherBulkResponse>(async (resolve, reject) => {
            this.addBulkVouchers(this.generateBlukVouchers(campaign_id, amount, count)).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public updateBulkVouchers = async (bulkVoucherIDs: string[], newContent: OptionalIVoucher) => {
        return from(VoucherModel.updateMany({ "_id": {"$in": bulkVoucherIDs}}, newContent).exec());
    }
}

const bulkVoucherService = new BulkVoucherService();

 
export default bulkVoucherService;