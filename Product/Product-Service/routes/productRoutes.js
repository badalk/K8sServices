'use strict';
 
const Router = require('express');
const productRepo = require('../repo/productRepository');
 
const getproductRoutes = (app) => {
    const router = new Router();
 
    router
        .get('/get/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const result = productRepo.getById(id);
            res.send(result);
        })
        .get('/all', (req, res) => {
            const result = productRepo.getAll();
            res.send(result);
        })
        .get('/remove', (req, res) => {
            productRepo.remove();
            const result = 'Last product remove. Total count: '
                + productRepo.products.size;
            res.send(result);
        })
        .post('/save', (req, res) => {
            const product = req.body;
            const result = productRepo.save(product);
            res.send(result);
        });
 
    app.use('/product', router);
};
 
module.exports = getproductRoutes;