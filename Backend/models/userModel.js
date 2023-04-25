const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        Country: String
    },
    cart: []

})

module.exports = mongoose.model('User', UserModel)