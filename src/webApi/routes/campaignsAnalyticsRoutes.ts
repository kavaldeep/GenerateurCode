import express from "express";
import analyticsServices from "../../persistence/services/analyitcsSerivces/analyticsServices";

const router = express.Router();

router.get("/test", (req, res) => {
	res.send("Well done you successfully called the reward test endpoint");

});

router.get("/getAnalytics/:campaignId", (req, res) => {
	analyticsServices
		.getCampaignAnalytics(req.params.campaignId, new Date(req.body.begin_date), new Date(req.body.end_date))
		.then((analytics) => {
			res.send(analytics);
		})
		.catch((error) => {
			res.send(error);
		});
});


export default router;
