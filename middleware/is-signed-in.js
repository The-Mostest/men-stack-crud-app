const isSignedIn = (req,res,next) => {          // Creating the 3 params that request, response, next(move onto the next middleware)
    if (req.session.user) return next();        // Is the session has a user on it then go onto the next middleware
        res.redirect('/auth/sign-in')           // Otherwise redirect
    
}
module.exports = isSignedIn                     // Export from this file to another





