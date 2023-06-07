"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { timestamps: true });
exports.productModel = mongoose_1.default.model('products', productSchema);
