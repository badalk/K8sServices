'use strict';
 
const Product = require('../json/product');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
//const sql = require('mssql')



// var Connection = require('tedious').Connection;  
// var config = {  
//     userName: 'badal',  
//     password: 'Welcome1234#',  
//     server: 'k8sdbserver.database.windows.net',  
//     // If you are on Microsoft Azure, you need this:  
//     options: {encrypt: true, database: 'k8sdb'}  
// };  
// var connection = new Connection(config);  

// connection.on('connect', function(err) {  
// // If no error, then good to proceed.  
//     console.log("Connected");  
// });  



class ProductRepository {
    constructor() {
        this.products = {}
    }
 
    getById(id) {
        return this.products.get(id);
    }
 
    getAll() {
        var Connection = require('tedious').Connection;  
        var Request = require('tedious').Request; 
        
        var config = {  
            userName: 'badal',  
            password: 'Welcome1234#',  
            server: 'k8sdbserver.database.windows.net',  
            // If you are on Microsoft Azure, you need this:  
            options: {encrypt: true, database: 'k8sdb'}  
        }; 

        var connection = new Connection(config); 
         
        connection.on('connect', function(err) {  
            // If no error, then good to proceed.  
            console.log("Connected");  
            executeStatement(products);  
        });  
    
        function executeStatement() {  
            request = new Request("SELECT c.CustomerID, c.CompanyName,COUNT(soh.SalesOrderID) AS OrderCount FROM SalesLT.Customer AS c LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh ON c.CustomerID = soh.CustomerID GROUP BY c.CustomerID, c.CompanyName ORDER BY OrderCount DESC;", function(err) {  
            if (err) {  
                console.log(err);}  
            });  
            var result = "";  
            request.on('row', function(columns) {  
                // columns.forEach(function(column) {  
                //   if (column.value === null) {  
                //     console.log('NULL');  
                //   } else {  
                //     result+= column.value + " ";  
                //   }  
                // });  
                var prod = new Product();
                prod.id = columns["ProductId"];
                prod.name = columns["Name"];
                prod.price = columns["Price"];

                this.products.push(prod);
             
            });  
    
            request.on('done', function(rowCount, more) {  
                console.log(rowCount + ' rows returned');  
            });  
            connection.execSql(request);  
        }   

    }

 
    remove() {
        const keys = Array.from(this.products.keys());
        this.products.delete(keys[keys.length - 1]);
    }
 
    save(product) {

        var Connection = require('tedious').Connection;  
        var config = {  
            userName: 'badal',  
            password: 'Welcome1234#',  
            server: 'k8sdbserver.database.windows.net',  
            // If you are on Azure SQL Database, you need these next options.  
            options: {encrypt: true, database: 'k8sdb'}  
        };  
        var connection = new Connection(config);  
        connection.on('connect', function(err) {  
            // If no error, then good to proceed.  
            console.log("Connected");  
            executeStatement1();  
        });  
    
        var Request = require('tedious').Request  
        var TYPES = require('tedious').TYPES;  
    
        function executeStatement1() {  
            request = new Request("INSERT Product (Name, Price) OUTPUT INSERTED.ProductID VALUES (@Name, @Price);", function(err) {  
                        if (err) {  
                            console.log(err);}  
                        });  
            request.addParameter('Name', TYPES.NVarChar, product.name);  
            request.addParameter('Price', TYPES.Decimal, product.price);  
            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                  if (column.value === null) {  
                    console.log('NULL');  
                  } else {  
                    console.log("Product id of inserted item is " + column.value);  
                    product.id = column.value
                  }  
                });  
            });       
            connection.execSql(request);  
        }

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