exports.sendSuccess = (req, res) => result => {
    return res.send({
        success: true,
        data: result
    })
}

exports.sendError = (req, res) => error => {
    const code = error.code || null
    const message = typeof error === 'string' ? error : error.message || ''

    const response = {
        success: false,
        message,
    }

    if (code) {
        response.code = code
    }

    return res.send(response)
}
