import {connectToDatabase, disconnectFromDatabase} from "../../persistence/services/db";
import getCampaignServices from "../../persistence/services/CampaignServices/getCampaignServices";
import {ObjectId} from "mongodb";
import {ICampaign} from "../../persistence/models/Campaing";
import mongoose from "mongoose";


beforeAll(async () => {
    connectToDatabase().subscribe({});
});

afterAll(async () => {
    disconnectFromDatabase();
});


describe("test getting campaign", () => {

    const campaignId = "6466170512e7366359fc4252";

    it('should get all campaign', async () => {
        const response = await getCampaignServices.getCampaignsList();
        expect(response.length >= 0);
    });

    it('should get campaign by id', async () => {
        const response = await getCampaignServices.getCampaignById(campaignId);
        expect(response._id).toStrictEqual(new ObjectId(campaignId));
    });

    it('should get 0 campaign by id', async () => {
        expect.assertions(1);
        await expect(getCampaignServices.getCampaignById("6466170512e1111159fc4252"))
            .rejects.toEqual("No campaigns found");
    });

    it('should get campaign by name', async () => {
        const response = await getCampaignServices.searchCampaignsByName("FirstCamaign");
        response.forEach((campaign => {
            expect(campaign.name).toBe("FirstCamaign")
        }))
    });

    it('should get 0 campaign by name', async () => {
        expect.assertions(1);
        await expect(getCampaignServices.searchCampaignsByName("Testing no campaigns by name"))
            .rejects.toEqual("No campaigns found");
    });

    it('should get 0 campaign by name', async () => {
        expect.assertions(1);
        await expect(getCampaignServices.searchCampaignsByName("TestFalseCampaignName"))
            .rejects.toEqual("No campaigns found");
    });

    it('should return a map of campaigns', function () {
        let arrayOfCampaigns: ICampaign[] = [
            {
                _id: new mongoose.Types.ObjectId("7777170512e11111111c4252"),
                name: "Campaign two",
                object: "object two",
                type: "STATIC",
                description: null,
                active: true,
                vouchers: [],
                voucher_count: 4,
                creation_date: new Date(),
                validation_rules_assignments: null,
                vouchers_generation_status: null,
                metadata: {}
            },
            {
                _id: new mongoose.Types.ObjectId("6466170512e11177777c4252"),
                name: "Campaign three",
                object: "object three",
                type: "AUTO_UPDATE",
                description: null,
                active: true,
                vouchers: [],
                voucher_count: 2,
                creation_date: new Date(),
                validation_rules_assignments: null,
                vouchers_generation_status: null,
                metadata: {}
            },
            {
                _id: new mongoose.Types.ObjectId("6466170512e11111111c4252"),
                name: "Campaign one",
                object: "object one",
                type: "STATIC",
                description: null,
                active: true,
                vouchers: [],
                voucher_count: 1423432,
                creation_date: new Date(),
                validation_rules_assignments: null,
                vouchers_generation_status: null,
                metadata: {}
            }
        ];

        const response = getCampaignServices.trimCampaignData(arrayOfCampaigns);
        for (let i = 0; i < 3; i++) {
            expect(response[i]._id).toBe(arrayOfCampaigns[i]._id);
            expect(response[i].name).toBe(arrayOfCampaigns[i].name);
            expect(response[i].type).toBe(arrayOfCampaigns[i].type);
            expect(response[i].voucher_count).toBe(arrayOfCampaigns[i].voucher_count);
        }
    });

    it('should return 0 map of campaigns', function () {
        const response = getCampaignServices.trimCampaignData([]);
        expect(response.length = 0);
    });

})