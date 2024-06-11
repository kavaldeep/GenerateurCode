import {connectToDatabase, disconnectFromDatabase} from "../../persistence/services/db";
import {dashboardServices} from "../../persistence/services/dashboardServices/dashboardServices";


beforeAll(async () => {
    connectToDatabase().subscribe({});
});

afterAll(async () => {
    disconnectFromDatabase();
});


describe("get dashboard data test", () => {

    it('should get the numbers of campaigns, vouchers, and customers', async () => {
        const response = await dashboardServices.getDashboardInfosPromise();
        expect(response.campaigns >= 0);
        expect(response.customers >= 0);
        expect(response.vouchers >= 0);
    });
})