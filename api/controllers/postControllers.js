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
    try {
        let fileName ; 
        let newFileName ; 
        let updatedPost ; 
        const postId = req.params.id ; 
        let {title , category , description} = req.body ; 


        if (!title || !category || !description){
            return next(new HttpError('please fill all fields' , 422)); 
        }


        if(!req.files){
            updatedPost = await Post.findByIdAndUpdate(postId , {
                title , 
                description , 
                category, 
           } , {new : true});   
        }
        if (req.files){
            //get old post
            const oldPost = await Post.findById(postId); 


            //unlink the old thumbnail
            fs.unlink(path.join(__dirname ,'..' , 'uploads' , oldPost.thumbnail) , async (err)=>{
                if(err){
                    return next(new HttpError(err)); 
                }
            })


            //update the thumbnail
            const {thumbnail} = req.files ; 
            //check file size
            if(thumbnail.size > 2000000){
                return next(new HttpError('size too big', 422)); 
            }
            fileName = thumbnail.name
            let splittedFileName = fileName.split('.'); 
            newFileName = splittedFileName[0]+ uuid() + "." + splittedFileName[splittedFileName.length -1]; 


            //move the thumbnail to uploads file
            thumbnail.mv(path.join(__dirname , '..' , 'uploads' , newFileName) , async (err)=>{
                if (err){
                    return next(new HttpError(err)); 
                }
                    
                updatedPost = await Post.findByIdAndUpdate(postId , {
                    title , 
                    description , 
                    category, 
                    thumbnail : newFileName ,
                } , {new : true});  
            })
        }

        if (!updatedPost){
            return next(new HttpError('unable to upadte'),500 ); 
        }

        res.status(200).json(updatedPost); 

    } catch (error) {
        return next(new HttpError(error)); 
    }
}




//============= DELETE POSTS
//============= DELETE: /api/posts/:id
//============= PROTECTED 
module.exports.deletePost = async (req, res , next)=>{
    try {
        const postID = req.params.id ; 
        if(!postID){
            return next(new HttpError('Post Unavilable.' ,404)); 
        }

        const postToDelete =  await Post.findById(postID); 
        const fileName = postToDelete?.thumbnail ; 

        //check the ownership of the post 
        if(req.user.id != postToDelete.create) return next(new HttpError('-_- not your post') , 400); 

        //unlik the thumbnail 
        fs.unlink(path.join(__dirname , '..' , 'uploads' , fileName) , async (err)=>{
            if (err){
                return next(new HttpError('unable to delete try later' , 500)); 
            }
            else {
                await Post.findByIdAndDelete(postID); 
                //reduce posts count
                const user = await User.findById(req.user.id); 
                const count = user?.posts -1 
                await User.findByIdAndUpdate(req.user.id , {
                    posts : count , 
                }); 
            }

        })

        res.status(200).json({message : `${postToDelete.id} deleted`})

    } catch (error) {
        return next(new HttpError(error)); 
    }
}