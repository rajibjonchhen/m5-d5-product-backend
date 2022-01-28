import express from "express"
import multer from "multer"
import uniqid from 'uniqid'
import {saveProductImg, getProducts, writeProducts} from '../../lib/fs-tools.js'
import { validationResult } from "express-validator"
import createHttpError from 'http-errors'
import { productValidator } from "./productValidator.js"


const productsRouter = express.Router()


// post
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

// get all
productsRouter.post('/',async(req,res,next)=>{ try {
    
} catch (error) {
    
}})
// get each product
productsRouter.post('/',async(req,res,next)=>{ try {
    
} catch (error) {
    
}})
// put edit
productsRouter.post('/',async(req,res,next)=>{ try {
    
} catch (error) {
    
}})
// delete
productsRouter.post('/',async(req,res,next)=>{ try {
    
} catch (error) {
    
}})
export default productsRouter