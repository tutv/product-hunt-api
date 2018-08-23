const ProductActions = require('../actions/ProductActions')
const {sendSuccess, sendError} = require('../helpers/response')

exports.getListProducts = (req, res) => {
    const defaultArgs = {
        page: 1,
        limit: 10
    }

    const {page, limit} = Object.assign({}, defaultArgs, req.query)

    ProductActions.getListProducts({page, limit})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.submitProduct = (req, res) => {
    const userId = req.userId

    const defaultArgs = {
        title: '',
        description: '',
        thumbnail: '',
        preview: '',
        category: '',
        website: '',
        owner: userId
    }

    const args = Object.assign({}, defaultArgs, req.body)

    ProductActions.submitProduct(args)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getProductDetail = (req, res) => {

}

exports.voteProduct = (req, res) => {
    const userId = req.userId
    const productId = req.params['id']

    ProductActions.voteProduct({userId, productId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.unVoteProduct = (req, res) => {

}
