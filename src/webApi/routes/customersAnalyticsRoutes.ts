import express from "express";
import analyticsServices from "../../persistence/services/analyitcsSerivces/analyticsServices";

const router = express.Router();

router.get("/getAnalytics/:customerId", (req, res) => {
    analyticsServices
        .getCustomerAnalytics(req.params.customerId)
        .then((analytics) => {
            res.send(analytics);
        })
        .catch((error) => {
            res.send(error);
        })
})

export default router;