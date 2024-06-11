import RewardsModel, { IReward } from "../../models/Rewards";

class RewardServices {
	public getRewards(): Promise<IReward[] | null> {
		return new Promise<IReward[] | null>((resolve, reject) => {
			RewardsModel.find()
				.exec()
				.then((rewards: IReward[]) => {
					resolve(rewards);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}


}
