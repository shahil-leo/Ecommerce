import { Router } from "express";
import { cloud } from "../configs/cloudinary.config";
import { categoryInterface } from "../interfaces/product";
import upload from "../middlewares/multer";
import { verifyTokenAndAdmin } from "../middlewares/verify";
import { categoryModel } from "../models/categorySchema";
const router = Router()

// adding one category
router.post('/add', upload.single('file'), verifyTokenAndAdmin, async (req, res) => {

    try {

        const { category } = req.body

        const imageCloud = await cloud.uploader.upload(req.file?.path as string)

        const newCategory = new categoryModel<categoryInterface>({
            categories: category,
            categoryImg: imageCloud.secure_url,
        })

        const newerCategory = await newCategory.save()

        if (!newerCategory) {
            throw new Error("Database problem cannot create category");
        }

        return res.status(200).json(newerCategory)

    } catch (error) {
        return res.status(500).json(error)
    }
})

// getting every category
router.get('/every', async (req, res) => {
    try {
        const everyCategory: categoryInterface[] = await categoryModel.find()

        if (!everyCategory) {
            throw new Error("Cannot get every Category server problem");
        }

        return res.status(200).json(everyCategory)

    } catch (error) {
        res.status(500).json(error)
    }
})
// getting only 3 category for the admin panel her page
router.get('/everySome', async (req, res) => {
    try {

        const everyCategory = await categoryModel.find().limit(3)

        if (!everyCategory) {
            throw new Error("cannot get category .Database error please wait");
        }

        return res.status(200).json(everyCategory)

    } catch (error) {
        res.status(500).json(error)
    }
})

//delete one from the items  
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
    try {

        const { id } = req.params

        const deletedCategory = await categoryModel.findByIdAndDelete(id)

        if (!deletedCategory) {
            throw new Error("Cannot delete category");
        }

        return res.status(200).json(deletedCategory)

    } catch (error) {
        res.send(500).json(error)
    }
})

// getting single 
router.get('/single/:id', async (req, res) => {

    try {
        const { id } = req.params

        const singleCategory = await categoryModel.findById(id)

        if (!singleCategory) {
            throw new Error("Cannot get single category");

        }
        return res.status(200).json(singleCategory)
    } catch (error) {
        return res.status(500).json(error)
    }
})


export const category = router