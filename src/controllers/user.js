const UserActions = require('../actions/UserActions')
const {sendSuccess, sendError} = require('../helpers/response')

exports.register = (req, res) => {
    const defaultArgs = {
        email: '',
        password: ''
    }

    const {email, password} = Object.assign({}, defaultArgs, req.body)

    UserActions.register({email, password})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.login = (req, res) => {
    const defaultArgs = {
        email: '',
        password: ''
    }

    const {email, password} = Object.assign({}, defaultArgs, req.body)

    UserActions.login({email, password})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
