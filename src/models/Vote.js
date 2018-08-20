const {Schema} = require('mongoose')
const connection = require('../app.database')

const voteSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        index: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
        index: true
    },

    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = connection.model('Vote', voteSchema)