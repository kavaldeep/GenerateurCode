import express from "express";
import rewardServices from "../../persistence/services/rewardServices/addRewardServices";

import { RewardsRepository } from "../../persistence/repositories/rewardRepos";
import RewardsModel from "../../persistence/models/Rewards";
import redeemRewardServices from "../../persistence/services/rewardServices/rewardServices";
const router = express.Router();

router.get("/test", (req, res) => {
	res.send("Well done you successfully called the reward test endpoint");
});

// Get all rewards
router.get("/", (req, res) => {
	RewardsRepository.getAllRewards().subscribe({
		next: (rewards) => {
			res.json(rewards);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// Search rewards by a search query
router.get("/search", async (req, res) => {
	const { query } = req.query;

	const customers = await RewardsModel.find({
		$or: [{ name: { $regex: query, $options: "i" } }],
	});

	res.json(customers);
});

router.get("/addreward", (req, res) => {
	rewardServices
		.addReward(
			rewardServices.rewardyfy(
				req.body.name,
				req.body.type,
				{ sku: req.body.sku, amount: req.body.amount },
				req.body.stock,
				{
					description: req.body.description,
					image_url: req.body.image_url,
				}
			)
		)
		.then((reward) => {
			res.send(true);
		})
		.catch((error) => {
			res.send(false);
		});
});

router.get("/redeemReward", (req, res) => {
	try {
		redeemRewardServices
			.redeemRewardPromise(req.body.rewardId, req.body.customerId)
			.then((result) => {
				res.send(result);
			})
			.catch((error) => {
				res.send(error);
			});
	} catch (error) {}
});

export default router;
