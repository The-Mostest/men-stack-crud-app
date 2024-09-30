// Const Require
const mongoose = require('mongoose')

// Schema

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }

})

// Model

const User = mongoose.model('User', userSchema)

// Export

module.exports = User
