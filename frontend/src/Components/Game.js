import { useState } from "react"
import MoreStats from "./MoreStats"
import Button from "./Button"
import ConvertTime from "../Functions/ConvertTime"

const Game = ({ game }) => {
    const [showAllStats, setShowAllStats] = useState(false)

    const time = ConvertTime(parseFloat(game.gameInfo.startTime))
    const compositeScore = parseFloat(game.compositeScore).toFixed(3)

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
                <div>
                    <p>Start Time:</p>
                    <p>{time}</p>
                </div>
            </div>
            <div>
                <div>
                    <p>Composite Rating:</p>
                    <p>{compositeScore}</p>
                </div>
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