'use strict';
 
const Customer = require('../json/customer');
 
class CustomerRepository {
    constructor() {
        this.customers = new Map([
            [1, new Customer(1, 'Customer','1', 'customer1@domain.com', '01-01-1970', null )],
            [2, new Customer(2, 'Customer','2', 'customer2@domain.com', '02-01-1970', null)],
            [3, new Customer(3, 'Customer','3', 'customer3@domain.com', '03-01-1970', null)],
            [4, new Customer(4, 'Customer','4', 'customer4@domain.com', '03-01-1970', null)]
        ]);
    }
 
    getById(id) {
        return this.Customers.get(id);
    }
 
    getAll() {
        return Array.from(this.Customers.values());
    }
 
    remove() {
        const keys = Array.from(this.Customers.keys());
        this.Customers.delete(keys[keys.length - 1]);
    }
 
    save(Customer) {
        if (this.getById(Customer.id) !== undefined) {
            this.Customers[Customer.id] = Customer;
            return "Updated Customer with id=" + Customer.id;
        }
        else {
            this.Customers.set(Customer.id, Customer);
            return "Added Customer with id=" + Customer.id;
        }
    }
}
 
const customerRepository = new CustomerRepository();
 
module.exports = CustomerRepository;