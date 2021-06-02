

export const chatMessage = ({ joinMessage, chatMessage, disconnectMessage, id = null }) => (dispatch) => {

    dispatch({
        type: 'chatMessage',
        payload: {
            joinMessage, 
            chatMessage, 
            disconnectMessage, 
            id
        }
    })
}