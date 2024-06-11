import express from "express";
import { CustomerRepository } from "../../persistence/repositories/customersRepos";
import { CustomerModel } from "../../persistence/models/Customers";
import CustomerServices from "../../persistence/services/customers/customersServices";
const router = express.Router();

// Get all customers
router.get("/", (req, res) => {
	CustomerRepository.getAllCustomers().subscribe({
		next: (customers) => {
			res.json(customers);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// Get the summary of a costumer
router.get("/summary/:id", (req, res) => {
	CustomerRepository.getCustSummary(req.params.id).subscribe({
		next: (summary) => {
			res.json(summary);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});
});

// Search customers by a search query
router.get("/search", async (req, res) => {
	const { query } = req.query;

	const customer = await CustomerModel.find({
		$or: [
			{ name: { $regex: query, $options: "i" } },
			{ email: { $regex: query, $options: "i" } },
		],
	});


	res.json(customer);
});

// Get a customer by ID
router.get("/:id", (req, res) => {
	CustomerRepository.getCustomerById(req.params.id).subscribe({
		next: (customer) => {
			res.json(customer);
		},
		error: (error) => {
			res.send(`Ups! There is an error: ${error}`);
		},
	});

});

// Remove a customer by ID
router.delete("/:id", (req, res) => {});

//Add a customer

router.post("/addCustomer", (req, res) => {
	CustomerServices.createCustomerRequest(
		req.body.source_id,
		req.body.name,
		req.body.email,
		req.body.phone
	)
		.then((customer) => {
			res.json(customer);
		})
		.catch((error) => {
			res.send(`Ups! There is an error: ${error}`);
		});
});


// update a customer
router.put("/:id", (req, res) => {
	CustomerRepository.updateCustomerById(req.params.id, req.body.customer).subscribe({
		next: customer => res.json(customer),
		error: error => res.send(`Error, something went wrong: ${error}`)
	});
});

export default router;
