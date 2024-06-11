import express from "express";
import { VoucherRepository } from "../../persistence/repositories/voucherRepos";
import redemptionServices , { IRedemptionRepsonse }from "../../persistence/services/vouchersServices/redemptionSerivces";
import voucherServices from "../../persistence/services/vouchersServices/voucherServices";
import getVoucherServices from "../../persistence/services/vouchersServices/getVoucherServices";
import bulkVoucherService from "../../persistence/services/vouchersServices/bulkVoucherAddSerivces";
const router = express.Router();

// Get all vouchers
router.get("/", (req, res) => {
	VoucherRepository.getAllVouchers().subscribe({
		next: (vouchers) => {
			res.json(vouchers);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});



router.get("/page/:number" , (req , res) => {
	getVoucherServices.getVouchersAggregationByPage( parseInt(req.params.number) , 20).then((vouchers) => {
			res.status(200)
			.set("Content-Type", "application/json")
			.set("Cache-Control", "no-cache")
			.json(vouchers);
	})
	.catch((error) => {
		res.send(`Ups! There is an error: ${error}`);
	});

});

// Get voucher by id
router.get("/:id", (req, res) => {
	VoucherRepository.getVoucherById(req.params.id).subscribe({
		next: (voucher) => {
			res.json(voucher);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// Search voucher by code
router.get("/search/:code", async (req, res) => {
	VoucherRepository.searchVoucherByCode(req.params.code).subscribe({
		next: (voucher) => {
			res.json(voucher);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// Delete a voucher by id
router.delete("/:id", (req, res) => {
	VoucherRepository.deleteVoucherById(req.params.id).subscribe({
		next: (voucher) => {
			res.json({ message: "Deleted successfully" });
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

//reedem voucher
router.post("/redeem", (req, res) => {
	console.log(req.body.voucherCode, req.body.customerId);

	new redemptionServices()
		.redeemLoyalityVoucher(req.body.voucherCode, req.body.customerId)
		.then((result) => {
			console.log(result);
			res.status(200).json({ message: "Redeemed successfully", status: true });
		})
		.catch((error : IRedemptionRepsonse) => {
			console.log(error);
			res.json({
				message: error.msg,
				status: false,
			});
		});
});

// Get vouchers by campaign
router.get("/campaign/:id", (req, res) => {
	VoucherRepository.getVouchersByCampaignId(req.params.id).subscribe({
		next: (vouchers) => {
			res.json(vouchers);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// Add voucher
router.post("/", (req, res) => {
	voucherServices
		.addLoyalVoucher(req.body.campaign_id, req.body.amount)
		.then((result) => {
			res.send(result);
		})
		.catch((error) => {
			res.send(`Ups! There is an error: ${error}`);
		});
});

// Add bulk vouchers
router.post("/addBulkVouchers", (req, res) => {
	console.log("addBulkVoucher" + req.body.campaign_id);
	bulkVoucherService
		.addBulkLoyalVouchers(req.body.campaign_id, req.body.amount, req.body.count)
		.then((result) => {
			res.json({ result, status: true });
		})
		.catch((error) => {
			res.json({
				message: "Error creating the campaign. Check all fields and data.",
				status: false,
			});
		});
});

// Toggle voucher
router.put("/toggle/:id", (req, res) => {
	VoucherRepository.toggleVoucherStatus(
		req.params.id,
		req.body.active
	).subscribe({
		next: (voucher) => {
			res.json(voucher);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// update voucher
router.put("/:id", (req, res) => {
	VoucherRepository.updateVoucherById(req.params.id, req.body.voucher).subscribe({
		next: (voucher) => res.json(voucher),
		error:err => res.send(`Error, there went something wrong ${err}`)
	});
});

//change amount
router.post("/:id/amount", (req, res) => {
	VoucherRepository.updateVoucherAmountById(req.params.id, req.body.amount).subscribe({
		next: (voucher) => res.json(voucher),
		error: err => res.send(`Error, there went something wrong ${err}`)
	});
});


export default router;
