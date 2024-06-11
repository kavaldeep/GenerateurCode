import {connectToDatabase, disconnectFromDatabase} from "../../persistence/services/db";
import campaignServices from "../../persistence/services/CampaignServices/campaignServices";

beforeAll(async () => {
    connectToDatabase().subscribe({});
});

afterAll(async () => {
    disconnectFromDatabase();
});

describe('campaignServices test', function () {

    it('should create a new campaign with given name', async () => {
        const campaignName = "TestingCampaign";
        const description = "This a test description to test the campaign service."
        const type: "AUTO_UPDATE" | "STATIC" = "STATIC";
        const response = await campaignServices.createCampaignRequest(campaignName, type, description);
        expect(response.name).toStrictEqual(campaignName);
        expect(response.description).toStrictEqual(description);
        expect(response.type).toStrictEqual(type);
    });

});