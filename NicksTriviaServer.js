const expApp = require('./NicksTriviaApp.js');
let hostname = 'localhost'; //address for this server
let port = 4000; //change the port if already in use

const server= expApp.app.listen(port,hostname,function(){
   console.log(`Server running in ${hostname}:${port}`);
});