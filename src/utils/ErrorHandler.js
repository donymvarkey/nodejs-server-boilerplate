const handleError = (res, err, code) => {
    res.status(code).json({
        status: false,
        error: err
    })
}

module.exports = handleError