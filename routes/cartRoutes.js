const express=require('express')
const router=express.Router();
const {
    removeFromCartController,updateCartItemController,addToCartController,getCartByUserIdController}=require('../controller/cartController')

    router.post('/add-to-cart',addToCartController)
    router.put('/update-cart',updateCartItemController)
    router.get('/get-cart/:userId',getCartByUserIdController)
    router.delete('/remove-cart-item',removeFromCartController)
module.exports=router;