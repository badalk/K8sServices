'use strict';
 
const Customer = require('../json/customerOrder');
 
class CustomerOrderRepository {
    constructor() {
        this.customerOrders = new Map([
            // [1, new CustomerOrder(orderId=1, customerId=1, productId=1, quantity=5, unitPrice=15)],

            [1, new CustomerOrder(1, 1, 1, 5, 15)],
            [2, new CustomerOrder(1, 1, 2, 10, 10)],
            [3, new CustomerOrder(2, 2, 1, 5, 15)],
            [4, new CustomerOrder(2, 2, 3, 5, 23)],
            [5, new CustomerOrder(2, 2, 4, 5, 32)],
            [6, new CustomerOrder(3, 2, 2, 5, 10)],
            [7, new CustomerOrder(4, 3, 3, 5, 23)],
            [8, new CustomerOrder(4, 3, 4, 5, 35)]
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