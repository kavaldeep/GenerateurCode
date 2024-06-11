import express from "express";
import bodyParser from "body-parser";
import publishRoutes from "./routes/publish";
import { connectToDatabase } from "../persistence/services/db";


var cors = require("cors");

const PORT = 3002;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectToDatabase().subscribe({
    next: (connection) => {
        console.log("Connected to database");
    },
});

app.use("/api/publish", publishRoutes);

app.get("/", (req, res) => {
    res.send(" Welcome to the publish engine!");
});


app.listen(PORT, () => {
    console.log(` The publish engine is running at the port ${PORT}`);
});