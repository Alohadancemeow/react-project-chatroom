const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const userRoute = require('./routes/user')

const app = express()

// Express v4.16.0 and higher
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// # Use routes
// @route GET http://localhost:5000/api
app.get('/api', (req, res) => res.send('Wellcome to api'))

// @route POST http://localhost:5000/api/users
app.use('/api/users', userRoute)




// # Set port 
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))


// # MongoDB Setup.
const MONGO_URL = config.get('MONGO_URL')
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))
