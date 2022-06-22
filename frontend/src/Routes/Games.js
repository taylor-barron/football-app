import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetGames from "../Functions/GetGames";
import SortByDate from "../Functions/SortByDate";
import Date from "../Components/Date";
import NavigationBar from "../Components/NavigationBar";

const Games = () => {
    const { year, week } = useParams();
    const [ dates, setDates ] = useState([])

    useEffect(() => {
        
        GetGames({week, year}).then((res) => {
            setDates(SortByDate(res));
        })

    }, [])

    return (

        <div>
            <NavigationBar css={"navigation-bar"} text={"navigation-text"} />
            <div className="page-container">
                {dates.map((games, index) => (
                    <Date key={index} games={games} />
                ))}
                <br></br>
            </div>
        </div>
    )
}

export default Games;