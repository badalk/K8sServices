'use strict';
 
const Customer = require('../json/customerOrder');
 
class CustomerOrderRepository {
    constructor() {
        this.customerOrders = new Map([
            // [1, new CustomerOrder(orderId=1, customerId=1, productId=1, quantity=5, unitPrice=15, new Date(year=2018, month=9, date=1) )],

            [1, new CustomerOrder(1, 1, 1, 5, 15, new Date(year=2018, month=9, date=1) )],
            [1, new CustomerOrder(1, 1, 2, 10, 10, new Date(year=2018, month=9, date=1) )],
            [1, new CustomerOrder(2, 2, 1, 5, 15, new Date(year=2018, month=7, date=10) )],
            [1, new CustomerOrder(2, 2, 3, 5, 23, new Date(year=2018, month=7, date=10) )],
            [1, new CustomerOrder(2, 2, 4, 5, 32, new Date(year=2018, month=7, date=10) )],
            [1, new CustomerOrder(3, 2, 2, 5, 10, new Date(year=2018, month=5, date=13) )],
            [1, new CustomerOrder(4, 3, 3, 5, 23, new Date(year=2018, month=9, date=28) )],
            [1, new CustomerOrder(4, 3, 4, 5, 35, new Date(year=2018, month=9, date=28) )]
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