import express from "express"
import multer from "multer"
import uniqid from 'uniqid'
import {saveProductImg, getProducts, writeProducts} from '../../lib/fs-tools.js'
import { validationResult } from "express-validator"
import createHttpError from 'http-errors'
import { productValidator } from "./productValidator.js"
import { reviewValidator } from "./reviewValidator.js"


const productsRouter = express.Router()


// POST ************************ Add a new product*********************************************
productsRouter.post('/',productValidator, async(req,res,next)=>{ 
try {
    const errors = validationResult(req)

   if(errors.isEmpty()){
    const productsArray = await getProducts() 
    const newProduct = {...req.body, _id:uniqid(), createAt: new Date(), imageUrl:`http://localhost:300/`}   
    productsArray.push(newProduct)
    await writeProducts(productsArray)
    res.status(201).send(`New product added with id - ${newProduct._id}`)
   } else {
       next(createHttpError(400,{errors}))
    }
} catch (error) {
    next(error)
}})

//************************ GET ALL PRODUCTS *********************************************
productsRouter.get('/',async(req,res,next)=>{ try {

 const productsArray = await getProducts()
 res.status(200).send(productsArray)
    
} catch (error) {
   next(error) 
}})

// get each product
productsRouter.get('/:id',async(req,res,next)=>{ try {

    const productsArray = await getProducts()
    const specificProduct = productsArray.find(product => product._id === req.params.id)
    res.status(200).send(specificProduct)

} catch (error) {
   next(error) 
}})

// put edit
productsRouter.put('/:id',async(req,res,next)=>{ try {

    const productsArray = await getProducts()
    const index = productsArray.findIndex(product => product._id === req.params.id)
    const oldProduct = productsArray[index]
    const updatedProduct = {...oldProduct, ...req.body, updatedAt: new Date()}
    productsArray[index] = updatedProduct
    await writeProducts(productsArray) 
    res.send(updatedProduct)
    
} catch (error) {
   next(error) 
}})
// delete
productsRouter.delete('/:id',async(req,res,next)=>{
     try 
     {
    const productsArray = await getProducts()
    const remainingProducts = productsArray.filter(product => product._id !== req.params.id)
    await writeProducts(remainingProducts)
    res.status(204).send("Product has been deleted")    //Status not found
    
} catch (error) {
   next(error) 
}})

//****************************Review section*****************************
//Post a Review 
productsRouter.post('/:id/reviews', reviewValidator, async(req,res,next) => {
    try {
       const errors = validationResult(req)

    if(errors.isEmpty()){
        const productsArray = await getProducts() 
        const productId = req.params.id
        const index = productsArray.findIndex(product => product._id === productId);
        const specificProduct = productsArray[index]
        specificProduct.reviews = specificProduct.reviews || []
        const newReview = {...req.body, productId: productId, _id: uniqid()}
        const updatedProduct = {...specificProduct,reviews:[...specificProduct.reviews,newReview ]}
        productsArray[index] = updatedProduct
        await writeProducts(productsArray)
        res.send({message:`New review added successfully- ${updatedProduct}`}) //Error
    } else {
        next(createHttpError(400,{errors}))
        }
        
    } catch (error) {
       next(error) 
    }
})

//GET All Reviews

productsRouter.get('/:id/reviews', async (req,res,next) =>{
    try {
        const productsArray = await getProducts()
        const singleProduct = productsArray.find(product => product._id === req.params.id)
        // singleProduct.review = singleProduct.review || []
        res.send(singleProduct.reviews)
        
    } catch (error) {
        next(error)
    }

})

//GET single Review

productsRouter.get('/:id/reviews/:reviewId', async (req,res,next) =>{
    try {
        const productsArray = await getProducts()
        const singleProduct = productsArray.find(product => product._id === req.params.id)
        const singleReview = singleProduct.reviews.find(review => review._id === req.params.reviewId)
        res.send(singleReview)
    } catch (error) {
        next(error)
    }

})

//EDIT single Review //PUT

productsRouter.put('/:id/reviews/:reviewId', async (req,res,next) =>{
    try {
        const productsArray = await getProducts()
        const productIndex = productsArray.findIndex(product => product._id === req.params.id)
        const singleProduct = productsArray[productIndex]
        const reviewIndex = singleProduct.reviews.findIndex(review => review._id === req.params.reviewId)
        const singleReview = singleProduct.reviews[reviewIndex]
        const updatedReview = {...singleReview,...req.body,updatedAt: new Date()}
        singleProduct.reviews[reviewIndex] = updatedReview
        productsArray[productIndex] = singleProduct
        await writeProducts(productsArray)
        res.send(updatedReview)
    } catch (error) {
        next(error)
    }
})

//DELETE single Review

productsRouter.delete('/:id/reviews/:reviewId', async (req,res,next) =>{
    try {
        const productsArray = await getProducts()
        const productIndex = productsArray.findIndex(product => product._id === req.params.id)
        const singleProduct = productsArray[productIndex]
        const remainingReviews = singleProduct.reviews.filter(review => review._id !== req.params.reviewId)
        singleProduct.reviews= remainingReviews

        productsArray[productIndex] = singleProduct
        await writeProducts(productsArray)
        res.send()
    } catch (error) {
        next(error)
    }
})









export default productsRouter