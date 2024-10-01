const dotenv = require('dotenv')                                    // Require package
dotenv.config()                                                     // Loads enviro variables from .ENV




const morgan = require('morgan')
const methodOverride = require('method-override')                   // Sets up methodOverride for the server
const express = require('express');                                 // Setting Up Express within your code
const mongoose = require('mongoose')                                // Setting Up Mongoose  within your code
const session = require('express-session')
const MongoStore = require('connect-mongo')                         // Adding MongoStore to the app
const isSignedIn = require('./middleware/is-signed-in.js')          // Import from the other file
const passUserToView = require('./middleware/pass-user-to-view.js') // Import from the other file

mongoose.connect(process.env.MONGODB_URI)                           // Using mongoose to connect the DB via the .env keyword(MONGODB_URI)


//! <-- Variables

const port = 3000                                                   // Making the port number dynamic with the variable
const app = express();                                              // Creating a variable linking to the express function


// ! -- Router/Controllers
const fruitsRouters =  require('./controllers/fruitsRouters.js')
const authRouters = require('./controllers/auth.js')

// ! <-- Listen for Port

app.listen(port, () => {                                            // Linking the code to the port and using a function to check via log
    console.log("This server is working")
})


// ! <-- Models

const Fruit = require("./model/fruit.js")                           // Linking the fruit model we made in another page to the server


// ! <-- Middleware
app.use(methodOverride("_method"))                                  // "_Method" is the query parameter used as a HTTP method converter eg ((   ?_method=CONVERSIONMETHOD   ))
app.use(express.urlencoded({ extended: false }))                    // Telling us that we want to access the forms inside the request variable INSIDE the post Method
app.use(express.static("public"))                                   // How to link CSS to your CRUD app. Public is the folder that you keep stylesheets in
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET,     // The link to the env file
    resave: false,                          // Stops saves to unmodified files
    saveUninitialized: true,                // Create session that doesn't exist in our store
    store: MongoStore.create({              // This creates a store within the database MONGODB to save your session across browser entry/exit
        mongoUrl: process.env.MONGODB_URI,  // Linking the URL to MONGODB_URI
    })
}))
app.use(passUserToView)                     // BE SPECIFIC WHEN you place this. It needs to be used in all the routes BUT it needs to use session data
                                            // If placed correctly it means no other thing needs to use req.session.user as it all should have a res.local

// ! < --   Routes
// !  Landing Page
app.get('/', async (req, res) => {
    try {
        
        res.render('index.ejs', {           
           
        })
        
    } catch (error) {
        res.send('This GET isnt working')
    }       
})


//! Controller Routers
app.use('/fruits', fruitsRouters)
app.use('/auth', authRouters )



app.get('/vip-lounge', isSignedIn, (req,res) => {                                           // This is now linked to the middleware we created in the other file
                                                                                            // If the session user is logged in (true)
        return res.send(`<h1>Welcome to the part-ay ${req.session.user.username}</h1>`)     // Send Message
    
})

app.get('views/secret/secret-space.ejs', isSignedIn, (req,res) => {
    // res.render('/')
    res.send('hello')
})


//! 404
app.get('*', (req, res) => {
    res.send('<h1>This page is in another castle</h1>')
})

mongoose.connection.on("connected", () => {                         // Checking the connection via a console.log
    console.log(`Connected to MongoDB`)
})