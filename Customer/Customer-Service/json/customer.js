'use strict';
 
class Customer {
    constructor(id, firstName, lastName, emailAddress, dateOfBirth, address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.dateOfBirth = dateOfBirth;
        this.address = address
    }
}
 
module.exports = Customer;