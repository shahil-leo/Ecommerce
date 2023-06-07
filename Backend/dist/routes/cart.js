"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const verify_1 = require("../middlewares/verify");
const cartSchema_1 = require("../models/cartSchema");
const router = express_1.default.Router();
router.use(verify_1.verifyTokenAndAuthorization);
// creating a cart
router.post('/create/:id/:productId', async (req, res) => {
    try {
        const { id: userId, productId } = req.params;
        const { item: carts } = req.body;
        const newCart = new cartSchema_1.cartModel({
            userId,
            carts
        });
        const isCart = await cartSchema_1.cartModel.find({ userId });
        if (isCart.length === 0) {
            const newCarts = await newCart.save();
            if (!newCarts) {
                throw new Error('New cart not created');
            }
            return res.status(200).json(newCarts);
        }
        else {
            const findUserCart = await cartSchema_1.cartModel.findOne({
                "userId": new mongodb_1.ObjectId(userId),
                "carts._id": new mongodb_1.ObjectId(productId)
            }, { "carts.$": 1 });
            if (findUserCart) {
                const updateUser = await cartSchema_1.cartModel.updateOne({
                    "userId": new mongodb_1.ObjectId(userId),
                    "carts._id": new mongodb_1.ObjectId(productId)
                }, { $inc: { "carts.$.quantity": 1 } });
                if (!updateUser) {
                    return new Error('Not updated the cart number');
                }
                return res.status(200).json(updateUser);
            }
            else {
                const pushNewCart = await cartSchema_1.cartModel.findOneAndUpdate({ userId: req.params.id }, { $push: { carts: carts } }, { new: true });
                if (!pushNewCart) {
                    throw new Error("No new Data found");
                }
                return res.status(200).json(pushNewCart);
            }
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// updating the number in cart
router.post('/updateNumber/:id/:productId', async (req, res) => {
    try {
        const { number: updatedQuantity } = req.body;
        const { id: userId, productId } = req.params;
        if (!(req.body.number)) {
            // find a cart item is available or not
            const findUserCart = await cartSchema_1.cartModel.findOne({
                "userId": new mongodb_1.ObjectId(userId),
                "carts._id": new mongodb_1.ObjectId(productId)
            }, { "carts.$": 1 });
            if (findUserCart) {
                // increasing the quantity of the cart
                const updateUser = await cartSchema_1.cartModel.updateOne({
                    "userId": new mongodb_1.ObjectId(userId),
                    "carts._id": new mongodb_1.ObjectId(productId)
                }, { $inc: { "carts.$.quantity": 1 } });
                if (!updateUser) {
                    throw new Error('Not updated the cart item quantity');
                }
                return res.status(200).json(updateUser);
            }
        }
        else {
            // if there is a number sending from the request then all them all to the quantity
            const updateUser = await cartSchema_1.cartModel.updateOne({
                "userId": new mongodb_1.ObjectId(userId),
                "carts._id": new mongodb_1.ObjectId(productId)
            }, { $set: { "carts.$.quantity": updatedQuantity } });
            if (!updateUser) {
                throw new Error('not added updated the quantity of the product ');
            }
            res.status(200).json(updateUser);
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// delete cart item
router.delete('/delete/:id/:productId', async (req, res) => {
    try {
        const { id, productId } = req.params;
        const deletedCartItem = await cartSchema_1.cartModel.updateOne({ "userId": new mongodb_1.ObjectId(id) }, { $pull: { "carts": { "_id": new mongodb_1.ObjectId(productId) } } });
        if (!deletedCartItem) {
            throw new Error('No cart item deleted');
        }
        return res.status(200).json(deletedCartItem);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// delete everything in the cart 
router.delete('/deleteAll/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAll = await cartSchema_1.cartModel.deleteOne({ userId: id });
        if (!deleteAll) {
            throw Error('Deleted every cart object');
        }
        return res.status(200).json(deleteAll);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// get single cart
router.get('/getCart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getCart = await cartSchema_1.cartModel.findOne({ userId: id });
        if (!getCart) {
            throw new Error("cannot get cart");
        }
        res.status(200).json(getCart);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.cart = router;
