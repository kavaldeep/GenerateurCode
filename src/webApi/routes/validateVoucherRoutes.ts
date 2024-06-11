import express from "express";
import validateLoyaltyVoucherService from "../../persistence/services/validateServices/validateLoyalVoucherService";


const router = express.Router();


router.post("/test" , (req , res) => {
    res.send("Well done you successfully called the validate test endpoint");
})

router.post("/" , (req , res) => {
    console.log("validate voucher endpoint called" , req.body.code);
   /*  validateVoucherService.validatePromise(req.body.code , req.body.customerId).then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    }) */

    validateLoyaltyVoucherService.validatePromise(req.body.code , req.body.customerId).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

})


export default router;