import express  , {Request , Response} from 'express';
import { omit } from 'lodash';
import { CustomerRepository } from '../../persistence/repositories/customersRepos';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send("you ve successfully reached the test endpoint of the user ");
});


router.get('/summary' , (req , res) => {
    
    console.log(req.body.custId);
    CustomerRepository.getCustSummary(req.body.custId).subscribe({
        next: (summary) => {
            console.log(summary);
            res.send(summary);
        },
    });
})

router.get('/loyalty' , (req , res) => {
        
        CustomerRepository.getCustomerById(req.body.custId).subscribe({
            next: (customer) => {
                res.send(customer?.loyalty);
            },
            error: (error) => {
                res.send(error);
            },
        });
})

router.get('/customer' , (req , res) => {
 
    const _id : string = req.query._id as string;
    CustomerRepository.getCustomerById(_id).subscribe({
        next: (customer) => {
            res.send(customer);
        },

        error: (error) => {
            res.send(error);
        }
    });
})
export default router;