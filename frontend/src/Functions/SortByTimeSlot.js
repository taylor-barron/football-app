
const SortByTimeSlot = (games) => {

    let diffTimeslots = [];
    let allTimeSlots = [];

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