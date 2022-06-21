import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetGames from "../Functions/GetGames";
import SortByDate from "../Functions/SortByDate";
import Date from "../Components/Date";

const Games = () => {
    const { year, week } = useParams();
    const [ dates, setDates ] = useState([])

    useEffect(() => {
        
        GetGames({week, year}).then((res) => {
            setDates(SortByDate(res));
        })

    }, [])

    return (
        <div className="page-container">
            <a href="/">Home</a>
            {dates.map((games, index) => (
                <Date key={index} games={games} />
            ))}
            <br></br>
        </div>
    )
}

export default Games;