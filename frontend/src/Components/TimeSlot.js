import { useEffect, useState } from "react";
import SortByGameRating from "../Functions/SortByGameRating";
import Game from "./Game";

const TimeSlot = ({ gamesArray }) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {

        setGames(SortByGameRating( gamesArray ))

    }, [])

    return (
        <div>
            {games.map((game, index) => (
                <Game key={index} game={game} />
            ))}
        </div>
    )

}

export default TimeSlot;