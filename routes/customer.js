var express = require('express');
var router = express.Router();
var CustomerService = require('../services/service.customer');
const mysql = require ('mysql2');
var models = require ('../models');

/* GET customer listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid Customer UID."});
});

/* adds a new customer to the list */
router.post('/', async (req, res, next) =>
{
	
	
	const body = req.body;

	try
	{
		await CustomerService.create(body);
		// const customer = await CustomerService.create(body);

		// if(body.guid != null)
		// {
		// 	customer.guid = body.guid;
		// }

		res.cookie('guid', req.body.guid, { maxAge: 900000, httpOnly: true });
		models.customer.findOrCreate({
where: {
	username: req.body.username,
	email: req.body.email
}, defaults: {
	guid: req.body.guid,
	first_name: req.body.first_name,
	last_name: req.body.last_name,
	password: req.body.password

}
}).spread (function(result,created){
	if(created){
		res.status(201).json({ customer: result });
	}
	else{

	
	res.send('user already taken');
	}
});

		

		// created the customer! 
	// 	return res.status(201).json({ customer: customer });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* retrieves a customer by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		models.customer.findOne({
			where: {
			uid:req.params.id
			}
		}).then(customer => {
			if (customer) 
			{
				res.status(201).json({ customer: customer });

			}
			else {
				res.status(404);
			}
		})
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the customer by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await CustomerService.update(req.params.id, req.body);

		return res.json({ customer: customer });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the customer from the customer list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await CustomerService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

router.post('/login', async (req, res, next) =>
{
	try
	{
		models.customer.findOne({
			where: {
				username: req.body.username,
				password: req.body.password
			}
		}).then(customer => {
			if (customer) 
			{
				res.status(201).json({ customer: customer });

			}
			else {
				res.status(404);
			}
		})
		
		// res.status(201).json({ customer: customer });
		
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;