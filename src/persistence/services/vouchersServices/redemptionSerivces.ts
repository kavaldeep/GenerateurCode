import mongoose from "mongoose";
import { Observable} from "rxjs";
import { VoucherRepository } from "../../repositories/voucherRepos";
import { IRedemption , RedemptionModel } from "../../models/Redemption";
import { IVoucher, VoucherModel } from "../../models/Voucher";
import { CustomerModel } from "../../models/Customers";

export interface IRedemptionRepsonse {
	msg : string;
}
/**
 * TODO Later refactor the code
 * this code is fucked up
 */
export default class RedemptionServices {

	   public redeemLoyalityVoucher = async ( voucherCode: string, customer_id: string) : Promise<IRedemptionRepsonse> => {
		return new Promise<IRedemptionRepsonse>(async (resolve, reject) => {
		const session = await  mongoose.startSession();
		session.startTransaction();
		
		const voucher =  VoucherRepository.getVoucherByCode(voucherCode);

			voucher.subscribe({
				next:  (voucher) => {
					try {
						if( voucher == null || voucher?.length == 0){
						throw new Error("VOUCHER_NOT_FOUND_WITH_CODE " + voucherCode);
					}else{
						if(voucher[0].type == "LOYALTY" && voucher[0].active == true && voucher[0].redemption.length == 0){
							console.log("The voucher can be redmeed");
							var redemption : IRedemption= this.getRedemption( voucher[0] , customer_id);
					
							VoucherModel.findByIdAndUpdate(voucher[0]._id , { $push : {redemption : redemption }}, {session : session , new : true}).then((voucher) => {
								console.log("Voucher transaction created" );
								new RedemptionModel(redemption).save({session : session}).then((redemption) => {
															console.log("Redemption  transaction created" );
															CustomerModel.findOneAndUpdate({_id : customer_id} , { $push : { summary : redemption} , $inc : { loyalty : voucher?.amount }}, {session : session , new : true})
															.then((customer) => {
															if(customer == null){
																console.log("Customer not found with id" , customer_id);
																throw new Error("CUSTOMER_NOT_FOUND_WITH_ID " + customer_id);
															}else{
															console.log(" Customer transaction created" );
															session.commitTransaction()
															resolve({msg : "THE_VOUCHER_HAS_BEEN_REDEEMED_SUCCESSFULLY"});
															}
															}).catch((error) => {
																console.log("Error_UPDATING_CUSTOMER" , error);
														//	session.abortTransaction();
																session.endSession();
																reject({msg : "ERROR_UPDATING_CUSTOMER"});
															});
															
								}).catch((error) => {
									throw new Error("ERROR_CREATING_REDEMPTION");
							});
							}).catch((error) => {
								console.log("ERROR_UPDATING_VOUCHER" , error);
								throw new Error("ERROR_UPDATING_VOUCHER");
							}); 

						}else{
							console.log("session AbortedVoucher is not valid" , voucher[0].type , voucher[0].active , voucher[0].redemption.length);
							throw new Error("SESSION_ABORTED_VOUCHER_CANNOT_BE_REDEEMED");
						}
					}
					}
					catch(error : any   ){
						reject({
							msg : error.message
						});
						session.abortTransaction();
						session.endSession();
						console.log("the voucher cannont redmeed"  , error.message   );
					}
					finally{
					}

				},
				error : (error) => {
					console.log("Error finding voucher session aborted" , error);
					reject({
						msg : "ERROR_FINDING_VOUCHER"
					});
				}
			});
		
	});
	}

	private getRedemption( voucher : IVoucher , customer_id : string) : IRedemption{
		return {
					_id: new mongoose.Types.ObjectId(),
					object: "redemption",
					voucher_id: voucher._id.toString(),
					type: "LOYALTY",
					date: new Date(),
					customer_id: customer_id,
					gift: {
						amount: voucher.amount,
					},
					result: "SUCCESS",
					failure_reason: null,
					tracking_id: null,
					order_id: null,
					version : 0 ,
					metadata: {},
				};
	}


	public redeemLoyalityVoucherObserver = (customer_id : string , voucherCode : string) => {
		return new Observable((observer) => {
			
					this.redeemLoyalityVoucher(voucherCode , customer_id).then((result) => {
						observer.next(result);
						observer.complete();
					}).catch((error) => {
						observer.error(error);
					})
				}
		)
	}

	redeemLoyalityVoucherPromise = (customer_id : string , voucherCode : string) => {
		return new Promise((resolve , reject) => {
				try {
					this.redeemLoyalityVoucher(voucherCode , customer_id).then((result) => {
						result ? resolve(result) : reject(result);
					}).catch((error) => {
						reject(error);
					})
				}
			 catch (error) {
				reject(error);
			}
		}
		)
		
	}
}
