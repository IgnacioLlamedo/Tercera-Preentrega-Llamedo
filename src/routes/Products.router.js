import { Router } from "express"
import { pm } from "../app.js"

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    const limit = parseInt(String(req.query.limit))
    try {
        const products = await pm.getProductsJSON(limit)
        res.json(products)
    }
    catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const {pid} = req.params
    try{
        const product = await pm.getProductByIdJSON(pid)
        res.json(product)
    }
    catch (error){
        res.json({
            status: "error",
            message: error.message
        })
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status = true, stock, category, thumbnails } = req.body
        const response = await pm.addProductJSON({ title, description, code, price, status, stock, category, thumbnails })
        res.json(response)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        const { title, description, code, price, status = true, stock, category, thumbnails } = req.body
        const response = await pm.updateProductJSON(id, { title, description, code, price, status, stock, category, thumbnails })
        res.json(response)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        await pm.deleteProductJSON(id)
        res.send('Product deleted')
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

export {productsRouter}