
const SortByDate = (games) => {

    let allDates = []
    let dates = [games[0]]

    for (let i = 1; i < games.length; i++) {

        if (games[i].date === games[i-1].date) {
            dates.push(games[i])
        } else {
            allDates.push(dates)
            dates = []
            dates.push(games[i])
        }
    }
    allDates.push(dates)
    console.log(allDates)

    return allDates;
}

export default SortByDate;