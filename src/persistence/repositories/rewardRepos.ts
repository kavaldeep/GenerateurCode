import RewardsModel, {IReward, OptionalIReward} from "../models/Rewards";
import { from, Observable } from "rxjs";

interface RewardsRepository {
	test(): Observable<string>;
	//addReward(reward: IRewards): Observable<IRewards | null>;
	getAllRewards(): Observable<IReward[] | null>;
	getRewardById(reward_id: string): Observable<IReward | null>;
	updateRewardById(reward_id: string, reward: OptionalIReward): Observable<IReward | null>;
	deleteRewardById(reward_id: string): Observable<IReward | null>;
}

export const RewardsRepository: RewardsRepository = {
	test: () => from(["Hello World"]),
	getAllRewards: (): Observable<IReward[] | null> =>
		from(RewardsModel.find().exec()),
	getRewardById: (reward_id: string): Observable<IReward | null> =>
		from(RewardsModel.findById(reward_id).exec()),
	updateRewardById: (reward_id: string, reward: OptionalIReward): Observable<IReward | null> => {
		return from(RewardsModel.findByIdAndUpdate(reward_id, reward).exec());
	},
	deleteRewardById: (reward_id: string): Observable<IReward | null> => {
		return from(RewardsModel.findByIdAndRemove(reward_id).exec());
	},
};
