
const { AUTHENTICATION = '' } = process.env

module.exports = {
    security: (req, res, next) => {
        res.setHeader('authentication', AUTHENTICATION)
        
        if(req.url.indexOf('/doc') === -1)
        if(!req.headers['authentication'] || req.headers['authentication'] !== AUTHENTICATION) {
            return res.status(401).json({
                status: 401,
                message: 'Not authorized!'
            })
        }
        next()
    }
}