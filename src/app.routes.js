const express = require('express')
const router = express.Router()

const oauth = require('./middleware/oauth')

/**
 * Register routes.
 */
router.all('/', (req, res) => res.send('hi!'))
router.all('/ping', (req, res) => res.send('pong'))

/**
 * Users.
 */
const userCtrl = require('./controllers/user')
router.post('/user/register', userCtrl.register)
router.post('/user/login', userCtrl.login)

/**
 * Products.
 */
const product = require('./controllers/product')
router.post('/products', oauth.isAuthorized, product.submitProduct)
router.get('/products', oauth.maybeAuthorized, product.getListProducts)
router.get('/products/:id', oauth.maybeAuthorized, product.getProductDetail)
router.post('/products/:id/vote', oauth.isAuthorized, product.voteProduct)

/**
 * Exports.
 */
module.exports = router
