const {Schema} = require('mongoose')
const connection = require('../app.database')

const productSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        require: true
    },

    title: {
        type: String,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    thumbnail: {
        type: String
    },

    preview: {
        type: String
    },

    category: {
        type: String
    },

    votes: {
        type: Number,
        default: 0
    },

    website: {
        type: String,
        trim: true,
    },

    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = connection.model('Product', productSchema)