import express from 'express'
const router = express.Router();
import { productModel } from '../models/productSchema'
import { verifyTokenAndAdmin } from '../middlewares/verify';
import { productInterface } from '../interfaces/product';


router.post('/create', verifyTokenAndAdmin, async (req, res) => {
    const productData = new productModel<productInterface>({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        categories: req.body.categories,
        size: req.body.size,
        color: req.body.color,
        prize: req.body.prize
    })
    try {
        const savedProduct = await productData.save()
        if (!savedProduct) return res.status(500).json('Products not saved to cart')
        res.status(200).send(savedProduct)
    } catch (error) {
        res.status(501).json(error)
    }
})

router.put('/update/:productId', verifyTokenAndAdmin, async (req, res) => {
    const id = req.params.productId
    const data = req.body

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id,
            {
                $set: data
            }, { new: true })
        if (!updatedProduct) return res.status(500).json('server problem updating data ')
        res.status(200).send(updatedProduct)
    } catch (error) {
        res.status(502).json(error)
    }
})

router.delete('/delete/:productId', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.params.productId
    try {
        const deletedProduct = await productModel.findByIdAndDelete(productId)
        if (!deletedProduct) return res.status(500).json('server problem cannot delete product')
        res.status(200).json('Product deleted successfully')
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/all', async (req, res) => {
    try {
        const allProducts = await productModel.find();
        if (!allProducts) return res.status(500).json('server not getting all products')
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/single/:productId', async (req, res) => {
    const productId = req.params.productId
    try {
        const singleProduct = await productModel.findById(productId)
        if (!singleProduct) return res.status(500).json('there is no product')
        res.status(200).json(singleProduct)

    } catch (error) {
        res.status(600).json(error)
    }
})

export const product = router