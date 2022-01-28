import express from "express"
import listEndpoints from "express-list-endpoints" 
import productsRouter from './service/server/product/index.js'
import cors from 'cors'
import  {join} from 'path'
import { badRequest, genericError, unauthorised, notFound } from "./errorHandler.js"

const server = express()
const port  = 3001
const publicFolderPath = join(process.cwd(), './public/image')

server.use(express.static(publicFolderPath))
server.use(express.json())
server.use(cors())

server.use('/products',productsRouter)
server.use(badRequest)
server.use(unauthorised)
server.use(notFound)
server.use(genericError)
console.table(listEndpoints(server))
server.listen(port,() => {
    console.log(`the port is ${port}`)
})