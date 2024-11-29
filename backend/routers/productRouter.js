const express=require('express')
const { getProducts, newProducts, getSingleProduct, updateProduct, 
    deleteProduct, allproducts, getadminproducts } = require('../controllers/productController')
const router=express.Router()
const {isAuthenticatedUser,authorizesroles}=require('../middleware/auth')

router.route('/products').get(getProducts)
router.route('/product/new').post(isAuthenticatedUser,authorizesroles('admin'),newProducts)
router.route('/product/:id').put(isAuthenticatedUser,authorizesroles('admin'),updateProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/product/:id').delete(isAuthenticatedUser,authorizesroles,deleteProduct)
router.route('/all').get(allproducts)

router.route('/admin/products').get(isAuthenticatedUser,authorizesroles('admin'),getadminproducts)


module.exports=router