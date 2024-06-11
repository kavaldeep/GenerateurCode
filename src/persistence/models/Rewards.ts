import mongoose  , { Schema }from 'mongoose';
import { IRedemption, redemptionSchema } from './Redemption';

export type OptionalIReward = Partial<IReward>;

export interface IReward {
    _id: mongoose.Types.ObjectId;
    name: string;
    object : "reward";
    type : "MATERIAL" | "COIN" | "CAMPAIGN";
    parameters : {
        sku : string;
        amount : number;
    };
    active : boolean;
    stock : number;
    attributes : {
        description : string;
        image_url : string;
    };
    redemption : IRedemption[] | null ;
    metadata : Record<string, unknown>;
    created_at : Date;
    updated_at : Date;
}

const rewardsSchema : Schema = new Schema({
    _id: { type: mongoose.Types.ObjectId , required: true , default : new mongoose.Types.ObjectId()},
    object : { type : String , required : true , default : "reward" },
    name : { type : String , required : true },
    type : { type : String , enum : [ "MATERIAL" , "COIN" , "CAMPAIGN"] , required : true },
    parameters : {
        sku : { type : String , required : true },
        amount : { type : Number , required : true }
    },
    active : { type : Boolean , required : true },
    stock : { type : Number , required : true },
    attributes : {
        description : { type : String , required : true },
        image_url : { type : String , required : true }
    },
    redemption : { type : [redemptionSchema] , default : []}, 
    metadata : { type : Object , default : {} },
    created_at : { type : Date , required : true },
    updated_at : { type : Date , required : true }
    
});


const RewardsModel = mongoose.model<IReward>("Rewards" , rewardsSchema);


export default RewardsModel;