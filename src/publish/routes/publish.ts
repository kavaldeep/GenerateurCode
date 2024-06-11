import express from "express";
import addPublishServices from "../../persistence/services/publishServices/addPublishServices";

const router = express.Router();


router.post("/" , (req , res) => {
    try{
        addPublishServices.publishPromise(req.body.voucher_id , { channel : req.body.channel , mail : req.body.mail})
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            console.log(error);
            res.json(error);
        });
    }catch(error){
        console.log(req.body);
        res.json(error);
    }
});
 

export default router;