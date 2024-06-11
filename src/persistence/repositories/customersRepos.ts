import {CustomerModel, ICustomer, OptionalICustomer} from "../models/Customers";
import {from, map, Observable} from "rxjs";
import {IRedemption} from "../models/Redemption";

export interface ICustomerCriteria {
	name?: string;
	source_id?: string;
	email?: string;
	phone?: string;
}

interface CustomerRepository {
	test(): Observable<string>;
	getAllCustomers(): Observable<ICustomer[]>;
	addCustomer(customer: ICustomer): Observable<ICustomer | null>;
	updateSummary(redemption: IRedemption): Observable<ICustomer | null>;
	getCustSummary(customer_id: string): Observable<IRedemption[] | null>;
	updateLoyalty(
		customer_id: string,
		amount: Number,
		option: "ADD" | "REMOVE"
	): Observable<ICustomer | null>;
	redeemAndLoyalty(redemption: IRedemption): Observable<ICustomer | null>;
	getCustomerById(customer_id: string): Observable<ICustomer | null>;
	updateCustomerById(customer_id: string, customer: OptionalICustomer): Observable<ICustomer | null>;
	getCustomerByCriteria(customerCriteria: ICustomerCriteria, limit : number , page : number): Observable<ICustomer[] | null>;
}

export const CustomerRepository: CustomerRepository = {
	test: () => from(["Hello World"]),
	getAllCustomers: (): Observable<ICustomer[]> =>
		from(
			CustomerModel.find(
				{},
				{ _id: 1, name: 1, email: 1, created_at: 1 }
			).exec()
		),
	addCustomer: (customer: ICustomer): Observable<ICustomer | null> =>
		from(CustomerModel.create(customer)),
	updateSummary: (redemption: IRedemption): Observable<ICustomer | null> => {
		return from(
			CustomerModel.findByIdAndUpdate(
				redemption.customer_id,
				{
					$push: { summary: redemption },
					$inc: { loyalty: redemption.gift.amount },
				},
				{ new: false }
			).exec()
		);
	},

	getCustSummary: (customer_id: string): Observable<IRedemption[] | null> => {
		return from(CustomerModel.findById(customer_id).sort({_id : -1 }).exec()).pipe(
			map((customer) => {
				if (customer) {
					return customer.summary;
				} else {
					return null;
				}
			})
		);
	},

	updateLoyalty: (
		customer_id: string,
		amount: Number,
		option: "ADD" | "REMOVE"
	): Observable<ICustomer | null> => {
		if (option === "ADD") {
			return from(
				CustomerModel.findByIdAndUpdate(
					customer_id,
					{ $inc: { loyalty: amount } },
					{ new: false }
				).exec()
			);
		} else {
			return from(
				CustomerModel.findByIdAndUpdate(
					customer_id,
					{ $inc: { loyalty: amount } },
					{ new: false }
				).exec()
			);
		}
	},

	redeemAndLoyalty: (redemption: IRedemption): Observable<ICustomer | null> => {
		return from(
			CustomerModel.findByIdAndUpdate(
				redemption.customer_id,
				{
					$push: { summary: redemption },
					$inc: { loyalty: redemption.gift.amount },
				},
				{ new: false }
			).exec()
		);
	},

	getCustomerById: (customer_id: string): Observable<ICustomer | null> => {
		return from(CustomerModel.findById(customer_id).exec());
	},

	updateCustomerById: (customer_id: string, customer: OptionalICustomer): Observable<ICustomer | null> => {
		return from(CustomerModel.findByIdAndUpdate(customer_id, customer).exec());
	},

	getCustomerByCriteria: (customerCriteria: ICustomerCriteria, limit : number , page : number): Observable<ICustomer[] | null> => {
		return from(CustomerModel.find(customerCriteria).skip( page * limit ).limit(limit).exec())
	}
};
