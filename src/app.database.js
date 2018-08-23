const createConnection = require('./libs/createConnection')
const getEnv = require("./helpers/getEnv")
const uri = getEnv('/mongodb')

const app = createConnection(uri)

module.exports = app
