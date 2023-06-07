"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storageEngine = multer_1.default.diskStorage({
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage: storageEngine,
    fileFilter(req, file, cb) {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("only .png , .jpeg , .jpg formats are only allowed"));
        }
    }
});
exports.default = upload;
