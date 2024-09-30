// ! Imports
const mongoose = require('mongoose')
require('dotenv/config')
 
// ! Models
const Fruit = require('../models/fruit.js')


// ! Data
const fruitData = require('./data/fruits')



console.log(fruitData)
//  !   Run seed

// const runseed = async () => {
// //  Connect to DB
// await mongoose.connect(process.env.MONGODB_URI)
// console.log('Connected')
// //  Clear Existing Data
// const deletedFruits = await Fruit.deleteMany()
//     console.log(`${deletedFruits.deletedCount} Fruit Deleted`)
// //  Add new data
// const fruit = await Fruit.create(fruitData)
// console.log(`${fruit.length} Fruit Deleted`)

// //  close connection
// await mongoose.connection.close()
// console.log('Disconnected')

// }
// runseed ()