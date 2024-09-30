import express from 'express'
import {PlaceOrder,PlaceOrderStripe,PlaceOrderRazorpay,allOrders,userOrders,updateStatus} from "../controllers/orderController.js"
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter=express.Router()

//Admin Feature
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Payment Features
orderRouter.post('/place',authUser,PlaceOrder)
orderRouter.post('/stripe',authUser,PlaceOrderStripe)
orderRouter.post('/razorpay',authUser,PlaceOrderRazorpay)

//user Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter
