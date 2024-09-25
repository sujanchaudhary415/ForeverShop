import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Handle images from the request
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    // Filter valid images
    const images = [image1, image2, image3, image4].filter(item => item !== undefined);

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    // Create product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    // Save the product
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({}); // Find all products
    res.json({success:true,products});
  } catch (error) {
   console.log(error)
   res.json({success:false,message:error.message})
  }
};

// Function to remove a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
};

// Function to get a single product info
const singleProduct = async (req, res) => {
  try {
    const {productId}=req.body
    const product = await productModel.findById(productId);
    res.json({success:true,product});
  } catch (error) {
    console.log(error)
    res.json({ success:false,message: error.message });
  }
};

// Export the functions
export { listProducts, addProduct, singleProduct, removeProduct };
