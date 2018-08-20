const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const compression = require('compression')
const cors = require('cors')
const getEnv = require('./helpers/getEnv')


/**
 * Express configuration.
 */
app.set('trust proxy', 1)
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


/**
 * Config routes.
 */
app.use(require('./app.routes'))

/**
 * HTTP Server
 */
const port = getEnv('/port')
app.listen(port, () => {
    console.log(`App is listening on port ${port}...`)
})
