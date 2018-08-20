const {Schema} = require('mongoose')
const connection = require('../app.database')

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        index: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
        trim: true
    },

    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = connection.model('User', userSchema)