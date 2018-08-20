const express = require('express')
const router = express.Router()

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
router.post('/products', product.submitProduct)
router.get('/products/:id', product.getProductDetail)
router.get('/products/:id', product.getProductDetail)

/**
 * Exports.
 */
module.exports = router
