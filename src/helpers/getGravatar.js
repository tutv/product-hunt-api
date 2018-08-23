const crypto = require('./crypto')

module.exports = (email) => {
    const hash = crypto.md5(email)

    return `https://www.gravatar.com/avatar/${hash}`
}