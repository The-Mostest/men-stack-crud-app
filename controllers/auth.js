// Required
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();


// Model
const User = require('../model/user.js')


// Routers
router.get('/sign-up', (req, res) => {
    try{
    return res.render('auth/sign-up.ejs')
}catch(error){
    console.log(error)
    res.status(error).send('This page isnt working')
}
})






// ! -- Create User



router.post('/sign-up', async (req, res) => {
    try {

        if (req.body.password !== req.body.confirmPassword) {
            return res.send ("Passwords Doesn't Match Silly!")
        }

        req.body.password = bcrypt.hashSync(req.body.password, 10)


        const newUser = await User.create(req.body)

        res.redirect('/auth/sign-in')
    } catch (error) {
        console.log(error)
        res.send("This form isn't working")
    }
})



// Attempt create USer


//Redirect To Sign-in Page



module.exports = router