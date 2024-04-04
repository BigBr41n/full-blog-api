//dependencies imports
const express = require('express'); 
const cors = require('cors'); 
const {db_connect} = require('./api/config/db'); 



//app instance 
const app = express(); 


//database connection 
db_connect(); 





//importing routes 
const usersRoute = require('./api/routes/user'); 
const postsRoute = require('./api/routes/post'); 






//middelwares 
app.use(express.urlencoded({extended : true})); 
app.use(express.json()); 
app.use(cors({credentials :true , origin:"http://localhost:3000"})); 





//routes
app.get('/' , (req,res)=>{
    res.status(200).json({message : 'api for blog'});
});


app.use('/api/users' , usersRoute); 
app.use('/api/posts' , postsRoute); 





// 404 routes 
app.use((req, res , next)=>{
    try {
        const error = new Error('Invalid dir'); 
        error.status = 404;
        next(error); 
    } catch (error) {
        res.status(500).json({error : 'Internal server error'}); 
    }
}); 

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status).json({error : err.message});
});



module.exports = app ; 
