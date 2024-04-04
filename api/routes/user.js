const router = require('express').Router(); 
const {registerUser , loginUser , getUser , getAuthors ,editUser , changeAvatar} = require('../controllers/userController'); 


router.post('/register' , registerUser); 
router.post('/login',loginUser); 
router.get('/:id' , getUser); 
router.get('/', getAuthors); 
router.post('/change-avatar', changeAvatar); 
router.patch('/edit-user' , editUser); 




module.exports = router ; 