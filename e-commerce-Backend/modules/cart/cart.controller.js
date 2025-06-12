import slugify from "slugify";
import reviewModel from "../../DB/models/review.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import { deleteOne } from "../../utilitis/handlers/refactor.handler.js";
import ApiFeature from "../../utilitis/APIFeatures.js";
import cartModel from "../../DB/models/cart.model.js";
import productModel from "../../DB/models/product.model.js";
import couponModel from "../../DB/models/coupon.model.js"

// add clear all cart products

function calcPrice(cart){
    let totalPrice = 0;
    cart.cartItems.forEach((ele) => {
     totalPrice += ele.quantity * ele.price
    });
    cart.totalPrice = totalPrice
}

export const getCart = asyncHandler(async(req,res,next) =>{
    let cart = await cartModel.findOne({user: req.user._id})
    res.json({message:"done",cart})
})

export const createCart = asyncHandler(async (req, res, next) => {
    
    const productDoc = await productModel.findById(req.body.product).select("price name");
    if (!productDoc) { 
        return next(new AppError("product not found", 404));
    }
    req.body.price = productDoc.price;
    req.body.name = productDoc.name; 

    let isCartExist = await cartModel.findOne({ user: req.user._id });

    if (!isCartExist) { 
        let cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body] 
        });

        calcPrice(cart); 
        await cart.save();
        return res.status(201).json({ message: "created", cart });
    }
    let item = isCartExist.cartItems.find(
        (ele) => ele.product && ele.product.toString() === req.body.product.toString()
    );

    if (item) { 
        item.quantity = (item.quantity || 0) + 1; 
       
    } else { 
        const newItem = { ...req.body }; 
        if (newItem.quantity === undefined) {
             newItem.quantity = 1; 
        }
        isCartExist.cartItems.push(newItem);
    }

    calcPrice(isCartExist); 
    await isCartExist.save();
    res.json({ message: "cart updated successfully", cart: isCartExist }); 
});

export const deleteCartItem = asyncHandler(async(req,res,next) =>{
    let cart = await cartModel.findOneAndUpdate({user: req.user._id}, {
        $pull:{cartItems: {product: req.params.id}}
    }, {new:true})
    res.json({message:"deleted",cart})
})

export const clearCart = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        return next(new AppError("User not authenticated.", 401));
    }
    const updatedCart = await cartModel.findOneAndUpdate(
        { user: req.user._id },
        {
            $set: {
                cartItems: [], 
                totalPrice: 0
            }
        },
        { new: true }
    );
    if (!updatedCart) {
        return res.status(200).json({ message: "No cart found to clear or cart already empty", cart: null });
    }
    res.status(200).json({ message: "Cart cleared successfully", cart: updatedCart });
});

export const updateCart = asyncHandler(async (req,res,next) =>{
    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new AppError("product not found",404))
    req.body.price = product.price
   let isCartExist = await cartModel.findOne({user: req.user._id})
   let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
    !item && next(new AppError("not found",404))
   if(item){
    item.quantity = req.body.quantity;
   }

  calcPrice(isCartExist)
   await isCartExist.save()
    res.json({message:"Done",isCartExist})
})

export const applyCoupon = asyncHandler(async (req,res,next) =>{
    let code =  await couponModel.findOne({code: req.params.code});
    let cart = await cartModel.findOne({user: req.user._id});
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount)/100;
    await cart.save();
    res.json({message:"done", cart})
})