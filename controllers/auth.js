// Required 
const express = require('express')                                     // Required content
const bcrypt = require('bcryptjs')
const router = express.Router();


// Model
const User = require('../model/user.js')                              // Imported User


// Routers
router.get('/sign-up', (req, res) => {                                 // Rendering the page that we're going to put the sign up on
    try{
    return res.render('auth/sign-up.ejs')                              // Here
}catch(error){
    console.log(error)
    res.status(error).send('This page isnt working')
}
})






// ! -- Create User



router.post('/sign-up', async (req, res) => {                                       //POST to allow a 'push' of data
    try {
        const userInDatabse = await User.findOne({username: req.body.username})     // Checking the username isn't taken from the data stored in the MODEL
        if(userInDatabse){
            return res.send('<h2>Username Has Been Taken</h2>')                     
        }

        if (req.body.password !== req.body.confirmPassword) {                       // Checking the passwords do match by stating 'if they don't
            return res.send ("<h1>Passwords Doesn't Match Silly!</h1>")
        }

        req.body.password = bcrypt.hashSync(req.body.password, 10)                  // Encrypting password with bcrypt and giving a 'delay' to the fabrication process


        const newUser = await User.create(req.body)                                 // Creating the actual user itself WITHIN the model

        res.redirect('/auth/sign-in')
    } catch (error) {
        console.log(error)
        res.send("This form isn't working")
    }
})




// ! -- Sign In

// Sign in Route
router.get('/sign-in', (req,res) => {                                               //Fabricating the actual page into existence
    res.render('auth/sign-in.ejs')

})

router.post('/sign-in', async (req,res) => {                                        // POST to use the form 
    try {
    const userInDatabase = await User.findOne({username: req.body.username})        // Creating a variable and using the model to find and compare the username of given
    if(!userInDatabase){
        return res.send('<h1>Login Failed. Please Try Again</h1>')                  // Give an invalid response THE SAME AS THE PASSWORD
    }
  
    
    const validPassword = bcrypt.compareSync(                                       // bcrypt has inbuilt password comparision systems. 
        req.body.password,                                                          // First param is the password in the form
        userInDatabase.password                                                     // Second is the password within the database itself
    )
    if(!validPassword){                                                             // Responses if the results are wrong
        return res.send('<h1>Login Failed. Please Try Again</h1>')
    }


    req.session.user = {                                                            // Making a session on successful login &&&& a variable called 'user'
        username: userInDatabase.username,                                          // This is saving their Username and their ID
        _id: userInDatabase._id
    }





    res.redirect('/')                                                               // Redirect to another page post login
} catch(error) {
        console.log(error)
        res.send('Page isnt working')
    }
    })



// Sign in User

// Check Username Exists

//Invalidate Unauthorised attempt with 401

//Passwords don't match = 401 (same as above)







module.exports = router