const {Schema , model} = require('mongoose'); 


const postSchema = new Schema({
    title : {
        type : String , 
        required : true , 
    }
    ,
    category: {
        type : String , 
        required : true , 
        enum : ["Agriculter" , "Business" , "Education" , "Entertainment" , "Ivestment" , "Weather" ,"Uncategorized"], 
        message : "{VALUE} is not supported yet",
    },
    description : {
        type : String , 
        required : true , 
    },
    thumbnail: {
        type : String , 
        required : true , 
    }, 
    creator: {
        type : Schema.Types.ObjectId ,
        ref : "User" ,
        required : true , 
    }, 

} , {timestamps : true}); 



module.exports = model('Post' , postSchema); 