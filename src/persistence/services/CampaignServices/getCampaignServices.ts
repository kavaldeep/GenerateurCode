import { ICampaign } from "../../models/Campaing";
import { CampaignRepository } from "../../repositories/campaignRepo";
import { connectToDatabase } from "../db";

class GetCampaignServices {
	public getCampaignsList(): Promise<any[]> {
		var startTime = new Date();
		return new Promise<any[]>(async (resolve, reject) => {
			CampaignRepository.getAllCampaigns("-vouchers").subscribe({
				next: (campaigns) => {
					console.log(
						" It took " +
							(new Date().getTime() - startTime.getTime()) +
							" milliseconds."
					);
					campaigns.length > 0
						? resolve(campaigns)
						: reject("No campaigns found");
				},
				error: (error) => {
					console.log(error);
				},
			});
		});
	}

	public getCampaignById(id: string): Promise<ICampaign> {
		return new Promise<ICampaign>(async (resolve, reject) => {
			CampaignRepository.getCampaignById(id, "-vouchers").subscribe({
				next: (campaign) => {
					campaign !== null ? resolve(campaign) : reject("No campaigns found");
				},
				error: (error) => {
					console.log(error);
				},
			});
		});
	}

	public searchCampaignsByName(name: string): Promise<any[]> {
		return new Promise<any[]>(async (resolve, reject) => {
			CampaignRepository.searchCampaignByName(name, "-vouchers").subscribe({
				next: (campaigns) => {
					campaigns.length > 0
						? resolve(campaigns)
						: reject("No campaigns found");
				},
				error: (error) => {
					console.log(error);
				},
			});
		});
	}
	public trimCampaignData(campaigns: ICampaign[]): ICampaign[] {
		campaigns.map((campaign) => {
			return {
				id: campaign._id,
				name: campaign.name,
				type: campaign.type,
				voucher_count: campaign.voucher_count,
			};
		});

		return campaigns;
	}
}

const getCampaignServices = new GetCampaignServices();

export default getCampaignServices;
