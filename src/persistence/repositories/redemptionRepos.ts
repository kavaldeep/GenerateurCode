import { from, Observable } from "rxjs";
import {RedemptionModel, IRedemption, OptionalIRedemption} from "../models/Redemption";

export interface IRedemptionCriteria {
	voucher_id?: string;
	reward_id?: string;
	date?: Date;
	customer_id?: string | null;
	gift?: {
		amount: number;
	};
	result?: "SUCCESS" | "FAILED";

}
interface RedemptionRepository {
	test(): Observable<string>;
	addRedemption(redemption: IRedemption): Observable<IRedemption | null>;
	getAllRedemptions(): Observable<IRedemption[]>;
	getRedemptionsByCriteria(criteria: IRedemptionCriteria , limit : number , page : number ): Observable<IRedemption[]>;
	getRedemptionById(id: string): Observable<IRedemption[] | null>;
	updateRedemptionById(id: string, redemption: OptionalIRedemption): Observable<IRedemption | null>;
}

export const RedemptionRepository: RedemptionRepository = {
	test: () => from(["Hello World"]),
	addRedemption: (redemption: IRedemption): Observable<IRedemption | null> => {
		return from(RedemptionModel.create(redemption));
	},
	getAllRedemptions: (  ): Observable<IRedemption[]> =>
	{
			return from(RedemptionModel.find().sort({_id : -1 }).exec())	
	},
	getRedemptionsByCriteria: (criteria: IRedemptionCriteria  , limit : number , page : number) : Observable<IRedemption[]> => {
		return from(RedemptionModel.find(criteria).skip( page * limit ).limit(limit).exec())
	},
	getRedemptionById: (id: string): Observable<IRedemption[] | null> => {
		return from(RedemptionModel.find({_id: id}).exec())
	},
	updateRedemptionById: (redemption_id: string, redemption: OptionalIRedemption): Observable<IRedemption | null> => {
		return from(RedemptionModel.findByIdAndUpdate(redemption_id, redemption).exec());
	}
};
