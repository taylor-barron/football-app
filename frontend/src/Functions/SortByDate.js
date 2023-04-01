
const SortByDate = (games) => {

    // let allDates = []
    // let dates = [games[0]]

    // for (let i = 1; i < games.length; i++) {

    //     if (games[i].date === games[i-1].date) {
    //         dates.push(games[i])
    //     } else {
    //         allDates.push(dates)
    //         dates = []
    //         dates.push(games[i])
    //     }
    // }
    // allDates.push(dates)

    let diffDates = [];
    let allDates = [];

    games.forEach(obj => {
        
        let date = obj.date;

        if (!diffDates.includes(date)) {
            diffDates.push(date);
        }
        
    });

    let sortedDates = diffDates.sort((a, b) => {

        let [aMonth, aDay] = a.split("-").map(Number);
        let [bMonth, bDay] = b.split("-").map(Number);

        let aComparable = aMonth * 100 + aDay;
        let bComparable = bMonth * 100 + bDay;

        return aComparable - bComparable;

    });

    for (let i = 0; i < sortedDates.length; i++) {

        let tempArray = [];
        
        let arrayDate = sortedDates[i];

        games.filter(obj => obj.date === arrayDate).forEach(obj => tempArray.push(obj));

        allDates.push(tempArray);

    }

    console.log("finished sort by date: ", allDates);

    return allDates;
}

export default SortByDate;