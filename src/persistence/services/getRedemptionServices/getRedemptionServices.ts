import { IRedemption } from "../../models/Redemption";
import { IRedemptionCriteria, RedemptionRepository } from "../../repositories/redemptionRepos";

export interface  IGetRedemptionResponse {
    redemptionArray: IRedemption[]
};


class GetRedemptionsServices {
    
    public getRedemptions= async (  criteria : IRedemptionCriteria , limit : number , page : number ) : Promise<IGetRedemptionResponse> => {
        return new Promise((resolve, reject) => {
            RedemptionRepository.getRedemptionsByCriteria( criteria , limit , page ).subscribe({
                next: (redemptions) => {
                    resolve({redemptionArray : redemptions});
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    }
}



const getRedemptions = new GetRedemptionsServices();

export default getRedemptions;