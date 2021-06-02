

const initialState = {
    chatMessage: [],
    joinMessage: null,
    disConnectMessage: null,
    id: null
}

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case 'joinMessage':
           return state

        case 'chatMessage':
           return state

        case 'disConnectMessage':
           return state

        default:
            return state
    }
}