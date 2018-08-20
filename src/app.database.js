const createConnection = require('./libs/createConnection')
const getEnv = require("./helpers/getEnv")
const uri = getEnv('/mongodb')

console.log(uri)

const app = createConnection(uri, {
    //poolSize: 10
})

module.exports = app
