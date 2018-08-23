const User = require('../models/User')
const isEmail = require('validator/lib/isEmail')
const crypto = require('../helpers/crypto')
const getEnv = require('../helpers/getEnv')
const getGravatar = require('../helpers/getGravatar')
const JWT = require('jsonwebtoken')

exports.register = ({email, password}) => {
    if (!email || !isEmail(email)) {
        return Promise.reject(new Error('Email is invalid.'))
    }

    if (!password || password.length < 6) {
        return Promise.reject(new Error('Password must be at least 6 characters.'))
    }

    return crypto.hashPassword(password)
        .then(hash => {
            const user = new User({
                email,
                password: hash
            })

            return user.save()
                .then(() => true)
        })
}

exports.login = ({email, password}) => {
    if (!email || !isEmail(email)) {
        return Promise.reject(new Error('Email is invalid.'))
    }

    return User.findOne({email})
        .then(user => {
            if (!user) {
                throw new Error('User not found.')
            }

            const hashPassword = user.get('password')

            return crypto.comparePassword(password, hashPassword)
                .then(isCorrectPassword => {
                    if (!isCorrectPassword) {
                        throw new Error('Password is incorrect.')
                    }

                    const userId = user.get('_id')
                    const secretKey = getEnv('/jwt/key')
                    const expires = getEnv('/jwt/expires')

                    const accessToken = JWT.sign({id: userId}, secretKey, {
                        expiresIn: expires
                    })


                    const email = user.get('email')

                    return {
                        accessToken,
                        profile: {
                            id: userId,
                            email,
                            avatar: getGravatar(email)
                        }
                    }
                })
        })
}
