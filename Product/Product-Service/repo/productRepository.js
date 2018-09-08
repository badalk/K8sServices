'use strict';
 
const Product = require('../json/product');
 
class ProductRepository {
    constructor() {
        this.products = new Map([
            [1, new Product(1, 'Product 1', 10 )],
            [2, new Product(2, 'Product 2', 20)],
            [3, new Product(3, 'Product 3', 30)],
            [4, new Product(4, 'Product 4', 40)]
        ]);
    }
 
    getById(id) {
        return this.products.get(id);
    }
 
    getAll() {
        return Array.from(this.products.values());
    }
 
    remove() {
        const keys = Array.from(this.products.keys());
        this.products.delete(keys[keys.length - 1]);
    }
 
    save(product) {
        if (this.getById(product.id) !== undefined) {
            this.products[product.id] = product;
            return "Updated Product with id=" + product.id;
        }
        else {
            this.products.set(product.id, product);
            return "Added Product with id=" + product.id;
        }
    }
}
 
const productRepository = new ProductRepository();
 
module.exports = productRepository;