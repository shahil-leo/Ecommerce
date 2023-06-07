"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlist = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const verify_1 = require("../middlewares/verify");
const wishlistSchema_1 = require("../models/wishlistSchema");
const router = (0, express_1.Router)();
router.post('/create/:id/:productId', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    const { id, productId } = req.params;
    const { item } = req.body;
    const newWish = new wishlistSchema_1.wishListModel({
        userId: id,
        wishList: item
    });
    const isCart = await wishlistSchema_1.wishListModel.find({ userId: id });
    if (isCart.length === 0) {
        try {
            const newCart = await newWish.save();
            if (!newCart)
                return res.status(500).json('wishlist item not added to the db');
            return res.status(200).json(newCart);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        const findUserCart = await wishlistSchema_1.wishListModel.findOne({ "userId": new mongodb_1.ObjectId(id), "wishList._id": new mongodb_1.ObjectId(productId) }, { "wishList.$": 1 });
        if (findUserCart) {
            return res.status(500).json('already added to wishlist');
        }
        else {
            const pushNewCart = await wishlistSchema_1.wishListModel.findOneAndUpdate({ userId: id }, { $push: { wishList: item } }, { new: true });
            if (!pushNewCart)
                return res.status(500).json('no new data added');
            return res.status(200).json(pushNewCart);
        }
    }
});
router.get('/get/:id', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params;
    try {
        const getCart = await wishlistSchema_1.wishListModel.findOne({ userId: id });
        if (!getCart)
            return res.status(500).json(getCart);
        res.status(200).json(getCart);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
router.delete('/delete/:id/:productId', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    const { id, productId } = req.params;
    try {
        const deletedProduct = await wishlistSchema_1.wishListModel.updateOne({ "userId": new mongodb_1.ObjectId(id) }, { $pull: { "wishList": { "_id": new mongodb_1.ObjectId(productId) } } });
        if (!deletedProduct)
            return res.status(500).json('no cart is deleted');
        return res.status(200).json(deletedProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.delete('/deleteAll/:id', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params;
    try {
        const deleteAll = await wishlistSchema_1.wishListModel.deleteOne({ userId: id });
        if (!deleteAll)
            return res.status(502).json('cannot delete full array');
        return res.status(200).json(deleteAll);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.wishlist = router;
