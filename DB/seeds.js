// ! Imports
const mongoose = require('mongoose')
require('dotenv/config')
 
// ! Models
const Fruit = require('../model/fruit.js')
const User = require('../model/user.js')


// ! Models
const fruitData = require('./data/fruits.js')
const userData = require('./data/users.js')




console.log(fruitData)
//  !   Run seed

const runseed = async () => {


//  Connect to DB
await mongoose.connect(process.env.MONGODB_URI)
console.log('Connected')


//  Clear Existing Data
const deletedFruits = await Fruit.deleteMany()
    console.log(`${deletedFruits.deletedCount} Fruit Deleted`)

// Clear Existing Users
const deletedUser = await User.deleteMany()
    console.log(`${deletedUser.deletedCount} Users Deleted`)


// Add new Users
const newUsers = await User.create(userData)
console.log(`${newUsers.length} Users Added`)


//  Add new data
const fruit = await Fruit.create(fruitData)
console.log(`${fruit.length} Fruit Deleted`)


//  close connection
await mongoose.connection.close()
console.log('Disconnected')

}
runseed ()