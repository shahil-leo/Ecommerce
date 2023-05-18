import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/verify";
import { categoryModel } from "../models/categorySchema";
import { categoryInterface } from "../interfaces/product";
const router = Router()

router.post('/add', verifyTokenAndAdmin, async (req, res) => {
    try {
        const newCategory = new categoryModel<categoryInterface>({
            categories: req.body.category,
            categoryImg: req.body.categoryImg
        })
        const newerCategory = await newCategory.save()
        if (!newerCategory) return res.status(500).json('category not added')
        return res.status(200).json(newerCategory)
    } catch (error) {
        return res.status(500).json(error)
    }

})

router.get('/every', verifyToken, async (req, res) => {
    try {
        const everyCategory = await categoryModel.find()
        if (!everyCategory) return res.status(500).json('every category found')
        return res.status(200).json(everyCategory)
    } catch (error) {
        res.send(500).json(error)
    }
})
router.put('/update/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCategory = await categoryModel.
            findByIdAndUpdate(req.params.id, { $set: { categories: req.body.category } })
        if (!updatedCategory) return res.status(500).json('cannot update category')
        return res.status(200).json(updatedCategory)
    } catch (error) {
        res.send(500).json(error)
    }
})
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedCategory = await categoryModel.
            findByIdAndDelete(req.params.id)
        if (!deletedCategory) return res.status(500).json('cannot update category')
        return res.status(200).json(deletedCategory)
    } catch (error) {
        res.send(500).json(error)
    }
})

export const category = router