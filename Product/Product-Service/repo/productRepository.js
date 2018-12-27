//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");

//Initiallising connection string
var dbConfig = {
    user:  "badal",
    password: "Welcome1234#",
    server: "k8sdbserver.database.windows.net",
    database:"k8sdb"
}
// Body Parser Middleware


// //Setting up server
//  var server = app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
//  });

class ProductRepository {
    constructor() {
        this.products = {}
    }

    //Function to connect to database and execute query
    executeQuery(res, query){             
        sql.connect(dbConfig, function (err) {
            if (err) {   
                        console.log("Error while connecting database :- " + err);
                        res.send(err);
                    }
                    else {
                            // create Request object
                            var request = new sql.Request();
                            // query to the database
                            request.query(query, function (err, res) {
                                if (err) {
                                    console.log("Error while querying database :- " + err);
                                    res.send(err);
                                }
                                else {
                                    res.send(res);
                                }
                        });
                        }
        });           
    }

    //GET API
    getById(id , res){
        var query = "select * from [dbo].[Product] Where ProductId = " + id;
        executeQuery (res, query);
    }

    //POST API
    getAll(req , res){
        var query = "select * from [dbo].[Product]";
        executeQuery (res, query);
    }

    //PUT API
    save(req , res){
        var query = "UPDATE [dbo].[Product] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id=" + req.params.id;
        executeQuery (res, query);
    }

    // DELETE API
    delete(id , res){
        var query = "DELETE FROM [dbo].[Product] WHERE Id=" + id;
        executeQuery (res, query);
    }

};