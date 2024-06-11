import { ICustomer } from "../../models/Customers";
import { IReward } from "../../models/Rewards";
import { CustomerRepository } from "../../repositories/customersRepos";
import { RewardsRepository } from "../../repositories/rewardRepos";


type Validator = (reward : IReward , customer : ICustomer) => boolean;

export interface IValidRewardResponse{
    isValid : boolean;
    reward? : IReward ;
    customer? : ICustomer;
}
class ValidateRewardServices {

    validateReward( reward_id : string , customer_id : string  , validator : Validator  ) : Promise<IValidRewardResponse> {
        
        return new Promise((resolve , reject) => {
            
            CustomerRepository.getCustomerById(customer_id).subscribe(
                {
                    next : (customer : ICustomer | null) => {
                        if(customer == null){
                            reject("Customer not found");
                        }else{
                              RewardsRepository.getRewardById(reward_id).subscribe(
                                {
                                next : (reward : IReward | null) => {
                                    if(reward){
                                        validator(reward , customer ) ? resolve({
                                             isValid: true,
                                            reward : reward,
                                            customer : customer,
                                        
                                        }) : reject("Reward not valid");
                                    }else{
                                        reject("Reward not found")
                                    }
                                },   
                                }
                            );
                        }
                    },
                }
            )
        });
    }


    validateRewardRules(reward : IReward , customer : ICustomer ) : boolean{

        const isValid =  reward.active
                    && reward.stock > 0
                    && customer.loyalty >= reward.parameters.amount 

        if(!isValid){
                if(!reward.active){
                    console.log( "Reward is not active");
                }
                 if(reward.stock <= 0){
                    console.log("Reward is out of stock");
                }
                 if(customer.loyalty < reward.parameters.amount){
                    console.log("Customer does not have enough loyalty");
                }
        }

        return isValid;

    }


}

const validateRewardServices = new ValidateRewardServices();


export default validateRewardServices;