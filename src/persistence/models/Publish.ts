import mongoose ,  { Schema } from "mongoose";

export enum channelTypes {
    "WEB",
    "API",
    "MAIL",
    "WOOCOMMERCE"
}
export interface IPublish {
    
    _id: mongoose.Types.ObjectId;
    channel:  channelTypes ;
    voucher_id: Schema.Types.ObjectId;
    publishDate: Date;
    customerID?: Schema.Types.ObjectId;
    mail ?: string;
    web ?: string;
    published : boolean;
    version: number;
}


export const PublishSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true , default: new mongoose.Types.ObjectId() },
    channel: { type: String , enum : channelTypes , required: true },
    voucher_id: { type: Schema.Types.ObjectId , required: true },
    publishDate: { type: Date , required: true },
    customerID: { type: Schema.Types.ObjectId , default: null },
    mail: { type: String , default: null },
    web: { type: String , default: null },
    version: { type: Number , default: 0 },
    published : { type: Boolean , default: false }
});



export const PublishModel = mongoose.model<IPublish>(
    "Publish",
    PublishSchema
);