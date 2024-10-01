import express from 'express'
import {PlaceOrder,PlaceOrderStripe,allOrders,userOrders,updateStatus, verifyStripe} from "../controllers/orderController.js"
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter=express.Router()

//Admin Feature
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Payment Features
orderRouter.post('/place',authUser,PlaceOrder)
orderRouter.post('/stripe',authUser,PlaceOrderStripe)

//user Feature
orderRouter.post('/userorders',authUser,userOrders)

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter
