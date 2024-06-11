import express from "express";
import { dashboardServices } from "../../persistence/services/dashboardServices/dashboardServices";

const router = express.Router();

router.post("/" , (req , res) => {
    const startTime = new Date();
    dashboardServices.getDashboardInfosPromise().then((dashboardInfos) => {
        res.status(200).json(dashboardInfos);
        console.log("Dashboard infos fetched in " , new Date().getTime() - startTime.getTime() , "ms");
    }).catch((error) => {
        res.status(500).json(error);
    });
});


export default router;

