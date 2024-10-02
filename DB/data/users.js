const bcrypt = require('bcryptjs')




module.exports = [
    {
        username: 'admin1',
        password: bcrypt.hashSync('pass',10)
    },
    {
        username: 'admin2',
        password: bcrypt.hashSync('pass',10)
    },
    {
        username: 'admin3',
        password: bcrypt.hashSync('pass',10)
    },
    {
        username: 'admin4',
        password: bcrypt.hashSync('pass',10)
    }
]