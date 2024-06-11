import { ICustomer } from "../../models/Customers";
import { IReward } from "../../models/Rewards";
import { CustomerRepository } from "../../repositories/customersRepos";
import { RewardsRepository } from "../../repositories/rewardRepos";
import validateRewardServices from "./validateRewardServices";
import { connectToDatabase } from "../db";



class RedeemRewardService {

    reedmReward( reward_id : string , customer_id : string  ) : Promise<boolean> {
        
        return new Promise((resolve , reject) => {

            validateRewardServices.validateReward(reward_id , customer_id , validateRewardServices.validateRewardRules)
            .then((isValid) => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            })
        });
    }
}




connectToDatabase().subscribe({
    next: () => {
        const redeemRewardService = new RedeemRewardService();
        redeemRewardService.reedmReward("64479a6a45704c8883a33979" , "6433ed480ce52f6d6a11f1cd").then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    },
});