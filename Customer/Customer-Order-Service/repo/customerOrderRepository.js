'use strict';
 
const CustomerOrder = require('../json/customerOrder');
 
class CustomerOrderRepository {
    constructor() {
        this.customerOrders = new Map([
            // [1, new CustomerOrder(orderId=1, customerId=1, productId=1, quantity=5, unitPrice=15, new Date(2018, 9, 1) )],

            [1, new CustomerOrder(1, 1, 1, 5, 15, new Date(2018, 9, 1) )],
            [2, new CustomerOrder(1, 1, 2, 10, 10, new Date(2018, 9, 1) )],
            [3, new CustomerOrder(2, 2, 1, 5, 15, new Date(2018, 7, 10) )],
            [4, new CustomerOrder(2, 2, 3, 5, 23, new Date(2018, 7, 10) )],
            [5, new CustomerOrder(2, 2, 4, 5, 32, new Date(2018, 7, 10) )],
            [6, new CustomerOrder(3, 2, 2, 5, 10, new Date(2018, 5, 13) )],
            [7, new CustomerOrder(4, 3, 3, 5, 23, new Date(2018, 9, 28) )],
            [8, new CustomerOrder(4, 3, 4, 5, 35, new Date(2018, 9, 28) )]
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