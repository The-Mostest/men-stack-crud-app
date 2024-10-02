const mongoose = require('mongoose')                   // Linking Mongoose to this page
const { push } = require('../DB/data/fruits')



// SubDoc
const commentSchema = new mongoose.Schema({                                 // New Sub-Schema 
    text: { type: String, required: true },                                 // Text box for comments
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true }    // Linking the Comment to a User
}, {
    timestamps: true                                                        // Auto give timestamps for creation and update
})




const fruitSchema = new mongoose.Schema({             // creating the Schema and giving it a almost ruleset to follow
    name: String,
    isReadyToEat: Boolean,
    user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    comments: [commentSchema]
})    

const Fruit = mongoose.model("Fruit", fruitSchema)    // Linking the fruitSchema to the mongoose.model. With a string-singular and the Schema we made

module.exports = Fruit                                // Exporting the fruit to be used in other pages



