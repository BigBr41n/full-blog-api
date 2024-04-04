//dependencies imports
const express = require('express'); 
const cors = require('cors'); 
const {db_connect} = require('./api/config/db'); 
const upload = require('express-fileupload'); 



//app instance 
const app = express(); 


//database connection 
db_connect(); 





//importing routes 
const usersRoute = require('./api/routes/user'); 
const postsRoute = require('./api/routes/post'); 


//middleware imports 
const { notFound , errorHandler} = require('./api/middleware/errMid');






//middelwares 
app.use(express.urlencoded({extended : true})); 
app.use(express.json()); 
app.use(cors({credentials :true , origin:"http://localhost:3000"})); 
app.use(upload()); 


//upload config 
app.use('/uploads' , express.static(__dirname + '/uploads')); 





//routes
app.get('/' , (req,res)=>{
    res.status(200).json({message : 'api for blog'});
});


app.use('/api/users' , usersRoute); 
app.use('/api/posts' , postsRoute); 





// 404 routes 
app.use(notFound);
app.use(errorHandler); 



module.exports = app ; 
