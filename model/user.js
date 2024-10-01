// Const Require
const mongoose = require('mongoose')            // Way to communicate with the database

// Schema

const userSchema = new mongoose.Schema ({       // Type of data you want with names
    username: {
        type: String,
        unique: true                            // You can state it HAS to be unique 
    },
    password: {
        type: String
    }

})

// Model

const User = mongoose.model('User', userSchema) // Schema to model

// Export

module.exports = User                           // Exporting the model



