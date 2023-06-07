"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const express_1 = require("express");
const verify_1 = require("../middlewares/verify");
const userSchema_1 = require("../models/userSchema");
const router = (0, express_1.Router)();
// get the current user
router.get('/get/:id', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    try {
        const User = await userSchema_1.UserModel.findById(req.params.id);
        if (!User) {
            throw new Error("no user found");
        }
        return res.status(200).send(User);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// getAll users
router.get('/getAll/', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const everyUser = await userSchema_1.UserModel.find();
        if (!everyUser) {
            throw new Error("No user is logged in");
        }
        return res.status(200).json(everyUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// delete user
router.delete('/delete/:id', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params;
    try {
        const profileDeleted = await userSchema_1.UserModel.findByIdAndDelete(id);
        if (!profileDeleted) {
            throw new Error("No user deleted");
        }
        return res.status(200).json(profileDeleted);
    }
    catch (errors) {
        return res.status(500).json(errors);
    }
});
exports.profile = router;
