const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')

const http = require('http')
const socketio = require('socket.io')

const userRoute = require('./routes/user')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})



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


// # Socket.io
// When client connects
io.on('connection', (socket) => {
    console.log('socket.io connected...');

    // Wellcome current user
    socket.emit('message', 'Wellcome to ChatRoom')

    // Broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat')

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user left the chat')
    })

    // Listen for chatMessage
    socket.on('chatMessage', ({ username, message }) => {
        io.emit('chatMessage', { username, message })
    })
})


// # Set port 
const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server started on port ${port}`))


// # MongoDB Setup.
const MONGO_URL = config.get('MONGO_URL')
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))
