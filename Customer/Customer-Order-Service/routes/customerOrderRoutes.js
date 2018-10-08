'use strict';
 
var express = require('express');
var customerOrderRepo = require('../repo/customerOrderRepository');
 
const getcustomerOrderRoutes = (app) => {
    const router = express.Router();
 
    router
        .get('/get/:orderId', (req, res) => {
            const orderId = parseInt(req.params.orderId);
            const result = customerOrderRepo.getById(orderId);
            res.send(result);
        })
        .get('/all', (req, res) => {
            const result = customerOrderRepo.getAll();
            res.send(result);
        })
        .get('/remove', (req, res) => {
            customerOrderRepo.remove();
            const result = 'Last order removed. Total count: '
                + customerOrderRepo.customerOrders.size;
            res.send(result);
        })
        .post('/save', (req, res) => {
            const customerOrder = req.body;
            const result = customerOrderRepo.save(customerOrder);
            res.send(result);
        });
 
    app.use(router);
};
 
module.exports = getcustomerOrderRoutes;