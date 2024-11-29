const express=require('express')
const {  cartitems } = require('../controllers/itemController')

const router=express.Router()


router.route('/item').get(cartitems)

module.exports=router