const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

let hostname = 'localhost';
let port = 4000;
app.use(express.static('public'));

const server=app.listen(port,hostname,function(){
   console.log(`Server running in ${hostname}:${port}`);
});
