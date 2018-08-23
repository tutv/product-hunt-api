const Product = require('../models/Product')
const Vote = require('../models/Vote')

exports.submitProduct = (args) => {
    const {
        title,
        description,
        thumbnail,
        preview,
        category,
        website,
        owner
    } = args

    const product = new Product({
        owner,
        title,
        description,
        thumbnail,
        preview,
        category,
        website
    })

    return product.save()
        .then(p => p.get('_id'))
}

exports.voteProduct = ({userId, productId}) => {
    return Vote.findOne({owner: userId, product: productId})
        .then(vote => {
            if (vote) {
                throw new Error('You voted this product.')
            }

            const newVote = new Vote({
                owner: userId,
                product: productId,
            })

            return newVote.save()
        })
        .then(() => {
            return Product.updateOne({_id: productId}, {
                $inc: {
                    votes: 1
                }
            })
        })
        .then(() => true)
}
