const passUserToView = (req,res,next) => {                              // Variable with 3 params 
    res.locals.user = req.session.user ? req.session.user : null        // Kinda an if statement. If req.session.user exists than it equals res.locals.user. If it doesn't locals = null
    next()                                                              // Onto the next middleware
}

module.exports = passUserToView                                         // Export






