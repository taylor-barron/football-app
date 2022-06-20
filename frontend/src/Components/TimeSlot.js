
const TimeSlot = ({ games }) => {

    return (
        <div>
            {games[0].gameInfo.awayTeam}
            {games[0].date}
            {games[0].timeSlot}
            {games[0].gameInfo.scoreScore}
        </div>
    )

}

export default TimeSlot;