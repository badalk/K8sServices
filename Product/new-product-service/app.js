var express = require('express'),
    app = express(),
    port = process.env.PORT || 80

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    var fs = require('fs');
 
    // var path = '/etc/sqlsecrets/db'

    // //************************************* */
    // //*********** READING SECRETS FROM MOUNTED VOLUME ****************** */
    // //************************************* */
    // fs.readdir(path, function(err, items) {
    //     console.log(items);
     
    //     for (var i=0; i<items.length; i++) {
    //         var file = path + '/' + items[i];
    //         //console.log('processing ' + file);
    //         try{
    //             var stats = fs.lstatSync(file) 

    //             //console.log('stats:::');
    //             //console.log(stats);
    //             //console.log('with fs.stat: ' + file + ' is a directory? ' + stats.isDirectory());
    //             if (!stats.isDirectory()){
    //                 var contents = fs.readFileSync(file, 'utf8');
    //                 console.log('secret contents of ' + file + ': ' + contents);
    //             }
    //             else{
    //                 console.log(file + ' is a directory');
    //             }
                
    //         }
    //         catch(e){
    //             console.log(e)
    //         }
    //     }
    // });

    //************************************* */
    //*********** READING SECRETS FROM Environment Variables VOLUME ****************** */
    //************************************* */
    console.log(process.env);

    path = '/etc/kvmnt';
    console.log('loading secrets from key-vault....');
    var username = fs.readFileSync(path + '/username', "utf8");
    console.log('username: ' + username);
    var dbhost = fs.readFileSync(path + '/dbhost', "utf8");
    console.log('dbhost: ' + dbhost);
    var dbname = fs.readFileSync(path + '/dbname', "utf8");
    console.log('dbname: ' + dbname);
    var pwd = fs.readFileSync(path + '/password', "utf8");
    console.log('pwd: ' + pwd);
    var dbport = parseInt(fs.readFileSync(path + '/dbport', "utf8"));
    console.log('dbport: ' + dbport);
    var encryptConnection = (fs.readFileSync(path + '/encrypt', "utf8") === 'true');
    console.log('encrypt: ' + encryptConnection);



    // config for your database
    var config = {
        user: username,
        password: pwd,
        server: dbhost,
        database: dbname,
        port: dbport,
        options: {
            encrypt: encryptConnection,
        }
    };

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

var server = app.listen(port, function () {
    console.log('New Product Service is running..');
});