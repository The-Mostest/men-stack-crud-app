const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Fruit = require("../model/fruit.js")
const isSignedIn = require('../middleware/is-signed-in.js')


// ! Index of all Fruit
router.get('', async (req, res) => {                            // New route for page making is async
    try {
        const allFruits = await Fruit.find()                        // Create a variable for the model.find() Which gets all of the given
        res.render("fruits/index.ejs", { fruits: allFruits })         // Render has 2 values, teh page you want to render and the Object you want on that page
    } catch (error) {
        res.send("This page isn't working")
    }
})




// ! Show
router.get("/:fruitId", async (req, res, next) => {                     // Make sure that you add the ':' after the / - this templates the object
    try {

        if (mongoose.Types.ObjectId.isValid(req.params.fruitId)) {          // 404 Error Handling
            const foundFruit = await Fruit.findById(req.params.fruitId).populate('user').populate('comments.user')
            console.log(foundFruit)  // Using teh model (layout of data) to findById of the URL id
            res.render("fruits/show.ejs", { fruit: foundFruit })            // Render it on the show page. {NameYourReferencingInYourTemplate: TheVariableYou'veCollected}
        } else {
            next()                                                          // 404 Error Handling
        }


    } catch (error) {
        console.log(error)
       return res.status(500).send('An Error Occurred')
    }

})

// ! Fruit Creation

// * Render Page

router.get('/new', (req, res) => {
    try {
    res.render('fruits/new.ejs')
    // console.log('Fruits new is working')
    }catch(error){
        console.log(error)
        res.status(error).send('This link is broken')
    }
})



// * Actually Create the Fruit

router.post('/', async (req, res) => {                           // Making a route with post to create
    try {
        req.body.user = req.session.user._id
        if (req.body.isReadyToEat === "on") {                       // Checkboxes provide a string of on or undefined
            req.body.isReadyToEat = true                            // The conversion
        } else {
            req.body.isReadyToEat = false                           // The opposite conversion
        }
        await Fruit.create(req.body)                                // Await to do it after the rest of the block. Fruit.create(req.body) using the Fruit model to create what is put in the req.body
        res.redirect('/fruits')
    }                                // After that has run, it redirects back to the form to allow you to input again
    catch (error) {
        res.status(500).render('fruits/new.ejs')
    }
})


// * Delete

router.delete('/:fruitId', async (req, res) => {                 // You'll use :fruitId again as you're trying to find it via the ID

    const deletedFruit = await Fruit.findId(req.params.fruitId)                // Await means this bit of code will run BEFORE the lower bits - Fruit being the layout of the data

    if (deletedFruit.user.equals(req.session.user._id)) {
        await Fruit.findByIdAndDelete(req.params.fruitId)
        return res.redirect('/fruits')                                         // Redirect back to the page with all the bits in it
    } else {
        return res.send('Go Away')
    }



})


// ! Edit Page Route

// * Render Page 
router.get('/:fruitId/edit', async (req, res, next) => {               // Only route to use 3 URLs. Async to make sure render comes last

    const foundFruit = await Fruit.findById(req.params.fruitId)     // Model to find the ID

    if (foundFruit.user.equals(req.session.user._id)) {
        await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
        console.log('Working')

        res.render('fruits/edit.ejs', { fruit: foundFruit })             // Render with the page URL and Object to refer to and object
    } else {
        return res.send('Go Away')
    }


})


// * Update/Edit Fruit
router.put('/:fruitId', async (req, res) => {                           // Async as you want to do stuff before render
    if (req.body.isReadyToEat === 'on') {                               // Changing check boxes from  string value to Boolean
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }

    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)         // Find and Update the specific URL ID with the form req. bod 
    res.redirect(`/fruits/${req.params.fruitId}`)                       // Redirect to the given req.params.ID
})



// ! Comments Route

// * Create Comments

router.post('/:fruitId/comments', isSignedIn, async (req, res) => {
    try {
        req.body.user = req.session.user._id

       const fruit = await Fruit.findById(req.params.fruitId)
        if (!fruit) return next()

        fruit.comments.push(req.body)

        await fruit.save()

        return res.redirect(`/fruits/${req.params.fruitId}`)


    } catch (error) {
        res.send('This comment is not working')
    }
})




// * Delete Comments
router.delete('/:fruitId/comments/:commentsId/', async (req, res, next) => {
    try {

        const fruit = await Fruit.findById(req.params.fruitId)                  // Find the comment to delete and link to variable
        if (!fruit)  next()

        const commentToDelete = fruit.comments.id(req.params.commentsId)        // Variable commentToDelete = fruit we founds comment ID = the comment ID on the resource
        if (!commentToDelete)  next()

        if(!commentToDelete.user.equals(req.session.user._id)) {
            throw new Error('current user is not allowed to delete this comment')
        }

        commentToDelete.deleteOne()                                             // Delete the single comment we found
        await fruit.save()                                                      // save the comment delete

        return res.redirect(`/fruits/${req.params.fruitId}`)                    // Return back to the fruit id we we're just on


    } catch (error) {
        console.log(error)
        return res.send('Delete is broken')
    }
})







module.exports = router


