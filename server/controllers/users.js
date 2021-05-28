const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/user')


// # Register user
const register = async (req, res) => {

    // Destructuring request data
    const { name, email, password } = req.body

    try {

        // Simple validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please enter your information.'
            })
        }

        // Finding existing user by email
        const isUser = await User.findOne({ email })

        // If isUser, found user
        if (isUser)
            return res.status(400).json({ message: 'User already exists.' })

        // else: user not found
        // Hash password, (auto-gen a salt and hash)
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        // Create token
        const token = await jwt.sign(
            { id: newUser.id },
            config.get('jwtSecretCode'),
            { expiresIn: '1h' }
        )

        // Response
        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }

}

// # Sign in user
const signin = async (req, res) => {

    const { email, password } = req.body

    try {

        // Simple validation
        if (!email || !password)
            return res.status(400).json({ message: 'Please enter your email & password' })

        // Finding existing user by email
        // If found -> user, else -> null
        const isUser = await User.findOne({ email })

        // If isUser not found
        if (!isUser)
            return res.status(404).json({ message: 'User does not exists.' })

        // Compare password
        const isPassword = await bcrypt.compare(password, isUser.password)

        // If password is not match
        if (!isPassword)
            return res.status(400).json({ message: 'Email or Password invalid.' })

        // else, password is right
        // Create token
        const token = await jwt.sign(
            { id: isUser.id },
            config.get('jwtSecretCode'),
            { expiresIn: '1h' }
        )

        // Response
        res.status(200).json({
            token,
            user: {
                id: isUser.id,
                name: isUser.name,
                email: isUser.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

// # Get user
const getUser = async (req, res) => {

    await User.findById(req.user.id)
        .select('-password')
        .then((user) => res.json(user))
}

module.exports = {
    register,
    signin,
    getUser
}