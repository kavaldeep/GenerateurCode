import express from 'express';
import bodyParser from 'body-parser';
import voucherRoutes from './routes/voucherRoutes';
import userRoutes from './routes/userRoutes';
import rewardRoutes from "./routes/rewardsRoutes";
import { connectToDatabase } from '../persistence/services/db';

const PORT = 3001;
const app = express();
var cors = require('cors');


connectToDatabase().subscribe({
    next: (connection) => {
        console.log("Connected to database");
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/vouchers', voucherRoutes);
app.use('/users', userRoutes);
app.use("/rewards", rewardRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(  PORT,  () => {
    console.log(`Example app listening on port ${PORT}!`);
});

