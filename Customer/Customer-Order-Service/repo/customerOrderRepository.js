'use strict';
 
const Customer = require('../json/customer');
 
class CustomerOrderRepository {
    constructor() {
        this.customerOrders = new Map([
            [1, new CustomerOrder(orderId=1, customerId=1, productId=1, quantity=5, unitPrice=15, new Date(year=2018, month=9, date=1) )],
            [1, new CustomerOrder(orderId=1, customerId=1, productId=2, quantity=10, unitPrice=10, new Date(year=2018, month=9, date=1) )],
            [1, new CustomerOrder(orderId=2, customerId=2, productId=1, quantity=5, unitPrice=15, new Date(year=2018, month=7, date=10) )],
            [1, new CustomerOrder(orderId=2, customerId=2, productId=3, quantity=5, unitPrice=23, new Date(year=2018, month=7, date=10) )],
            [1, new CustomerOrder(orderId=2, customerId=2, productId=4, quantity=5, unitPrice=32, new Date(year=2018, month=7, date=10) )],
            [1, new CustomerOrder(orderId=3, customerId=2, productId=2, quantity=5, unitPrice=10, new Date(year=2018, month=5, date=13) )],
            [1, new CustomerOrder(orderId=4, customerId=3, productId=3, quantity=5, unitPrice=23, new Date(year=2018, month=9, date=28) )],
            [1, new CustomerOrder(orderId=4, customerId=3, productId=4, quantity=5, unitPrice=35, new Date(year=2018, month=9, date=28) )],
        ]);
    }
 
    getById(orderId) {
        return this.customerOrders.get(orderId);
    }
 
    getAll() {
        return Array.from(this.customerOrders.values());
    }
 
    remove() {
        const keys = Array.from(this.customerOrders.keys());
        this.customerOrders.delete(keys[keys.length - 1]);
    }
 
    save(customerOrder) {
        if (this.getById(customerOrder.orderId) !== undefined) {
            this.customerOrders[customerOrder.orderId] = customerOrder;
            return "Updated Order with id=" + customerOrder.orderId;
        }
        else {
            this.customerOrders.set(customerOrder.orderId, customerOrder);
            return "Added Order with orderId =" + customerOrder.orderId;
        }
    }
}
 
const customerOrderRepository = new CustomerOrderRepository();
 
module.exports = customerOrderRepository;