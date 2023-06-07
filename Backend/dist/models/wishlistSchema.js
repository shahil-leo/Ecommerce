"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishListModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const wishListSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true
    },
    wishList: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            categories: { type: Array, required: true },
            size: { type: Number, required: true },
            color: { type: String, required: true },
            prize: { type: Number, required: true },
            brand: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ]
}, { timestamps: true });
exports.wishListModel = mongoose_1.default.model('wishList', wishListSchema);
