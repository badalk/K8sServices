'use strict';
// ##
// 1 - To test npm start
// ##
// console.log('Hello World !');

// ##
// 2 - creates express object and declares a get callback. And it listens on port 3000
// ##

// const express = require('express');
// const app = new express();
 
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
 
// app.listen(3000, () => {
//     console.log('Server up!');
// });

// ##
// 3
// ##

const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
 
// register JSON parser middlewear
app.use(bodyParser.json());
var custRoutes =  require('./routes/customerRoutes');
console.log(custRoutes);
custRoutes(app);
 
app.listen(3000, () => {
    console.log("Server is up!");
});