const JWT = require('jsonwebtoken')
const getEnv = require('../helpers/getEnv')

const _isAuth = token => {
    if (token) {
        const secretKey = getEnv('/jwt/key')

        return new Promise((resolve, reject) => {
            JWT.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return reject(new Error('Failed to authenticate token.'))
                } else {
                    return resolve(decoded)
                }
            })
        })
    } else {
        return Promise.reject(new Error('No token provided.'))
    }
}

exports.isAuthorized = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'] || '';

    _isAuth(token)
        .then(decoded => {
            const {id} = decoded
            req.userId = id

            return next()
        })
        .catch(error => {
            return res.status(403).send({
                success: false,
                message: error.message || ''
            })
        })
}

exports.maybeAuthorized = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'] || ''

    _isAuth(token)
        .then(result => {
            const {id} = result
            req.userId = id

            return next();
        })
        .catch(error => {
            next()
        })
}
