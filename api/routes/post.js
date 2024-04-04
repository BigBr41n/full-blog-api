const router = require('express').Router(); 
const posts = require('../controllers/postControllers'); 
const {auth} = require('../middleware/authMiddle'); 



router.post('/' , auth , posts.createPost ); 
router.get('/' , posts.getPosts ); 
router.get('/:id' , posts.getSinglePost ); 
router.get('/:category' , posts.getByCategory ); 
router.get('/users/:id' , posts.authorPosts ); 
router.patch('/:id' ,auth, posts.editPost ); 
router.delete('/:id' ,auth, posts.deletePost); 



module.exports = router ; 