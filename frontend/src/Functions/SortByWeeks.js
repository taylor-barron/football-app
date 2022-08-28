
// const SortByTimeSlot = (games) => {

//     let allTimeSlots = []
//     let timeSlot = [games[0]]

//     for (let i = 1; i < games.length; i++) {

//         if ( games[i].timeSlot === games[i-1].timeSlot ) {
//             timeSlot.push(games[i]);
//         } else {
//             allTimeSlots.push(timeSlot)
//             timeSlot = []
//             timeSlot.push(games[i])
//         }
//     }
//     allTimeSlots.push(timeSlot)

//     return allTimeSlots
// }

// export default SortByTimeSlot

const SortByWeeks = (weeks) => {

    let toOrderWeeks = []
    console.log(weeks)

    for (let i = 1; i < weeks.length; i++) {
        const weekNumber = weeks[i].name.substring(4)

        console.log(weekNumber)
    }

    return (weeks)
}

export default SortByWeeks