import {connectToDatabase, disconnectFromDatabase} from "../../persistence/services/db";
import rewardServices from "../../persistence/services/rewardServices/addRewardServices";


beforeAll(async () => {
    connectToDatabase().subscribe({});
});

afterAll(async () => {
    disconnectFromDatabase();
});

describe('add reward test',  () => {

    it('should create an IReward object', function () {
        const response = rewardServices.rewardyfy(
            "test Reward",
            "COIN",
            {sku: "1234849",amount: 100},
            100,
            {description: "test description", image_url: "test_img_url.test"}
        );
        expect(response._id).not.toBeNull();
        expect(response.name).toEqual("test Reward");
        expect(response.active).toBe(true);
        expect(response.type).toBe("COIN");
        expect(response.stock).toBe(100);
        expect(response.parameters).toEqual({sku: "1234849",amount: 100});
        expect(response.attributes).toEqual({description: "test description", image_url: "test_img_url.test"});
    });

    it('should add a reward', async () => {

        const response = await rewardServices.addReward(
            rewardServices.rewardyfy(
                "test Reward",
                "COIN",
                {sku: "1234849",amount: 100},
                100,
                {description: "test description", image_url: "test_img_url.test"}
            )
        );
        expect(response).not.toBeNull();
        expect(response!._id).not.toBeNull();
        expect(response!.name).toEqual("test Reward");
        expect(response!.active).toBe(true);
        expect(response!.type).toBe("COIN");
        expect(response!.stock).toBe(100);
        expect(response!.parameters).toEqual({sku: "1234849",amount: 100});
        expect(response!.attributes).toEqual({description: "test description", image_url: "test_img_url.test"});
    });


});