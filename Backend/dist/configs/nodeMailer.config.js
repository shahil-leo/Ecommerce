"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transport = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
exports.transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'mshahilk28@gmail.com',
        pass: `${process.env.node_mailer}`
    }
});
