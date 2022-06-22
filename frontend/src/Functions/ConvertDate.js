
const ConvertDate = (unformattedDate) => {
    
    let dateArray = unformattedDate.split("-")
    const monthNumber = dateArray[0]
    const day = dateArray[1]

    if ( monthNumber === "08" ) {
        var month = "August"
    } else if ( monthNumber === "09" ) {
        var month = "September"
    } else if ( monthNumber === "10" ) {
        var month = "October"
    } else if ( monthNumber === "11" ) {
        var month = "November"
    } else if ( monthNumber === "12" ) {
        var month = "December"
    } else if ( monthNumber === "01" ) {
        var month = "January"
    }

    const formattedDate = month + " " + day

    return formattedDate
}

export default ConvertDate