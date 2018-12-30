var express = require('express'),
    app = express(),
    port = process.env.PORT || 80

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    var fs = require('fs');
 
    var path = '/etc/sqlsecrets'

    fs.readdir(path, function(err, items) {
        console.log(items);
     
        for (var i=0; i<items.length; i++) {
            var file = path + '/' + items[i];
            console.log('processing ' + file);

            if (fs.lstatSync(file).isFile()){
                var contents = fs.readFileSync(file, 'utf8');
                console.log('secret contents of ' + items[i] + ': ' + contents);
            }
            else{
                console.log(items[i] + ' is a direcotry');
            }
        }
    });

    // config for your database
    var config = {
        user: 'badal',
        password: 'Welcome1234#',
        server: 'k8sdbserver.database.windows.net', 
        database: 'k8sdb', 
        options: {
            encrypt: true
        }
    };

    // connect to your database
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