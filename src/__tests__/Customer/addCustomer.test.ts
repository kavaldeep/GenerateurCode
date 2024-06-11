import {connectToDatabase, disconnectFromDatabase} from "../../persistence/services/db";
import customerServices from "../../persistence/services/customers/customersServices";

beforeAll(async () => {
    connectToDatabase().subscribe({});
});

afterAll(async () => {
    disconnectFromDatabase();
});

describe("add customer test", () => {

    it('should add a new customer', async () => {
        let source_id = "123456701234567";
        let name = "test name";
        let email = "test@test.de";
        let phone = "+491234567890";

        const response = await customerServices.createCustomerRequest(source_id, name, email, phone);
        expect(response.name).toBe(name);
        expect(response.source_id).toBe(source_id);
        expect(response.email).toBe(email);
        expect(response.phone).toBe(phone);

    });
})