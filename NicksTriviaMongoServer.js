//const dotenv = require('dotenv');
//dotenv.config();
require('dotenv').config();
const dbcon = require('./model/DbConnection');
dbcon.connect();

const ExpressApp = require('./NicksTriviaApp.js');

ExpressApp.app.listen(process.env.PORT,process.env.HOSTNAME,function(){ // Listen to client requests in hostname:port
    console.log(`Server Running on ${process.env.HOSTNAME}:${process.env.PORT}...`);
});