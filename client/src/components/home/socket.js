import { io } from "socket.io-client";


// # Socket.io
const socket = io()

// # Receive message from server
socket.on('message', (message) => {
    console.log(`${message} from server`);
    outputMessage(message)
})

export const outputMessage = async (txt) => {
    await console.log(txt);
    return txt
}


// # Emit message to server
export const emitMessage = (message) => {

    socket.emit('chatMessage', message)
}

