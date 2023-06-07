"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const express_1 = require("express");
const cloudinary_config_1 = require("../configs/cloudinary.config");
const multer_1 = __importDefault(require("../middlewares/multer"));
const verify_1 = require("../middlewares/verify");
const categorySchema_1 = require("../models/categorySchema");
const router = (0, express_1.Router)();
// adding one category
router.post('/add', multer_1.default.single('file'), verify_1.verifyTokenAndAdmin, async (req, res) => {
    var _a;
    try {
        const { category } = req.body;
        const imageCloud = await cloudinary_config_1.cloud.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const newCategory = new categorySchema_1.categoryModel({
            categories: category,
            categoryImg: imageCloud.secure_url,
        });
        const newerCategory = await newCategory.save();
        if (!newerCategory) {
            throw new Error("Database problem cannot create category");
        }
        return res.status(200).json(newerCategory);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// getting every category
router.get('/every', async (req, res) => {
    try {
        const everyCategory = await categorySchema_1.categoryModel.find();
        if (!everyCategory) {
            throw new Error("Cannot get every Category server problem");
        }
        return res.status(200).json(everyCategory);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// getting only 3 category for the admin panel her page
router.get('/everySome', async (req, res) => {
    try {
        const everyCategory = await categorySchema_1.categoryModel.find().limit(3);
        if (!everyCategory) {
            throw new Error("cannot get category .Database error please wait");
        }
        return res.status(200).json(everyCategory);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
//delete one from the items  
router.delete('/delete/:id', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categorySchema_1.categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error("Cannot delete category");
        }
        return res.status(200).json(deletedCategory);
    }
    catch (error) {
        res.send(500).json(error);
    }
});
// getting single 
router.get('/single/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const singleCategory = await categorySchema_1.categoryModel.findById(id);
        if (!singleCategory) {
            throw new Error("Cannot get single category");
        }
        return res.status(200).json(singleCategory);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.category = router;
