const mongoose = require('mongoose')                   // Linking Mongoose to this page

const fruitSchema = new mongoose.Schema({             // creating the Schema and giving it a almost ruleset to follow
    name: String,
    isReadyToEat: Boolean,
    user: {type: mongoose.Types.ObjectId, ref: 'user', required: true}
})

const Fruit = mongoose.model("Fruit", fruitSchema)    // Linking the fruitSchema to the mongoose.model. With a string-singular and the Schema we made

module.exports = Fruit                                // Exporting the fruit to be used in other pages




