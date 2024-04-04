const mongoose = require('mongoose'); 
require('dotenv').config(); 



module.exports.db_connect = ()=>{
    try {

        mongoose.connect(process.env.DB_URI); 
        const db_con = mongoose.connection ; 
        db_con.on('error' , (err)=>{console.log('not connected') , err}); 
        db_con.once('open' , ()=> console.log('connected')); 

    } catch (error) {
        console.log(error); 
    }
}