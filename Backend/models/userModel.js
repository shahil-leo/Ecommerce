const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('User', UserModel)