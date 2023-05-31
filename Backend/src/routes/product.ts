import express from 'express';
import { cloud } from '../configs/cloudinary.config';
import { productInterface } from '../interfaces/product';
import upload from '../middlewares/multer';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/verify';
import { cartModel } from '../models/cartSchema';
import { productModel } from '../models/productSchema';
const router = express.Router();



router.post('/create', upload.single('file'), verifyTokenAndAdmin, async (req, res) => {

    const { file, body } = req
    if (!(req.file)) throw 'no file found'
    try {
        const imageCloud = await cloud.uploader.upload(req.file?.path)
        const {
            title,
            description,
            category,
            size,
            color,
            price,
            brand,
        } = body
        console.log(req.body)
        console.log(req.file);

        const productData = new productModel<productInterface>({
            title,
            description,
            image: imageCloud.secure_url,
            categories: category as string[],
            size,
            color,
            prize: price,
            brand,
            quantity: 1
        })
        const savedProduct = await productData.save()
        if (!savedProduct) return res.status(500).json('Products not saved to cart')
        return res.status(200).send(savedProduct)
    } catch (error) {
        return res.status(501).json(error)
    }
})

router.put('/update/:productId', upload.single('file'), verifyTokenAndAdmin, async (req, res) => {

    try {
        const {
            title,
            description,
            category,
            size,
            color,
            price,
            brand,
        } = req.body

        const imageCloud = await cloud.uploader.upload(req.file?.path as string)

        const updatedProduct = await productModel.findByIdAndUpdate(req.params.productId,
            {
                $set: {
                    title,
                    description,
                    image: imageCloud.secure_url,
                    categories: category as string[],
                    size,
                    color,
                    prize: price,
                    brand,
                    quantity: 1
                }
            }, { new: true })
        if (!updatedProduct) return res.status(500).json('server problem updating data ')
        return res.status(200).send(updatedProduct)
    } catch (error) {
        return res.status(502).json(error)
    }
})

router.delete('/delete/:productId', verifyTokenAndAdmin, async (req, res) => {
    const { productId } = req.params
    try {
        const deletedProduct = await productModel.findByIdAndDelete(productId)
        if (!deletedProduct) return res.status(500).json('server problem cannot delete product')
        return res.status(200).json('Product deleted successfully')
    } catch (error) {
        return res.status(500).json(error)
    }
})


router.get('/all', async (req, res) => {
    try {
        const allProducts = await productModel.find();
        if (!allProducts) return res.status(500).json('server not getting all products')
        return res.status(200).json(allProducts)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/single/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const singleProduct = await productModel.findById(productId)
        if (!singleProduct) return res.status(500).json('no product available')
        res.status(200).json(singleProduct)

    } catch (error) {
        res.status(600).json(error)
    }
})

router.get('/singleProduct/:id', verifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params
    try {
        const oneProduct = await productModel.findOne({ _id: id })
        if (!oneProduct) return res.status(500).json('not find any')
        return res.status(200).json(oneProduct)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/Allcategory', async (req, res) => {
    try {
        const everyCategory = await productModel.aggregate([
            { $group: { _id: "$categories" } },
            { $project: { _id: 0, categories: "$_id" } }
        ])
        if (!everyCategory) return res.status(500).json('No category found')
        res.json(everyCategory)
    } catch (e) {
        res.json(e)
    }
})

router.get('/findCategory/:category', async (req, res) => {
    const { category } = req.params
    try {
        const findCategory = await productModel.find({ categories: category })
        if (!findCategory) return res.status(500).json('no category found')
        return res.status(200).json(findCategory)
    } catch (error) {
        res.send(500).json(error)
    }
})
router.get('/findBrandProduct/:brand', async (req, res) => {
    const brandName = req.params.brand
    try {
        const findBrand = await productModel.find({ brand: brandName })
        if (!findBrand) return res.status(500).json('no brand product found')
        return res.status(200).json(findBrand)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/findBrand', async (req, res) => {
    try {
        const brands = await productModel.aggregate([
            { $group: { _id: "$brand" } },
            { $project: { _id: 0, brand: "$_id" } }
        ])
        res.status(200).json(brands)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/updatedQuantity/:id/:productId', verifyToken, async (req, res) => {
    const productId = req.params.productId
    const number = req.body.Number
    try {
        const definedCart: any = await cartModel.findOne({ userId: req.params.id })
        definedCart.products.forEach((element: any) => {
            if (element.productId === productId) {
                checking()
                async function checking() {
                    const updatedQuantity = await productModel.updateOne({ _id: productId }, { $set: { quantity: number } })
                    if (!updatedQuantity) return res.status(500).json('not updated')
                    res.status(200).json(updatedQuantity)
                }
            }
        });
    } catch (error) {
        res.status(500).json(error)
    }
})

export const product = router