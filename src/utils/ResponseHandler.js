const handleResponse = (res, data, msg) => {
    res.status(200).json({
        status: true,
        data: data,
        message: msg
    })
}

module.exports = handleResponse