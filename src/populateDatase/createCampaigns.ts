//populate database with campaigns
import campaignServices from "../persistence/services/CampaignServices/campaignServices";

import mongoose, { connect, Connection, model, Schema, Document } from 'mongoose';




const MONGODB_URI = "mongodb://localhost:27017/vouchers?directConnection=true&serverSelectionTimeoutMS=2000";

const COLLECTION_NAME = 'vouchers';


export const connectToDatabase = (): Promise<Connection> => {
    return new Promise<Connection>((resolve, reject) => {
        connect(MONGODB_URI)
            .then((connection) => {
                resolve(connection.connection);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

connectToDatabase().then(async (connection) => {
    console.log("Connection Successful");
    for (let i = 0; i < 1000; i++) {
        const campaignName = generateRandomString(10);
        const type = i % 2 === 0 ? "AUTO_UPDATE" : "STATIC";
        const description = "automated created campaign" + i ;
        await campaignServices.createCampaignRequest(campaignName, type, description);
    }
})
.catch((error) => {
    console.error(error);
});


function generateRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

