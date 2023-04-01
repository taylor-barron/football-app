import { useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import SortByTimeSlot from "../Functions/SortByTimeSlot";
import ConvertDate from "../Functions/ConvertDate";

const Date = ({ index, games }) => {
    const [ timeSlots, setTimeSlots ] = useState([])
    const [ date, setDate ] = useState("")

    useEffect(() => {
        console.log(games)
        
        setTimeSlots(SortByTimeSlot( games ))

        setDate(ConvertDate(games[0].date))

    }, [])

    if (index === 0) {

        return (
            <div className="first-date-container">
                <h1 className="date-text">{date}</h1>
                {timeSlots.map((games, index) => (
                    <TimeSlot key={index} index={index} gamesArray={games} />
                ))}<br></br>
            </div>
        )

    } else {

        return (
            <div className="date-container">
                <h1 className="date-text">{date}</h1>
                {timeSlots.map((games, index) => (
                    <TimeSlot key={index} index={index} gamesArray={games} />
                ))}<br></br>
            </div>
        )

    }

}

export default Date;