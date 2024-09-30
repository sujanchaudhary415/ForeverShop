import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";



//placing order using cod
const PlaceOrder =async(req,res)=>{
 
    try {
        const {userId,amount,items,address}=req.body;
        
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()
        //clear the cartData
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//placing order using Stripe Method
const PlaceOrderStripe =async(req,res)=>{
    
}

//placing order using razor Method
const PlaceOrderRazorpay =async(req,res)=>{
    
}


//All orders data for adminPanel
const allOrders=async(req,res)=>{
  try {
    const orders=await orderModel.find({})
    res.json({success:true,orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}


//user order Data for Frontend
const userOrders=async(req,res)=>{
 try {
    const {userId}=req.body

    const orders=await orderModel.find({userId})
    res.json({success:true,orders})
 } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
 }
}


//update order Status from admin panel
const updateStatus=async(req,res)=>{
  try {
    
    const {orderId,status}=req.body
    await orderModel.findByIdAndUpdate(orderId,{status})
     res.json({success:true,message:'Status Updated'})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export {PlaceOrder,PlaceOrderStripe,PlaceOrderRazorpay,allOrders,userOrders,updateStatus}



