import voucherServices from "../services/vouchersServices/voucherServices";
import { CampaignRepository } from "../repositories/campaignRepo";

/* voucherServices.voucherCreated$.subscribe({
    next: (voucher) => {
        console.log("lets Go Listner");
        if(voucher) {
            CampaignRepository.updateCampaignVoucherCampaign(voucher.campaignId, voucher.code).subscribe({
                next: (campaign) => {
                    if(campaign) {
                        console.log(campaign);
                    } else {
                        console.log("Campaign not updated");
                    }
                },
            });
        } else {
            console.log("Voucher not created");
        }        
    },
}); */