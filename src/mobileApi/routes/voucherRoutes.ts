import express from "express";
import RedemptionServices from "../../persistence/services/vouchersServices/redemptionSerivces";
import { VoucherRepository } from "../../persistence/repositories/voucherRepos";
const router = express.Router();

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

router.get("/test", (req, res) => {
	res.send("you ve successfully reached the test endpoint");
});

//reedem voucher
router.post("/redeem", (req, res) => {
	console.log(req.body.voucherCode, req.body.customerId);

	new RedemptionServices()
		.redeemLoyalityVoucher(req.body.voucherCode, req.body.customerId)
		.then((result) => {
			console.log("---------the result is " , result);
			res.send(result);
		})
		.catch((error) => {
			console.log("--------the error is " , error);
			res.send(error);
		});
});

// Get voucher by code
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

export default router;
