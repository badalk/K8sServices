'use strict';
 
const Router = require('express');
const customerRepo = require('../repo/customerRepository');
 
const getcustomerRoutes = (app) => {
    const router = new Router();
 
    router
        .get('/get/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const result = customerRepo.getById(id);
            res.send(result);
        })
        .get('/all', (req, res) => {
            const result = customerRepo.getAll();
            res.send(result);
        })
        .get('/remove', (req, res) => {
            customerRepo.remove();
            const result = 'Last customer remove. Total count: '
                + customerRepo.customers.size;
            res.send(result);
        })
        .post('/save', (req, res) => {
            const customer = req.body;
            const result = customerRepo.save(customer);
            res.send(result);
        });
 
    app.use(router);
};
 
module.exports = getcustomerRoutes;