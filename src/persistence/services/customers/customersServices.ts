import mongoose from "mongoose";
import { ICustomer , CustomerModel } from "../../models/Customers";
import { connectToDatabase } from "../db";

class CustomerServices{

    private customerify(source_id : string , name : string , email : string , phone : string) 
    : ICustomer {
        return {
            //@ts-ignore
            _id : new mongoose.Types.ObjectId(),
            object : "customer",
            source_id : source_id,
            name : name,
            email : email,
            phone : phone,
            created_at : new Date(),
            updated_at : new Date(),
            loyalty : 0,
            summary : [],
            metadata : {}
        };
    }

    private createCustomer(customer: ICustomer) : Promise<ICustomer> {
        
        return new Promise<ICustomer>((resolve, reject) => {
            CustomerModel.create(customer).then((customer) => {
                resolve(customer);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    public createCustomerRequest(source_id : string , name : string , email : string , phone : string) {
        return new Promise<ICustomer>((resolve, reject) => {
            this.createCustomer(this.customerify(source_id, name, email, phone)).then((customer) => {
                resolve(customer);
            }).catch((error) => {
                reject(error);
            });
        });     
    }
}

const customerServices = new CustomerServices();


export default customerServices;