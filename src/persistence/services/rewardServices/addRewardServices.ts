import mongoose from "mongoose";
import mongodb from "mongodb";
import RewardsModel , {IReward} from "../../models/Rewards";
import { connectToDatabase } from "../db";


export class RewardsServices {

    public addReward(reward: IReward) : Promise<IReward| null>{
        
        return new Promise<IReward | null>((resolve, reject) => {
            console.log(reward);
            RewardsModel.create(reward).then((reward : IReward) => {
                resolve(reward)
            }).catch((error : any) => {
                reject(error);
            });
        });
    }

    public rewardyfy(
        name : string , 
        type : "MATERIAL" | "COIN" | "CAMPAIGN" ,
        parameters : {
            sku : string ,
            amount : number
        },
        stock : number ,
        attributes : {
            description : string ,
            image_url : string
        }
    ) : IReward{
        return {
            _id : new  mongoose.Types.ObjectId(),
            name : name,
            object : "reward",
            type : type,
            parameters : {
                sku : parameters.sku,
                amount : parameters.amount
            },
            active : true,
            stock : stock,
            attributes : {
                description : attributes.description,
                image_url : attributes.image_url
            },
            created_at : new Date(),
            updated_at : new Date(),
            metadata : {},
            redemption : []
        }
    }
}

const rewardServices = new RewardsServices();



export default rewardServices;