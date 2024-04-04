const User = require('../models/user'); 
const HttpError = require('../models/errorModel'); 
const bcrypt = require('bcrypt'); 
const jwt  = require ('jsonwebtoken'); 
require('dotenv').config(); 

//========= REGISTER NEW USER
//========= POST : /api/users/register
//========= UNPROTECTED
module.exports.registerUser = async (req , res ,next)=>{
    try {
        const {username , email , password} = req.body ; 
        if (!username  || !email || !password){
            return next(new HttpError("Fill in all Fields." , 422)); 
        }
        //lower case email 
        const newEmail = email.toLowerCase(); 

        //cheking if the user exist 
        const userE = await User.findOne({email : newEmail}); 
        if(userE){
            return next(new HttpError('email already exists.',422)); 
        }
        //checking the length of the pass 
        if((password.trim()).length < 6){
            return next(new HttpError('password should be at least 6 chars', 422)); 
        }

        //hashing the pass 
        const hash = await bcrypt.hash(password , 10); 

        //creating the user 
        const newUser = await User.create({username : username , email : newEmail , password : hash}); 
        res.status(200).json({message : "user registred perfectly"}); 

    } catch (error) {
        console.log(error); 
        return next(new HttpError("User registration field." , 422)); 
    }
}




//========= LOGIN REGISTRED USER
//========= POST : /api/users/login
//========= UNPROTECTED
module.exports.loginUser = async (req , res , next)=>{
    try {
        const {email , password} =req.body ; 
        if (!email || !password){
            return next(new HttpError('Fill in Fields to login ' , 422)); 
        }

        //lower case the email 
        const newEmail = email.toLowerCase(); 
        
        //finding the user 
        const user  = await User.findOne({email : newEmail}); 

        if (!user) {
            return next(new HttpError('account does not exists.', 422)); 
        }

        //verifying the pass 
        const compared = await bcrypt.compare(password , user.password) ;
        if(!compared){
            return next(new HttpError('Invalid credentials' , 422)); 
        }


        //sending token 
        const {_id : id , username} = user ; 
        const token = jwt.sign({id , username} , process.env.JWT , {expiresIn : "3d"});
        res.status(200).json({token , id , username}); 


    } catch (error) {
        console.log(error)
        return next(new HttpError('check your Credentials please' , 422)); 
    }
}






//========= USER PROFILE
//========= GET : /api/users/:id
//========= PROTECTED
module.exports.getUser = async (req , res)=>{
    try {
        const {id}= req.params ; 
        const user = await User.findById(id).select('-password'); 
        if(!user){
            return next(new HttpError('user not found' , 404)); 
        }
        res.status(200).json(user); 
    } catch (error) {
        return next(new HttpError(error)); 
    }
}




//========= CHANGE USER AVATER
//========= POST : /api/users/change-avatar
//========= PROTECTED
module.exports.changeAvatar = (req , res)=>{

}




//========= EDIT USER DETAILS
//========= POST : /api/users/edit-user
//========= PROTECTED
module.exports.editUser = (req , res)=>{

}



//========= GET AUTHORS
//========= GET : /api/users/authors
//========= UNPROTECTED
module.exports.getAuthors = (req , res)=>{

}