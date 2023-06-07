"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const express_1 = __importDefault(require("express"));
const cloudinary_config_1 = require("../configs/cloudinary.config");
const multer_1 = __importDefault(require("../middlewares/multer"));
const verify_1 = require("../middlewares/verify");
const cartSchema_1 = require("../models/cartSchema");
const productSchema_1 = require("../models/productSchema");
const router = express_1.default.Router();
// creating a new product
router.post('/create', multer_1.default.single('file'), verify_1.verifyTokenAndAdmin, async (req, res) => {
    var _a;
    const { file, body } = req;
    if (!(req.file))
        throw 'no file found';
    try {
        const imageCloud = await cloudinary_config_1.cloud.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const { title, description, category, size, color, price, brand, } = body;
        const productData = new productSchema_1.productModel({
            title,
            description,
            image: imageCloud.secure_url,
            categories: category,
            size,
            color,
            prize: price,
            brand,
            quantity: 1
        });
        const savedProduct = await productData.save();
        if (!savedProduct) {
            throw new Error("no new product created");
        }
        return res.status(200).send(savedProduct);
    }
    catch (error) {
        return res.status(501).json(error);
    }
});
// updating a product details
router.put('/update/:productId', multer_1.default.single('file'), verify_1.verifyTokenAndAdmin, async (req, res) => {
    var _a;
    try {
        const { title, description, category, size, color, price, brand, } = req.body;
        const imageCloud = await cloudinary_config_1.cloud.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const updatedProduct = await productSchema_1.productModel.findByIdAndUpdate(req.params.productId, {
            $set: {
                title,
                description,
                image: imageCloud.secure_url,
                categories: category,
                size,
                color,
                prize: price,
                brand,
                quantity: 1
            }
        }, { new: true });
        if (!updatedProduct) {
            throw new Error("server problem updating data");
        }
        return res.status(200).send(updatedProduct);
    }
    catch (error) {
        return res.status(502).json(error);
    }
});
// searching to get one user
router.get("/search/:searchKey", async (req, res) => {
    try {
        const searchRegEx = new RegExp(req.params.searchKey, "i");
        const products = await productSchema_1.productModel.find({ title: { $regex: searchRegEx } });
        if (!exports.product) {
            throw new Error("no products find using the letter");
        }
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// deleting a product 
router.delete('/delete/:productId', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await productSchema_1.productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new Error("cannot delete product");
        }
        return res.status(200).json('Product deleted successfully');
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// all products getting
router.get('/all', async (req, res) => {
    try {
        const allProducts = await productSchema_1.productModel.find();
        if (!allProducts) {
            throw new Error("No products available.Server Error");
        }
        return res.status(200).json(allProducts);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// for everyone to access the products
router.get('/single/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const singleProduct = await productSchema_1.productModel.findById(productId);
        if (!singleProduct) {
            throw new Error("no product available");
        }
        res.status(200).json(singleProduct);
    }
    catch (error) {
        res.status(600).json(error);
    }
});
// only the products will be accessible for the admin
router.get('/singleProduct/:id', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const oneProduct = await productSchema_1.productModel.findOne({ _id: id });
        if (!oneProduct) {
            throw new Error("no product available");
        }
        return res.status(200).json(oneProduct);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// all category for the 
router.get('/Allcategory', async (req, res) => {
    try {
        const everyCategory = await productSchema_1.productModel.aggregate([
            { $group: { _id: "$categories" } },
            { $project: { _id: 0, categories: "$_id" } }
        ]);
        if (!everyCategory) {
            throw new Error("No category found");
        }
        res.status(200).json(everyCategory);
    }
    catch (e) {
        res.json(e);
    }
});
// routing the category
router.get('/findCategory/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const findCategory = await productSchema_1.productModel.find({ categories: category });
        if (!findCategory) {
            throw new Error("no category found");
        }
        return res.status(200).json(findCategory);
    }
    catch (error) {
        res.send(500).json(error);
    }
});
router.get('/findBrandProduct/:brand', async (req, res) => {
    const brandName = req.params.brand;
    try {
        const findBrand = await productSchema_1.productModel.find({ brand: brandName });
        if (!findBrand)
            return res.status(500).json('no brand product found');
        return res.status(200).json(findBrand);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
router.get('/findBrand', async (req, res) => {
    try {
        const brands = await productSchema_1.productModel.aggregate([
            { $group: { _id: "$brand" } },
            { $project: { _id: 0, brand: "$_id" } }
        ]);
        res.status(200).json(brands);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.post('/updatedQuantity/:id/:productId', verify_1.verifyToken, async (req, res) => {
    const productId = req.params.productId;
    const number = req.body.Number;
    try {
        const definedCart = await cartSchema_1.cartModel.findOne({ userId: req.params.id });
        definedCart === null || definedCart === void 0 ? void 0 : definedCart.products.forEach((element) => {
            if (element.productId === productId) {
                checking();
                async function checking() {
                    const updatedQuantity = await productSchema_1.productModel.updateOne({ _id: productId }, { $set: { quantity: number } });
                    if (!updatedQuantity)
                        return res.status(500).json('not updated');
                    res.status(200).json(updatedQuantity);
                }
            }
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.product = router;
