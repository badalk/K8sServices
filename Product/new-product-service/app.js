var express = require('express'),
    app = express(),
    port = process.env.PORT || 80

app.get('/healthz', function(req,res) {
    res.status(200).send('OK');
});

app.get('/', function (req, res) {
   
    var sql = require("mssql");
    var config = GetSqlConnectionConfig();

    console.log (config);
    sql.close();
 
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from [dbo].[Product]', function (err, recordset) {
            
            if (err) console.log(err)
            
            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.get('/:id', function (req, res) {
    var sql = require("mssql");
    console.log("Getting product details");

    var config = GetSqlConnectionConfig();
    sql.close();
   
    sql.connect(config, function (err) {
        if (err) {
            console.log("error connecting to database: " + err);
            res.status(500).send(err);
        }
        new sqlInstance.Request()
        const id = parseInt(req.params.id);
        console.log("Finding product with ID: " + id);
        // create Request object
        new sql.Request()    
        .input("prodId", sqlInstance.Int, id)
        .query("select * from [dbo].[Product] where ProductID = @prodId")
        .then(function (prod) {
            if (prod == null || prod.length === 0){
                console.log ("no product exists for product id " + id);
                res.status(404).send("Not Found");
            }
                
            console.log(recordSet);
            res.send(recordset);
        })
        .catch(function (error) {
            console.log("Error retrieving product for product id " + id + ": " + error);
        })
    });
});

app.get('/save', function (req, res){
    var sql = require("mssql");

    var config = GetSqlConnectionConfig();
    sql.close();
   
    //var dbConn = new sql.Connection(config);
    sql.connect(config, function (err) {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var requst = new sqlInstance.Request()
            const product = req.body;
            // create Request object
             
            requst.query("INESRT INTO [dbo].[Product] (Name, Price) VALUES ('" + product.name + "', " + product.price + ")")
            .then(function (prod) {
                transaction.commit().then(function (recordSet) {
                    console.log("Product " + product.name + " is added with details: " + recordSet);
                    dbConn.close();
                }).catch(function (err) {
                    console.log("Error in Transaction Commit " + err);
                    dbConn.close();
                });
            })
            .catch(function (error) {
                console.log(error);
                dbConn.close();
            })
        })
        .catch(function(error){
            console.log(error);
            dbConn.close();
        })
    });
});

app.get('/delete/:id', function (req, res){
    var sql = require("mssql");

    var config = GetSqlConnectionConfig();
    sql.close();

    const id = parseInt(req.params.id);

    Console.log("Deleting product " + id)
   
    //NOT IMPLEMENTED

});

var server = app.listen(port, function () {
    console.log('New Product Service is running..');
});

function GetSqlConnectionConfig() {
    var fs = require('fs');

    path = '/etc/kvmnt';
    var username = fs.readFileSync(path + '/username', "utf8");
    var dbhost = fs.readFileSync(path + '/dbhost', "utf8");
    var dbname = fs.readFileSync(path + '/dbname', "utf8");
    var pwd = fs.readFileSync(path + '/password', "utf8");
    var dbport = parseInt(fs.readFileSync(path + '/dbport', "utf8"));
    var encryptConnection = (fs.readFileSync(path + '/encrypt', "utf8") === 'true');
    // config for your database
    var config = {
        user: username,
        password: pwd,
        server: dbhost,
        database: dbname,
        port: dbport,
        options: {
            encrypt: encryptConnection
        }
    };
    return config;
}

