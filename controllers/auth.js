// Required
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();




// Routers


router.get('/sign-up', (req,res) => {
    try {
    res.render('auth/sign-up.ejs')
    } catch (error){
        console.log(error)
        res.send("This Sign Up Page isn't working")
    }
})


router.post('/sign-up', async ( req,res) => {
    res.send('Form Submission Accepted!')
    if( req.body.password !== req.body.confirmPassword){
        return("Passwords Don't")
    }
})

// Model
const User = require('../model/user')





// ! -- Create User

// Passwords Match


// Hash Passwords


// Attempt create USer


//Redirect To Sign-in Page



module.exports = router