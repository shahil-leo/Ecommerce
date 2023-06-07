"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true
    },
    carts: [
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
exports.cartModel = mongoose_1.default.model('cart', cartSchema);
