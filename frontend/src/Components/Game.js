
const Game = ({ game }) => {

    return (
        <div>
            {game.date}
            {game.timeSlot}
            {game.compositeScore}
            {game.gameInfo.homeTeam}
            {game.gameInfo.awayTeam}
        </div>
    )

}

export default Game