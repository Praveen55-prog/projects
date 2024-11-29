const express=require('express')
const { registerUser, loginUser, logout, getUserProfile, changePassword, 
    updateProfile, getUser, addItems, deleteItems, orderedstock, 
    updateOrdered,
    addAddress,
    changeuserrole,
    getalluser} = require('../controllers/authController')
const { isAuthenticatedUser, authorizesroles } = require('../middleware/auth')
const router=express.Router()

router.route('/register').post(registerUser)
router.route('/loginUser').post(loginUser)
router.route('/logout').get(logout)
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile)
router.route('/changepassword').put(isAuthenticatedUser,changePassword)
router.route('/updateprofile').put(isAuthenticatedUser,updateProfile)
router.route('/getuser/:id').get(getUser)
router.route('/additem').put(isAuthenticatedUser,addItems) 
router.route('/deleteitem').put(isAuthenticatedUser,deleteItems)
router.route('/updateorder').put(isAuthenticatedUser,updateOrdered)
router.route('/shipping').put(isAuthenticatedUser,addAddress)
router.route('/changeuserrole').put(isAuthenticatedUser,changeuserrole)
router.route('/allusers').get(isAuthenticatedUser,authorizesroles('admin'),  getalluser)


module.exports=router