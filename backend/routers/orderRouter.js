const express=require('express')
const { newOrder, getAllOrder } = require('../controllers/orderController')
const { isAuthenticatedUser, authorizesroles } = require('../middleware/auth')
const router=express.Router()

router.route('/neworder').post(isAuthenticatedUser,newOrder)
router.route('/allorder').get(isAuthenticatedUser,authorizesroles('admin'),getAllOrder)

module.exports=router