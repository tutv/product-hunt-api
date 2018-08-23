const User = require('../models/User')
const Product = require('../models/Product')
const Vote = require('../models/Vote')
const getGravatar = require('../helpers/getGravatar')

exports.getListProducts = ({page, limit}) => {
    const pageValidated = parseInt(page, 10)
    const limitValidated = parseInt(limit, 10)

    const from = (pageValidated - 1) * limitValidated;
    const query = {}

    const finding = Product.find(query)
        .populate('owner', User)
        .sort({votes: 'desc'})
        .skip(from)
        .limit(limitValidated)
        .lean()

    const counting = Product.count(query)

    return Promise.all([
        finding,
        counting
    ]).then(([docs, total]) => {
        const pages = Math.ceil(total / limitValidated) || 1

        const products = docs.map(product => {
            const {owner} = product

            return Object.assign({}, product, {
                owner: {
                    id: owner._id,
                    email: owner.email,
                    avatar: getGravatar(owner.email)
                }
            })
        })

        return {
            docs: products,
            total,
            pages,
            page: pageValidated,
            limit: limitValidated
        }
    })
}

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
