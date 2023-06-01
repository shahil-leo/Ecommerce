import express from 'express';
import { cloud } from '../configs/cloudinary.config';
import { productInterface } from '../interfaces/product';
import upload from '../middlewares/multer';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/verify';
import { cartModel } from '../models/cartSchema';
import { productModel } from '../models/productSchema';
const router = express.Router();

// creating a new product
router.post('/create', upload.single('file'), verifyTokenAndAdmin, async (req, res) => {

    const { file, body } = req
    if (!(req.file)) throw 'no file found'
    try {
        const imageCloud = await cloud.uploader.upload(req.file?.path)
        const { title, description, category, size, color, price, brand, } = body

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
        if (!savedProduct) {
            throw new Error("no new product created");

        }

        return res.status(200).send(savedProduct)

    } catch (error) {
        return res.status(501).json(error)
    }
})

// updating a product details
router.put('/update/:productId', upload.single('file'), verifyTokenAndAdmin, async (req, res) => {

    try {
        const { title, description, category, size, color, price, brand, } = req.body

        const imageCloud = await cloud.uploader.upload(req.file?.path as string)

        const updatedProduct = await productModel.findByIdAndUpdate<productInterface>(req.params.productId,
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

        if (!updatedProduct) {
            throw new Error("server problem updating data");
        }

        return res.status(200).send(updatedProduct)

    } catch (error) {
        return res.status(502).json(error)
    }
})

// searching to get one user
router.get("/search/:searchKey", async (req, res) => {
    try {
        const searchRegEx = new RegExp(req.params.searchKey, "i")
        const products = await productModel.find({ title: { $regex: searchRegEx } })

        if (!product) {
            throw new Error("no products find using the letter");
        }

        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json(error)
    }
}
);

// deleting a product 
router.delete('/delete/:productId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { productId } = req.params

        const deletedProduct = await productModel.findByIdAndDelete(productId)

        if (!deletedProduct) {
            throw new Error("cannot delete product");
        }

        return res.status(200).json('Product deleted successfully')

    } catch (error) {
        return res.status(500).json(error)
    }
})

// all products getting
router.get('/all', async (req, res) => {
    try {
        const allProducts = await productModel.find();

        if (!allProducts) {
            throw new Error("No products available.Server Error");
        }
        return res.status(200).json(allProducts)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// for everyone to access the products
router.get('/single/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const singleProduct = await productModel.findById(productId)
        if (!singleProduct) {
            throw new Error("no product available");
        }

        res.status(200).json(singleProduct)

    } catch (error) {
        res.status(600).json(error)
    }
})

// only the products will be accessible for the admin
router.get('/singleProduct/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params

        const oneProduct = await productModel.findOne({ _id: id })

        if (!oneProduct) {
            throw new Error("no product available");
        }

        return res.status(200).json(oneProduct)

    } catch (error) {
        return res.status(500).json(error)
    }
})

// all category for the 
router.get('/Allcategory', async (req, res) => {
    try {
        const everyCategory = await productModel.aggregate([
            { $group: { _id: "$categories" } },
            { $project: { _id: 0, categories: "$_id" } }
        ])
        if (!everyCategory) {
            throw new Error("No category found");
        }

        res.status(200).json(everyCategory)

    } catch (e) {
        res.json(e)
    }
})

router.get('/findCategory/:category', async (req, res) => {
    const { category } = req.params
    try {

        const findCategory = await productModel.find({ categories: category })

        if (!findCategory) {
            throw new Error("no category found");
        }

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
        definedCart?.products.forEach((element: any) => {
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