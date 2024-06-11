import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import  "../security/authentification/passport-config"
import voucherRoutes from "./routes/voucherRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import customerRoutes from "./routes/customerRoutes";
import redemptionRoutes from "./routes/redemptionRoutes";
import rewardRoutes from "./routes/rewardRoutes";
import validateVoucherRoutes from "./routes/validateVoucherRoutes";
import campaignAnalyticsRoutes from "./routes/campaignsAnalyticsRoutes";
import authRoutes from "./routes/authRoutes";
import dashboartRoutes from "./routes/dashboartRoutes";
import { connectToDatabase } from "../persistence/services/db";
import customersAnalyticsRoutes from "./routes/customersAnalyticsRoutes";
import wcWebhookRoutes from "./routes/wcWebhookRoutes";

const PORT = 3000;
const app = express();
var cors = require("cors");
var hostname = "backendpromotion.kavaldeep.com";

app.use(passport.initialize());
connectToDatabase().subscribe({
	next: (connection) => {
		console.log("Connected to database");
	},
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
	verify: function (req, res, buf, encoding) {
		req.rawBody = buf;
	}
}));


app.use("/api/vouchers",  passport.authenticate('jwt' , {session : false}) , voucherRoutes);
app.use("/api/campaigns" ,  passport.authenticate('jwt' , {session : false}) ,campaignRoutes);
app.use("/api/customers"  ,  passport.authenticate('jwt' , {session : false}) ,  customerRoutes);
app.use("/api/redemptions" ,  passport.authenticate('jwt' , {session : false}) , redemptionRoutes);
app.use("/api/rewards",  passport.authenticate('jwt' , {session : false}) ,  rewardRoutes);
app.use("/api/campaignsAnalytics",   passport.authenticate('jwt' , {session : false}) ,campaignAnalyticsRoutes);
app.use("/api/customersAnalytics", passport.authenticate('jwt', {session: false}) , customersAnalyticsRoutes);
app.use("/api/validateVoucher",  passport.authenticate('jwt' , {session : false}) , validateVoucherRoutes);
app.use("/api/dashboard"  , dashboartRoutes);
app.use("/api/auth" , authRoutes );
app.use("/api/wcwebhooks" , wcWebhookRoutes );


/* 
app.use("/api/vouchers", voucherRoutes);
app.use("/api/campaigns" , campaignRoutes);
app.use("/api/customers" , customerRoutes);
app.use("/api/redemptions" , redemptionRoutes);
app.use("/api/rewards" ,  rewardRoutes);
app.use("/api/campaignsAnalytics" ,campaignAnalyticsRoutes);
app.use("/api/validateVoucher" , validateVoucherRoutes);
app.use("/api/dashboard"  , dashboartRoutes);
app.use("/api/auth" , authRoutes ); 
 */
app.get("/", (req, res) => {
	res.send("Hello World! this is the webApi ");
});

app.listen( PORT  ,() => {
	console.log(` The pormotion engine is running at the port ${PORT}`);
});
