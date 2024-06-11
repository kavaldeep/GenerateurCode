import mongoose from "mongoose";
import { VoucherModel } from "../../models/Voucher";
import { CampaignModel } from "../../models/Campaing";
import { CustomerModel } from "../../models/Customers";
import { connectToDatabase } from "../db";


interface IDashboardResponse {
    vouchers : number ,
    campaigns : number ,
    customers : number
}


export class DashboardServices {
    
        public getDashboardInfosPromise = async () : Promise<IDashboardResponse> => {
            return new Promise<IDashboardResponse>( async (resolve , reject) => {
              try{
                    const vouchers = await VoucherModel.countDocuments({});
                    const campaigns = await CampaignModel.countDocuments({});
                    const customers = await CustomerModel.countDocuments({});

                   resolve({
                        vouchers : vouchers ,
                        campaigns : campaigns ,
                        customers : customers
                    });
                }catch(error){
                    console.log("Error getting dashboard infos" , error);
                    reject(error);
                }
            });
        }
}


export const dashboardServices = new DashboardServices();