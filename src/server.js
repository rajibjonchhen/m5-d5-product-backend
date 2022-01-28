import express from "express"
import listEndpoints from "express-list-endpoints" 
import productsRouter from './service/server/product/index.js'
import  {join} from 'path'

const server = express()
const port  = 3001
const publicFolderPath = join(process.cwd(), './public/image')

server.use(express.static(publicFolderPath))
server.use(express.json())
server.use(cors())

server.use('/products',productsRouter)
console.table(listEndpoints(server))
server.listen(port,() => {
    console.log(`the port is ${port}`)
})