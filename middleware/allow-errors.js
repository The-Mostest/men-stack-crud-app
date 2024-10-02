const allowErrors = (req,res,next) => {
    res.locals.errors = {}
    next()
}

module.exports = allowErrors