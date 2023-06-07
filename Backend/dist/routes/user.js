"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const verify_1 = require("../middlewares/verify");
const userSchema_1 = require("../models/userSchema");
const router = express_1.default.Router();
// delete a user from the admin panel
router.delete('/delete/:id', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userSchema_1.UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(500).send('Cannot delete user Please try again later');
        }
        res.status(200).send(deletedUser);
    }
    catch (error) {
        res.status(500).send('user Id is not valid');
    }
});
// show all the users in the admin
router.get('/allUser', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const allUser = await userSchema_1.UserModel.find();
        if (!allUser) {
            return res.status(500).json('No users found ');
        }
        res.status(200).json(allUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// get single user for the logged user in the profile module
router.get('/single/:id', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    try {
        const singleUser = await userSchema_1.UserModel.findById(req.params.id);
        if (!singleUser) {
            return res.status(500).json('User not found');
        }
        res.status(200).json(singleUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.user = router;
