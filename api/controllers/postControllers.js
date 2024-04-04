const Post = require('../models/post'); 
const User = require('../models/user'); 
const path = require('path'); 
const fs = require('fs'); 
const {v4 : uuid} = require('uuid'); 
const HttpError = require('../models/errorModel'); 



//============= CREATE POST 
//============= POST : api/posts
//============= PROTECTED 
module.exports.createPost = async (req, res , next)=>{
    try {
        const {title , category , description } = req.body ; 
        if (!title || !category || ! description  || !req.files){
            return next(new HttpError('please fill the fields'), 422); 
        }


        const {thumbnail} = req.files ; 
        //check the size //2MB
        if(thumbnail.size > 2000000){
            return next(new HttpError('thumbnail should be less than 2MB'),422); 
        }

        let fileName = thumbnail.name ; 
        let splittedFileName = fileName.split('.'); 
        let newFileName = splittedFileName[0] + uuid() + splittedFileName[splittedFileName.length -1] ;  

        thumbnail.mv(path.join(__dirname , '..' , '/uploads' ,newFileName) , async(err)=>{
            if (err){
                return next(new HttpError(err)); 
            }

            else{
                const newPost = await Post.create({
                    title ,
                    description , 
                    category , 
                    thumbnail : newFileName , 
                    creator : req.user.id ,
                }); 
                if(!newPost){
                    return next(new HttpError('Internal server Error'),500); 
                }
                //find user and increase posts count
                const user = await User.findById(req.user.id); 
                const postCount = user.posts + 1 ; 
                await User.findByIdAndUpdate(req.user.id , {posts : postCount}); 



                res.status(201).json(newPost); 
            }
        })

    } catch (error) {
        return next(new HttpError(error)); 
    }
}



//============= GET ALL POSTS 
//============= GET : api/posts
//============= UNPROTECTED 
module.exports.getPosts = async (req, res , next)=>{
    try {
        const   allPosts = Post.find().sort({updatedAt : -1}); 
        if(!allPosts){
            return next(new HttpError('Internal server Error'),500); 
        }
        res.status(200).json(allPosts); 
    } catch (error) {
        return next(new HttpError(error)); 
    }
}



//============= GET SINGLE POST 
//============= GET /api/posts/:id
//============= UNPROTECTED 
module.exports.getSinglePost = async (req, res , next)=>{
    try {
        const id = req.params.id ; 
        const findPost = Post.findById(id); 
        if(!findPost){
            return next(new HttpError('user do not exists'),422); 
        }
        res.status.json(findPost); 
    } catch (error) {
        return next(new HttpError(error)); 
    }
}



//============= CREATE POSTS BY CATEGORY
//============= GET : /api/posts/:category
//============= UNPROTECTED 
module.exports.getByCategory = async (req, res , next)=>{
    try {
        const category = req.params.category ; 
        const catPost = Post.find({category}).sort({updatedAt : -1}); 
        res.status(200).json(catPost);  
    } catch (error) {
        return next(new HttpError(error)); 
    }
}





//============= CREATE POSTS BY AUTHOR
//============= GET : /api/posts/users/:id
//============= UNPROTECTED 
module.exports.authorPosts = async (req, res , next)=>{
    try {
        const {id} = req.params ; 
        const posts = await Post.find({creator : id}).sort({createdAt : -1}); 
        res.status(200).json(posts); 
    } catch (error) {
        return next(new HttpError(error)); 
    }
}


//============= UPDATE POSTS
//============= PATCH : /api/posts/:id
//============= PROTECTED 
module.exports.editPost = async (req, res , next)=>{

}




//============= DELETE POSTS
//============= DELETE: /api/posts/:id
//============= PROTECTED 
module.exports.deletePost = async (req, res , next)=>{

}