



//============= CREATE POST 
//============= POST : api/posts
//============= PROTECTED 
module.exports.createPost = async (req, res , next)=>{

}



//============= GET ALL POSTS 
//============= GET : api/posts
//============= UNPROTECTED 
module.exports.getPosts = async (req, res , next)=>{

}



//============= GET SINGLE POST 
//============= GET /api/posts/:id
//============= UNPROTECTED 
module.exports.getSinglePost = async (req, res , next)=>{

}



//============= CREATE POSTS BY CATEGORY
//============= GET : /api/posts/:category
//============= UNPROTECTED 
module.exports.getByCategory = async (req, res , next)=>{

}





//============= CREATE POSTS BY AUTHOR
//============= GET : /api/posts/users/:id
//============= UNPROTECTED 
module.exports.authorPosts = async (req, res , next)=>{

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