"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAdmin = exports.verifyTokenAndAuthorization = exports.verifyToken = exports.checkEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../models/userSchema");
async function checkEmail(req, res, next) {
    const UserEmail = req.body.email;
    const user = await userSchema_1.UserModel.findOne({ email: UserEmail });
    if (user)
        return res.status(502).send('Email id already existed');
    next();
}
exports.checkEmail = checkEmail;
function verifyToken(req, res, next) {
    const authHeader = req.headers.token;
    const jwtKey = process.env.jwtKey;
    if (authHeader) {
        jsonwebtoken_1.default.verify(authHeader, jwtKey, (err, token) => {
            if (err)
                return res.status(503).send('token is not there');
            req.user = token;
            next();
        });
    }
    else {
        res.status(500).json('No token');
    }
}
exports.verifyToken = verifyToken;
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
            next();
        }
        else {
            res.status(500).json('token and id is not matching the same user');
        }
    });
}
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(500).json('you are not a admin');
        }
    });
}
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
