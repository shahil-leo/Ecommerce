"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const nodeMailer_config_1 = require("../configs/nodeMailer.config");
const verify_1 = require("../middlewares/verify");
const userSchema_1 = require("../models/userSchema");
dotenv_1.default.config();
const router = express_1.default.Router();
let code;
// generating random numbers for the forgot password and sending the code to mail
function generateCode() {
    const code = crypto_1.default.randomBytes(3).toString('hex');
    return code;
}
// creating user 
router.post('/register', verify_1.checkEmail, async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const saltRounds = await bcrypt_1.default.genSalt(10);
        const encryptedPass = await bcrypt_1.default.hash(req.body.password, saltRounds);
        const user = new userSchema_1.UserModel({
            firstName,
            lastName,
            email,
            password: encryptedPass,
        });
        const createdUser = await user.save();
        if (!createdUser) {
            return res.status(500).json('Failed to create user.There was a problem in the database');
        }
        return res.status(200).send(createdUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
function emailAndPassForRecover(email, password) {
    return { email, password };
}
// login user
router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userSchema_1.UserModel.findOne({ email: email });
        if (!user) {
            return res.status(500).json('no user found with this email id');
        }
        const RealPassword = await bcrypt_1.default.compare(req.body.password, user._doc.password);
        if (!RealPassword) {
            return res.status(501).json('Invalid password');
        }
        const secretKeyJwt = process.env.jwtKey;
        // creating accessToken with userId and isAdmin property
        const accessToken = jsonwebtoken_1.default.sign({
            id: user._doc._id,
            isAdmin: user._doc.isAdmin
        }, secretKeyJwt, { expiresIn: '5d' });
        const _a = user._doc, { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(200).json(Object.assign(Object.assign({}, userWithoutPassword), { accessToken }));
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// forgot password sending code using node mailer and checking the code is same or not
router.post('/forgot', async (req, res) => {
    try {
        const emailId = req.body.email;
        const user = await userSchema_1.UserModel.findOne({ email: emailId });
        if (!user) {
            return res.status(500).json('no user found with this email id');
        }
        // generate random codes 
        code = generateCode();
        const message = {
            from: 'mshahilk28@gmail.com',
            to: `${emailId}`,
            subject: 'Verify your email',
            text: 'Please verify your email address ',
            html: `<p>Your verification code is ${code} do not share with anyone </a>`
        };
        nodeMailer_config_1.transport.sendMail(message, (error) => {
            if (error) {
                return res.status(500).json('An error occurred while sending the email');
            }
            else {
                recoveryEmail();
                async function recoveryEmail() {
                    const addRecoverCode = await userSchema_1.UserModel.updateOne({ _id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id) }, { $set: { recoveryCode: code } }, { new: true });
                    if (!addRecoverCode) {
                        return res.status(500).json('No recovery code is set to backend');
                    }
                    return res.status(200).json(addRecoverCode);
                }
            }
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// check the user recovery code from the DB and the code saved locally if the 2 is same then we are updating the user
router.post('/check', async (req, res) => {
    const { email, code } = req.body;
    const user = await userSchema_1.UserModel.findOne({ email: email });
    if (!user)
        return res.status(500).json('not user found');
    if (code === user.recoveryCode) {
        return res.status(200).json(user);
    }
    else {
        return res.status(500).json('you are not that user');
    }
});
router.get('/token', (req, res) => {
    try {
        const token = req.headers.token;
        const jwtKey = process.env.jwtKey;
        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, jwtKey);
        if (!decodedToken) {
            return res.status(500).json({ error: 'Invalid token' });
        }
        return res.status(200).json(decodedToken);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.auth = router;
