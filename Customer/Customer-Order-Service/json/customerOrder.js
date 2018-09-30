'use strict';
 
class CustomerOrder {
    constructor(orderId, customerId, productId, quantity, unitPrice, orderDate) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.orderDate = orderDate;
    }
}
 
module.exports = CustomerOrder;