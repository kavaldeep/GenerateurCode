import { VoucherRepository } from "../../repositories/voucherRepos";
import { IVoucher, VoucherModel } from "../../models/Voucher";
import { voucherCampaignAggregation } from "../../mongoAggregation/voucherPageAggregation";

class GetVoucherServices{

    public getVouchersByPage(page : number , limit : number , campaignId?: string ) : Promise<IVoucher[]>{
        return new Promise<IVoucher[]>(async (resolve, reject) => {

            if(campaignId){
                VoucherRepository.getVoucherByPage(page , limit , campaignId ).subscribe({
                    next: (vouchers) => {
                        vouchers.length > 0 ?
                        resolve(vouchers)
                        :
                        reject("No vouchers found");
                        
                    },
                })
            }
            else{
                VoucherRepository.getVoucherByPage(page ,  limit  ).subscribe({
                    next: (vouchers) => {

                        vouchers.length > 0 ?
                            resolve(vouchers)
                            :
                            reject("No vouchers found");

						vouchers.length > 0
							? resolve(vouchers)
							: reject("No vouchers found");
					},
				});
			}
		});
	}

    public getVouchersAggregationByPage(page : number , limit : number  ) : Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
    var startTimestamp = new Date().getTime();
            const pipeline = voucherCampaignAggregation(page , limit);
                // @ts-ignore
                VoucherModel.aggregate(pipeline).
                then((vouchers : any) => {
                    var endTimestamp = new Date().getTime();
                    console.log("Total time to get the vouchers: " + (endTimestamp - startTimestamp) + "ms");
                    console.log("Total vouchers: " + vouchers.length);
                    resolve(vouchers);
                }).catch((err : any ) => {
                    reject(err);
                    console.log(err);
                }); 
            }
    )}
}

const getVoucherServices = new GetVoucherServices();

export default getVoucherServices;
