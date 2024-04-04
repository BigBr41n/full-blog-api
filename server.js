const http = require('http'); 
const app = require('./app');  
require('dotenv').config(); 


const server = http.createServer(app); 
const PORT = process.env.PORT || 3000 ; 


server.keepAliveTimeout = 60000;
server.timeout = 5000; 
server.maxHeadersCount = 20;



server.listen (PORT , '0.0.0.0' , ()=>{
    console.log(`listen on port : ${PORT}`);
}); 



server.on('close', () => {
    console.log('Server closed');
});