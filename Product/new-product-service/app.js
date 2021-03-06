var express = require('express'),
    app = express(),
    fs = require('fs');
    port = process.env.PORT || 80;
    bodyParser = require('body-parser');


app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/healthz', function(req,res) {
    res.status(200).send();
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

    console.log(req.params);
    const prodId = parseInt(req.params.id);
    console.log("product Id: " + prodId);
    console.log(req.params);
    var sql = require("mssql");
    console.log("Getting product details");

    var config = GetSqlConnectionConfig();
    sql.close();
   
    sql.connect(config, function (err) {
        if (err) {
            console.log("error connecting to database: " + err);
            res.status(500).send(err);
        }
        console.log("Finding product with ID: " + prodId);
        // create Request object
        new sql.Request()    
        .input("productId", sql.Int, prodId)
        .query("select * from [dbo].[Product] where ProductID = @productId")
        .then(function (prod) {
            if (prod == null || prod.recordsets.length === 0){
                console.log ("no product exists for product id " + prodId);
                res.status(404).send("Not Found");
            }
            else {
                console.log(prod);
                res.send(prod);
            }
        })
        .catch(function (error) {
            console.log("Error retrieving product for product id " + prodId + ": " + error);
        })
    });
});

app.post('/save', function (req, res){
    var sql = require("mssql");

    var config = GetSqlConnectionConfig();
    sql.close();
   
    //var dbConn = new sql.Connection(config);
    sql.connect(config, function (err) {
        var transaction = new sql.Transaction();
        transaction.begin().then(function () {
            var requst = new sql.Request()
            const product = req.body;
            // create Request object
            var query = "";
            if (product.productId === undefined){
                query = "INSERT INTO [dbo].[Product] (Name, Price) VALUES ('" + product.name + "', " + product.price + ")"; 
            }
            else{
                query = "UPDATE [dbo].[Product] Set Name = '" + product.name + "', Price = " + product.price + " WHERE ProductID = " + product.productId; 
            }
            console.log("Query: " + query);

            requst.query(query, function (err, prod) {
                console.log("product post insert: " + JSON.stringify(prod))
                transaction.commit().then(function () {
                    console.log("Product " + prod.Name + " is added with ID: " + prod.ProductID);
                    res.send(prod.ProductID);
                }).catch(function (err) {
                    console.log("Error in Transaction Commit " + err);
                });
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send();
            })
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send(error);
        })
    });
});

app.post('/delete', function (req, res){
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
    console.log('returning config:');
    console.log(config);
    return config;
};

