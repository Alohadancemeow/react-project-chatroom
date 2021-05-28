const jwt = require('jsonwebtoken')
const config = require('config')

const auth = async (req, res, next) => {

    // Get token from header
    const token = req.header('x-auth-token')

    // Check for token
    if (!token)
        return res.status(401).json({ message: 'No token, authorization denied.' })

    try {

        // Verify token
        const decodedToken = await jwt.verify(token, config.get('jwtSecretCode'))

        // Add user from payload
        req.user = decodedToken

        // Continue...
        next()

    } catch (error) {
        res.status(400).json({ message: 'Token invalid.' })
    }
}


module.exports = auth