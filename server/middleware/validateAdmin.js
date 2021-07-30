module.exports = {
    onlyAdmin: function(req, res, error, next) {
        const { decodedJwt } = req;
        if (decodedJwt.role === 'admin') {
            next();
        } else {
            next({ status: 403, message: error.message})
        };
    }
};