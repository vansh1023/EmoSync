const jwt = require('jsonwebtoken')
const redis = require('../config/cache.js')


async function authUser(req, res, next) {
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlacklisted = await redis.get(token)

    if(isTokenBlacklisted){
        res.status(401).json({
            messaage: "Invalid token"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}


module.exports = { authUser }