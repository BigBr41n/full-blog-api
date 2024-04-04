const router = require('express').Router(); 
const {registerUser , loginUser , getUser , getAuthors ,editUser , changeAvatar} = require('../controllers/userController'); 
const {auth} = require('../middleware/authMiddle'); 


router.post('/register' , registerUser); 
router.post('/login',loginUser); 
router.get('/:id' , getUser); 
router.get('/', getAuthors); 
router.post('/change-avatar', auth,   changeAvatar); 
router.patch('/edit-user' , editUser); 




module.exports = router ; 