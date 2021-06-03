const moment = require('moment')

const formatTime = (username, message) => {
    return {
        username,
        message,
        time: moment().format('h:mm a')
    }
}

const formatMoment = (username) => {
    return {
        name: username,
        momentTime: moment().startOf('hour').fromNow()
    }
}

module.exports = {
    formatTime,
    formatMoment
}
