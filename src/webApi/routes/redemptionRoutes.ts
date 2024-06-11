import express from "express";
import { RedemptionRepository } from "../../persistence/repositories/redemptionRepos";
import { RedemptionModel } from "../../persistence/models/Redemption";
import getRedemptions , { IGetRedemptionResponse }from "../../persistence/services/getRedemptionServices/getRedemptionServices";


const router = express.Router();

//test
router.get("/test", (req, res) => {
	RedemptionRepository.test().subscribe({
		next: (message) => {
			res.send(message);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});


// Search customers by a search query
router.get("/search", async (req, res) => {
	const { query } = req.query;
	const redemption = await RedemptionModel.find({
		$or: [
			{ customer_id: { $regex: query, $options: "i" } },
			{ voucher_id: { $regex: query, $options: "i" } },
		],
	});
	res.json(redemption);
});

// Get all vouchers
 router.get("/", (req, res) => {

	getRedemptions.getRedemptions({} , 10  , 0 ).then((redemptions : IGetRedemptionResponse) => {
		res.json(redemptions.redemptionArray);
	}).catch((error) => {
		res.send(`Ups! There is an error: ${error}`);	
	});
}); 

 // Get redemption by id
 router.get("/:id", (req, res) => {
	 RedemptionRepository.getRedemptionById(req.params.id).subscribe({
		 next: (redemption) => {
			 res.json(redemption);
		 },
		 error: (error) => {
			 res.send(`Ups! There is an error: ${error}`);
		 },
	 });
 });

 // get redemption by voucher id
 router.get("/voucher/:id", (req, res) => {
	 RedemptionRepository.getRedemptionsByCriteria({voucher_id: req.params.id}, 0, 0).subscribe({
		 next: (redemptions) => res.json(redemptions),
		 error: err => res.send(`Error, something went wrong: ${err}`)
	 })
 })

// update redemption
router.put("/:id", (req, res) => {
	RedemptionRepository.updateRedemptionById(req.params.id, req.body.redemption).subscribe({
		next: (redemption) => res.json(redemption),
		error: err => res.send(`Error, there went something wrong ${err}`)
	});
});


export default router;
