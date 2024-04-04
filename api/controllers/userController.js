const User = require('../models/user'); 
const HttpError = require('../models/errorModel'); 
const bcrypt = require('bcrypt'); 

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
        res.status(200).json(newUser); 

    } catch (error) {
        console.log(error); 
        return next(new HttpError("User registration field." , 422)); 
    }
}




//========= LOGIN REGISTRED USER
//========= POST : /api/users/login
//========= UNPROTECTED
module.exports.loginUser = (req , res)=>{

}




//========= USER PROFILE
//========= GET : /api/users/:id
//========= PROTECTED
module.exports.getUser = (req , res)=>{

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