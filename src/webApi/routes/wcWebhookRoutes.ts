import express from "express";
import {generateSHA256Hash} from "../../security/hash/checkHash";
import wcCouponServices from "../../persistence/services/wcCouponServices/wcCouponServices";

const router = express.Router();

router.post("/redeemCoupon", (req, res) => {
    if (req.headers["x-wc-webhook-signature"] === generateSHA256Hash(req.rawBody) && req.body["coupon_lines"] != null) {
        wcCouponServices.parseBody(req.body);
    }
    res.send("done");
});

export default router;