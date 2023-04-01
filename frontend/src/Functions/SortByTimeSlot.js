
const SortByTimeSlot = (games) => {

    let diffTimeslots = [];
    let allTimeSlots = [];

    // for (let i = 1; i < games.length; i++) {

    //     if ( games[i].timeSlot === games[i-1].timeSlot ) {
    //         timeSlot.push(games[i]);
    //     } else {
    //         allTimeSlots.push(timeSlot)
    //         timeSlot = []
    //         timeSlot.push(games[i])
    //     }
    // }
    // allTimeSlots.push(timeSlot)

    games.forEach(obj => {
        
        let timeSlot = obj.timeSlot;

        if (!diffTimeslots.includes(timeSlot)) {
            diffTimeslots.push(timeSlot);
        }
        
    });

    for (let i = 0; i < diffTimeslots.length; i++) {

        let tempArray = [];
        
        let arrayTimeslot = diffTimeslots[i];

        games.filter(obj => obj.timeSlot === arrayTimeslot).forEach(obj => tempArray.push(obj));

        allTimeSlots.push(tempArray);

    }

    return allTimeSlots;

}

export default SortByTimeSlot;