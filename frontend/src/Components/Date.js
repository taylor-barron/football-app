import { useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import SortByTimeSlot from "../Functions/SortByTimeSlot";
import ConvertDate from "../Functions/ConvertDate";

const Date = ({ games }) => {
    const [ timeSlots, setTimeSlots ] = useState([])
    const [ date, setDate ] = useState("")

    useEffect(() => {
        
        setTimeSlots(SortByTimeSlot( games ))

        setDate(ConvertDate(games[0].date))

    }, [])

    return (
        <div className="date-container">
            <h1 className="date-text">{date}</h1>
            {timeSlots.map((games, index) => (
                <TimeSlot key={index} gamesArray={games} />
            ))}<br></br>
        </div>
    )

}

export default Date;