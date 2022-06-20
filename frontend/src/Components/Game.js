import { useState } from "react"
import MoreStats from "./MoreStats"
import Button from "./Button"

const Game = ({ game }) => {
    const [showAllStats, setShowAllStats] = useState(false)

    return (

        <div>
            <div>
                <div style={{backgroundColor:`${game.gameInfo.homeColor}`}}>
                    <p style={{color:'white'}}>{game.gameInfo.homeTeam}</p>
                </div>
                <div style={{backgroundColor:`${game.gameInfo.awayColor}`}}>
                    <p style={{color:'white'}}>{game.gameInfo.awayTeam}</p>
                </div>
            </div>
            <div>
                {game.gameInfo.startTime}
            </div>
            <div>
                {game.compositeScore}
            </div>
            <Button
                text={showAllStats ? 'Less Ratings' : 'More Ratings'}
                onClick={() => {setShowAllStats(!showAllStats)}}
            />
            {showAllStats && <MoreStats
                scoreRating={game.gameInfo.scoreScore}
                explosivenessScore={game.gameInfo.explosivenessScore}
                importanceScore={game.gameInfo.importanceScore}
                talentScore={game.gameInfo.talentScore}
                penaltyScore={game.gameInfo.penaltyScore}
            />}
            <br></br>
        </div>
    )

}

export default Game