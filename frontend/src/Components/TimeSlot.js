import { useEffect, useState } from "react";
import SortByGameRating from "../Functions/SortByGameRating";
import Game from "./Game";
import Button from "./Button";

const TimeSlot = ({ gamesArray }) => {
    const [ games, setGames ] = useState([])
    const [ showGames, setShowGames ] = useState(true)

    useEffect(() => {

        setGames(SortByGameRating( gamesArray ))

    }, [])

    return (
        <div className="timeSlot-container">
            <div className="timeSlot-header-container">
                <h2 className="timeSlot-text">{gamesArray[0].timeSlot} Games</h2>
                <Button
                    text={showGames ? 'Hide Games' : 'Show Games'}
                    cssClass={"more-stats-button"}
                    onClick={() => {setShowGames(!showGames)}}
                    color={showGames ? 'black' : 'red' }
                />
            </div>
            {showGames && games.map((game, index) => (
                <Game key={index} game={game} />
            ))}
        </div>
    )

}

export default TimeSlot;