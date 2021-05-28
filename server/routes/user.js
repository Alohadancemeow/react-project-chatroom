const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const { register, signin, getUser } = require('../controllers/users')

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post('/register', register)

// @route   POST api/users/signin
// @desc    Sigin user
// @access  Public
router.post('/signin', signin)

// @route   GET api/users/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, getUser)


module.exports = router