import { useState } from "react"
import MoreStats from "./MoreStats"
import Button from "./Button"
import ConvertTime from "../Functions/ConvertTime"

const Game = ({ game }) => {
    const [showAllStats, setShowAllStats] = useState(false)

    const time = ConvertTime(parseFloat(game.gameInfo.startTime))
    const compositeScore = Math.round(game.compositeScore*100)/100;

    return (

        <div className="game-container">
            <div className="teams-container">
                <div className="team-div home-team" style={{backgroundColor:`${game.gameInfo.homeColor}`}}>
                    <p className="teams-font">{game.gameInfo.homeTeam}</p>
                </div>
                <div className="between-teams" style={{background:`linear-gradient(90deg, ${game.gameInfo.homeColor}, ${game.gameInfo.awayColor})`}}><p className="between-teams-p"></p></div>
                <div className="team-div away-team" style={{backgroundColor:`${game.gameInfo.awayColor}`}}>
                    <p className="teams-font">{game.gameInfo.awayTeam}</p>
                </div>
            </div>
            <div className="time-composite-container">
                <div className="time-composite-items-container">
                    <p className="stats-font">Start Time:</p>
                    <p className="stats-font">{time}</p>
                </div><hr className="h-rule"></hr>
                <div className="time-composite-items-container">
                    <p className="stats-font">Composite Rating:</p>
                    <p className="stats-font">{compositeScore}</p>
                </div>
            </div>
            <div className="button-container">
                <Button
                    text={showAllStats ? 'Less Ratings' : 'More Ratings'}
                    cssClass={"more-stats-button"}
                    onClick={() => {setShowAllStats(!showAllStats)}}
                    color={showAllStats ? 'red' : 'black' }
                />
            </div>
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

/*
<div className="between-teams" style={{background:`linear-gradient(90deg, ${game.gameInfo.homeColor}, ${game.gameInfo.awayColor})`}}><p className="between-teams-p"></p></div>
*/