"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("./routes/auth");
const cart_1 = require("./routes/cart");
const category_1 = require("./routes/category");
const order_1 = require("./routes/order");
const product_1 = require("./routes/product");
const profile_1 = require("./routes/profile");
const user_1 = require("./routes/user");
const wishlist_1 = require("./routes/wishlist");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
dotenv_1.default.config();
const mongoPass = process.env.mongoPass;
const mongoUrl = `mongodb+srv://shahil_kv:${mongoPass}@securepass.ltjt1vx.mongodb.net/Ecommerce`;
mongoose_1.default.connect(mongoUrl).then(() => {
    app.listen(4000, () => {
        console.log("Server connected to port 4000");
    });
    console.log('Database connected');
}).catch((e) => {
    console.log(e);
});
app.use('/auth', auth_1.auth);
app.use('/user', user_1.user);
app.use('/product', product_1.product);
app.use('/cart', cart_1.cart);
app.use('/order', order_1.order);
app.use('/category', category_1.category);
app.use('/profile', profile_1.profile);
app.use('/wishlist', wishlist_1.wishlist);
