const express=require('express')
const router=express.Router();
const {deleteOrderController,updateOrderController,createOrderController,getOrderByIdController,getAllOrdersController}=require('../controller/orderController')

router.get('/get-all-orders',getAllOrdersController)
router.delete('/delete-order/:id',deleteOrderController)
router.put('/update-order/:orderId',updateOrderController)
router.post('/create-order',createOrderController)
router.get('/get-specfic-order/:id',getOrderByIdController)
module.exports=router;