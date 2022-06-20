
const ConvertTime = (unformattedTime) => {

    if (unformattedTime > 12) {
        unformattedTime = unformattedTime - 12
    }
    if ((unformattedTime - Math.floor(unformattedTime)) !== 0) {
        let timeArray = String(unformattedTime).split(".")
        let minutes = parseInt(timeArray[1]) * 6
        var time = timeArray[0] + ":" + String(minutes) + " ET"
    } else {
        var time = String(unformattedTime) + ":00 ET"
    }

    return time
}

export default ConvertTime