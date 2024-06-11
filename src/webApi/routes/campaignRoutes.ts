import express from "express";
import { CampaignRepository } from "../../persistence/repositories/campaignRepo";
import campaignServices from "../../persistence/services/CampaignServices/campaignServices";
import { VoucherRepository } from "../../persistence/repositories/voucherRepos";
import getCampaignServices from "../../persistence/services/CampaignServices/getCampaignServices";
import getVoucherServices from "../../persistence/services/vouchersServices/getVoucherServices";

const router = express.Router();

// Get all campaigns
router.get("/", (req, res) => {
	getCampaignServices
		.getCampaignsList()
		.then((campaigns) => {
			res.json(campaigns);
		})
		.catch((error) => {
			res.send(`Ups! There is an error: ${error}`);
		});
});

// Get campaign by id
router.get("/:id", (req, res) => {
	getCampaignServices
		.getCampaignById(req.params.id)
		.then((campaign) => {
			res.json(campaign);
		})
		.catch((error) => {
			res.send(error);
		});
});

// Get vouchers by campaign id
/* router.get("/:id/vouchers/page/:page", (req, res) => {
	VoucherRepository.getVoucherByPage(
		parseInt(req.params.page),
		20,
		req.params.id
	).subscribe({
router.get("/:id/vouchers", (req, res) => {
	console.log(req.params.id)
	CampaignRepository.getVouchersByCampaignId(req.params.id).subscribe({
		next: (vouchers) => {
			res.json(vouchers);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
}); */


router.get("/:id/vouchers/page/:page", (req, res) => {
	getVoucherServices.getVouchersByPage(parseInt(req.params.page), 20, req.params.id).
	then((vouchers) => {
		res.send(vouchers);
	})
	.catch((error) => {
		res.send(`Ups! There is an error: ${error}`);
	})
});
// Add campaign
router.post("/", (req, res) => {
	campaignServices
		.createCampaignRequest(
			req.body.campaignName,
			req.body.type,
			req.body.description
		)
		.then((campaign) => {
			res.send(true);
		})
		.catch((error) => {
			res.send(false);
		});
});

// Delete campaign by id
router.delete("/:id", (req, res) => {
	CampaignRepository.deleteCampaignById(req.params.id).subscribe({
		next: (campaign) => {
			res.json({ message: "Deleted successfully" });
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// Create a campaign
router.post("/", (req, res) => {
	campaignServices
		.createCampaignRequest(
			req.body.campaignName,
			req.body.type,
			req.body.description
		)
		.then((campaign) => {
			res.json({ campaign, status: true });
		})
		.catch((error) => {
			res.json({
				message: "Error creating the campaign. Check all fields and data.",
				status: false,
			});
		});
});

// Toggle campaign status
router.put("/toggle/:id", (req, res) => {
	CampaignRepository.toggleCampaignStatus(
		req.params.id,
		req.body.active
	).subscribe({
		next: (campaign) => {
			res.json(campaign);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// Search campaign by name
router.get("/search/:name", (req, res) => {
	console.log(req.params.name);
	getCampaignServices
		.searchCampaignsByName(req.params.name)
		.then((campaigns) => {
			res.json(campaigns);
		})
		.catch((error) => {
			res.send(`Ups! There is an error: ${error}`);
		});
});

//update campaign
router.put("/:id", (req, res) => {
	CampaignRepository.updateCampaignById(req.params.id, req.body.campaign).subscribe({
		next: (campaign) => res.json(campaign),
		error: err => res.send(`Error, there went something wrong ${err}`)
	});
})

export default router;
