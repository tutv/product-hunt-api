const Confidence = require('confidence')

const data = {
    jwt: {
        $filter: "env",
        $default: {
            key: '__your_secret_code',
            expires: '7 days'
        },
        staging: {
            key: process.env.PH_SECRET_KEY || '__your_secret_code',
            expires: '7 days'
        },
        production: {
            key: process.env.PH_SECRET_KEY || '__your_secret_code',
            expires: '7 days'
        }
    },

    port: {
        $filter: 'env',
        $default: process.env.HOST || 1234,
        production: process.env.HOST || 1234
    },

    mongodb: {
        $filter: "env",
        $default: process.env.MONGODB_URI || 'mongodb://localhost:27017/producthunt',
        production: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/producthunt',
    },

}

const store = new Confidence.Store(data)
const criteria = {
    env: process.env.NODE_ENV || 'development'
}

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue
}
