const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const { formatTime, formatMoment } = require('./utils/moment')

const http = require('http')
const socketio = require('socket.io')

const userRoute = require('./routes/user')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
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

const botName = '3rd rabbit Bot'
const users = []

// When client connects
io.on('connection', (socket) => {
    console.log('socket.io connected...');

    const id = socket.id

    // Emit user id
    socket.emit('id', (id))

    // Wellcome current user
    socket.emit('notifyMessage', formatTime(botName, 'Wellcome to ChatRoom'))

    // user count
    socket.on('users', ({ username }) => {
        const { name, momentTime } = formatMoment(username)

        users.push({ id, name, momentTime })
        console.log(users);
        // users.map(({ name, momentTime }) => console.log(name, momentTime))

        io.emit('users', (users))

        // Broadcast when user connects
        socket.broadcast.emit('notifyMessage', formatTime(botName, `${username} has joined the chat`))

        // Runs when client disconnects
        socket.on('disconnect', () => {

            console.log('disconnected');

            io.emit('notifyMessage',
                formatTime(botName, `${username} left the chat`)
            )
            // console.log(formatTime(botName, `${username} left the chat`));

            const allUsers = users.filter(user => user.id !== id)
            console.log(allUsers);
            io.emit('users', (allUsers))
        })
    })

    // Listen for chatMessage
    socket.on('chatMessage', ({ username, body, type, mimeType, fileName }) => {
        io.emit('chatMessage', (formatTime(username, { body, type, mimeType, fileName })))
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
